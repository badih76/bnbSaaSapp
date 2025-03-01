"use server";

import { supabase } from "@/data/supabase";
import { db } from "@/drizzle";
import { Favorites, Homes, Messages, Reservations, Users } from "@/drizzle/schema";
import { IReservationDetails, IUserSettings } from "@/lib/interfaces";
import { IFilesUploadType, IHomeImages } from "@/lib/thumnailsInterface";
import { isJson } from "@/lib/utils";
import { dataURItoBlob } from "@/lib/utilsCode";
import { Logger } from "@/loggerServices/logger";
import { ELogLevel, ILogObject } from "@/loggerServices/loggerInterfaces";
import { count, sum, desc, eq, sql, and, or, not, gte } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";

export async function createBnbSiteHome({ userId }: { userId: string }) {
  try {

    const data = await db
      .select()
      .from(Homes)
      .where(eq(Homes.userId, userId))
      .orderBy(desc(Homes.createdAt));

    if (data === null) {
      const homeId = await db
        .insert(Homes)
        .values({
          userId: userId,
          title: "",
        })
        .$returningId();

      const logObj: ILogObject = {
        level: ELogLevel.Info,
        message: `New Home create. homeId: ${homeId}`,
        metaData: {
          service: "ESM-bnb-14",
          module: "Server Actions - createBnbSiteHome",
          category: "Home Listing",
        },
      };
      Logger.log(logObj);

      

      return redirect(`/create/${homeId}/structure`);

    } else if (
      !data[0].addedCategory &&
      !data[0].addedDescription &&
      !data[0].addedLocation
    ) {
      
      return redirect(`/create/${data[0].id}/structure`);

    } else if (data[0].addedCategory && !data[0].addedDescription) {
      
      return redirect(`/create/${data[0].id}/description`);

    } else if (
      data[0].addedCategory &&
      data[0].addedDescription &&
      !data[0].addedLocation
    ) {
      
      return redirect(`/create/${data[0].id}/addressEx`);

    } else if (
      data[0].addedCategory &&
      data[0].addedDescription &&
      data[0].addedLocation
    ) {
      const homeId = await db
        .insert(Homes)
        .values({
          userId: userId,
          title: "",
        })
        .$returningId();

      const logObj: ILogObject = {
        level: ELogLevel.Info,
        message: `New Home create. homeId: ${homeId}`,
        metaData: {
          service: "ESM-bnb-14",
          module: "Server Actions - createBnbSiteHome",
          category: "Home Listing",
        },
      };
      Logger.log(logObj);
      
      
      return redirect(`/create/${homeId}/structure`);

    }
} catch (ex) {
    if (isRedirectError(ex)) throw ex;
    else {
      const logObj: ILogObject = {
          level: ELogLevel.Error,
          message: `Error: ${(ex as Error).message}`,
          metaData: {
          service: "ESM-bnb-14",
          module: "Server Actions - createBnbSiteHome",
          category: "Home Listing",
          stackdump: (ex as Error).stack,
        },
      };
      Logger.log(logObj);
  
      return redirect(`/Error`);
    }
  }
}

export async function createCategory(formData: FormData) {
  const categoryName = formData.get("categoryName") as string;
  const homeId = formData.get("homeId") as string;

  try {
    await db
      .update(Homes)
      .set({
        category: categoryName,
        addedCategory: true,
      })
      .where(eq(Homes.id, homeId));

    const logObj: ILogObject = {
    level: ELogLevel.Info,
    message: `New Home category updated. homeId: ${homeId}`,
    metaData: {
        service: "ESM-bnb-14",
        module: "Server Actions - createCategory",
        category: "Home Listing",
    },
    };
    Logger.log(logObj);

    

  } catch (ex) {
    const logObj: ILogObject = {
        level: ELogLevel.Error,
        message: `Error: ${(ex as Error).message}`,
        metaData: {
          service: "ESM-bnb-14",
          module: "Server Actions - createCategory",
          category: "Home Listing",
          stackdump: (ex as Error).stack,
        },
      };
      Logger.log(logObj);

    return redirect(`/Error`);
  }

  return redirect(`/create/${homeId}/description`);
}

export async function CreateDescription(formData: FormData) {
  const homeId = formData.get("homeId") as string;

  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price");
    const guestsCount = parseInt(formData.get("guests") as string);
    const roomsCount = parseInt(formData.get("rooms") as string);
    const bathroomsCount = parseInt(formData.get("bathrooms") as string);
    const selectedFacilities = formData.get("selectedFacilities") as string;

    const imagesCount = parseInt(formData.get("imagesCount") as string);

    //get the passed uploaded images formData params and push them into an array
    const uploadedFilesParsed: IFilesUploadType[] = [];

    for (let n = 0; n < imagesCount; n++) {
      const imgFileStringified = formData.get(
        "image" + (n + 1).toString().trim()
      ) as string;

      console.log(imgFileStringified);

      const imgFileParsed = JSON.parse(imgFileStringified);

      uploadedFilesParsed.push(imgFileParsed);
    }

    const homeImages: IHomeImages[] = [];
    let stringifiedHomeImages = "";

    // upload the files to storage
    let logObj: ILogObject = {
        level: ELogLevel.Info,
        message: `Upload files to storage. homeId: ${homeId}`,
        metaData: {
          service: "ESM-bnb-14",
          module: "Server Actions - CreateDescription",
          category: "Files Upload",
        },
      };
    Logger.log(logObj);

    await Promise.all(
      uploadedFilesParsed.map(async (rip) => {
        const riBlob: Blob | null = dataURItoBlob(rip.srcThumbnail);
        const oiBlob: Blob | null = dataURItoBlob(rip.srcOriginal);

        if(!riBlob || !oiBlob) return redirect("/Error");
        
        const thumbArrayBuffer = await riBlob.arrayBuffer();
        const originArrayBuffer = await oiBlob.arrayBuffer();

        const fileName = rip.fileName;

        // upload thumbnail
        const { data: thumbImageData } = await supabase.storage
          .from(`esm-bnb-images/thumbnails/${homeId}`)
          .upload(`${fileName}`, thumbArrayBuffer, {
            cacheControl: "86400", // one day
            contentType: rip.fileType,
          });

        // upload original image
        const { data: originImageData } = await supabase.storage
          .from(`esm-bnb-images/${homeId}`)
          .upload(`${fileName}`, originArrayBuffer, {
            cacheControl: "86400", // one day
            contentType: rip.fileType,
          });

        // save images paths
        homeImages.push({
          thumbnailImagePath: thumbImageData ? thumbImageData.path : "",
          originalImagePath: originImageData ? originImageData.path : "",
        });

        stringifiedHomeImages = JSON.stringify(homeImages);
      })
    );

    logObj = {
        level: ELogLevel.Info,
        message: `Files uploaded to storage. homeId: ${homeId}`,
        metaData: {
          service: "ESM-bnb-14",
          module: "Server Actions - CreateDescription",
          category: "Files Upload",
        },
      };
    Logger.log(logObj);

    await db
      .update(Homes)
      .set({
        title,
        description,
        price: parseFloat(price as string),
        guests: guestsCount,
        bedrooms: roomsCount,
        bathrooms: bathroomsCount,
        photo: stringifiedHomeImages,
        addedDescription: true,
        facilities: selectedFacilities,
      })
      .where(eq(Homes.id, homeId));

    logObj = {
        level: ELogLevel.Info,
        message: `Home details updated. homeId: ${homeId}`,
        metaData: {
          service: "ESM-bnb-14",
          module: "Server Actions - CreateDescription",
          category: "Home Listing",
        },
      };
    Logger.log(logObj);

    

  } catch (ex) {
    const logObj: ILogObject = {
        level: ELogLevel.Error,
        message: `Error: ${(ex as Error).message}`,
        metaData: {
          service: "ESM-bnb-14",
          module: "Server Actions - CreateDescription",
          category: "Home Listing",
          stackdump: (ex as Error).stack,
        },
      };
    Logger.log(logObj);

    return redirect(`/Error`);
  }

  return redirect(`/create/${homeId}/addressEx`);
}

export async function createLocation(formData: FormData) {
  try {
    const homeId = formData.get("homeId") as string;
    const countryValue = formData.get("countryValue") as string;
    const address = formData.get("addressValue") as string;

    await db
      .update(Homes)
      .set({
        addedLocation: true,
        country: countryValue,
        address,
      })
      .where(eq(Homes.id, homeId));

    const logObj: ILogObject = {
        level: ELogLevel.Info,
        message: `Home Location updated. homeId: ${homeId}`,
        metaData: {
          service: "ESM-bnb-14",
          module: "Server Actions - createLocation",
          category: "Home Listing",
        },
      };
    Logger.log(logObj);

    

  } catch (ex) {
    const logObj: ILogObject = {
        level: ELogLevel.Error,
        message: `Error: ${(ex as Error).message}`,
        metaData: {
          service: "ESM-bnb-14",
          module: "Server Actions - createLocation",
          category: "Home Listing",
          stackdump: (ex as Error).stack,
        },
      };
    Logger.log(logObj);

    return redirect(`/Error`);
  }

  return redirect("/myHomes");
}

export async function addToFavorites(formData: FormData) {
  const pathName = formData.get("pathName") as string;

  try {
    const homeId = formData.get("homeId") as string;
    const userId = formData.get("userId") as string;

    await db.insert(Favorites).values({
      homeId,
      userId,
    });

    const logObj: ILogObject = {
        level: ELogLevel.Info,
        message: `Home added to Favorites. homeId: ${homeId}, userId: ${userId}`,
        metaData: {
          service: "ESM-bnb-14",
          module: "Server Actions - addToFavorites",
          category: "Favorites",
        },
      };
    Logger.log(logObj);

    

  } catch (ex) {
    const logObj: ILogObject = {
		level: ELogLevel.Error,
		message: `Error: ${(ex as Error).message}`,
		metaData: {
		  service: "ESM-bnb-14",
		  module: "Server Actions - addToFavorites",
		  category: "Favorites",
		  stackdump: (ex as Error).stack,
		},
	  };
    Logger.log(logObj);

    return redirect(`/Error`);
  }

  revalidatePath(pathName);
}

export async function removeFromFavorites(formData: FormData) {
  const pathName = formData.get("pathName") as string;

  try {
    
    const favoriteId = formData.get("favoriteId") as string;
    console.log('Removing Favorite', "-", favoriteId, "-");
    // const userId = formData.get("userId") as string;

    const data = await db.delete(Favorites).where(eq(Favorites.id, favoriteId));
    console.log(data);

    const logObj: ILogObject = {
        level: ELogLevel.Info,
        message: `Home removed from Favorites.`,
        metaData: {
          service: "ESM-bnb-14",
          module: "Server Actions - removeFromFavorites",
          category: "Favorites",
        },
      };
    Logger.log(logObj);
    
    

  } catch (ex) {
    const logObj: ILogObject = {
		level: ELogLevel.Error,
		message: `Error: ${(ex as Error).message}`,
		metaData: {
		  service: "ESM-bnb-14",
		  module: "Server Actions - removeFromFavorites",
		  category: "Favorites",
		  stackdump: (ex as Error).stack,
		},
	  };
    Logger.log(logObj);

    return redirect(`/Error`);
  }

  revalidatePath(pathName);
}

export async function createReservationForm(formData: FormData) {
  try {
    const userId = formData.get("userId") as string;
    const homeId = formData.get("homeId") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;
    const rate = parseFloat(formData.get("rate") as string);

    const nightsCount = Math.round((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24));
    const totalCharged = rate * nightsCount;

    await db.insert(Reservations).values({
      homeId: homeId,
      userId: userId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      rate: rate,
      totalCharged: totalCharged
    });

    const logObj: ILogObject = {
        level: ELogLevel.Info,
        message: `New Home Reservation create. homeId: ${homeId}, userId: ${userId}`,
        metaData: {
          service: "ESM-bnb-14",
          module: "Server Actions - createReservationForm",
          category: "Reservations",
        },
      };
    Logger.log(logObj);

    

  } catch (ex) {
    const logObj: ILogObject = {
		level: ELogLevel.Error,
		message: `Error: ${(ex as Error).message}`,
		metaData: {
		  service: "ESM-bnb-14",
		  module: "Server Actions - createReservationForm",
		  category: "Reservations",
		  stackdump: (ex as Error).stack,
		},
	  };
    Logger.log(logObj);

    return redirect(`/Error`);
  }

  return redirect("/reservations");
}

export async function createReservation(reservationDetails: IReservationDetails) {
  console.log('*** Adding reservation ***')
  try {
    const userId = reservationDetails.userId as string;
    const homeId = reservationDetails.homeId as string;
    const startDate = reservationDetails.startDate;
    const endDate = reservationDetails.endDate;
    const rate = parseFloat(reservationDetails.rate);
    const guests = reservationDetails.guests;
    const resToken = reservationDetails.resToken as string;

    const nightsCount = Math.round((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24));
    const totalCharged = rate * nightsCount;

    await db.insert(Reservations).values({
      homeId: homeId,
      userId: userId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      rate: rate,
      totalCharged: totalCharged,
      guests: guests,
      resToken: resToken
    });

    const logObj: ILogObject = {
        level: ELogLevel.Info,
        message: `New Home Reservation create. homeId: ${homeId}, userId: ${userId}`,
        metaData: {
          service: "ESM-bnb-14",
          module: "Server Actions - createReservation",
          category: "Reservations",
        },
      };
    Logger.log(logObj);

  } catch (ex) {
    const logObj: ILogObject = {
		level: ELogLevel.Error,
		message: `Error: ${(ex as Error).message}`,
		metaData: {
		  service: "ESM-bnb-14",
		  module: "Server Actions - createReservation",
		  category: "Reservations",
		  stackdump: (ex as Error).stack,
		},
	  };
    Logger.log(logObj);

    return redirect(`/Error`);
  }

}

export async function removeFromHomeListing(formData: FormData) {
  try {
    const homeId = formData.get("homeId") as string;
    // const userId = formData.get("userId") as string;
    // const pathName = formData.get("pathName") as string;

    // delete the added home row in Homes table
    await db.delete(Homes).where(eq(Homes.id, homeId));

    // delete any uploaded images and thumbnails
    const delTNFiles = await supabase.storage.from('esm-bnb-images').list(`thumbnails/${homeId}`);
    let filesToRemove = delTNFiles.data!.map((x) => `thumbnails/${homeId}/${x.name}`);
    await supabase.storage.from('esm-bnb-images').remove(filesToRemove);

    const delHomeFiles = await supabase.storage.from('esm-bnb-images').list(`${homeId}`);
    filesToRemove = delHomeFiles.data!.map((x) => `${homeId}/${x.name}`);
    await supabase.storage.from('esm-bnb-images').remove(filesToRemove);

    const logObj: ILogObject = {
        level: ELogLevel.Info,
        message: `New Home Listing cancelled. homeId: ${homeId}`,
        metaData: {
          service: "ESM-bnb-14",
          module: "Server Actions - removeFromHomeListing",
          category: "Home Listing",
        },
      };
    Logger.log(logObj);

    


  } catch (ex) {
    const logObj: ILogObject = {
		level: ELogLevel.Error,
		message: `Error: ${(ex as Error).message}`,
		metaData: {
		  service: "ESM-bnb-14",
		  module: "Server Actions - removeFromHomeListing",
		  category: "Home Listing",
		  stackdump: (ex as Error).stack,
		},
	  };
    Logger.log(logObj);

    return redirect(`/Error`);
  }

  return redirect(`/myHomes`);
}

export async function removeFromCompleteHomeListing(formData: FormData) {
  try {
    const homeId = formData.get("homeId") as string;
    // const userId = formData.get("userId") as string;

    await db.update(Homes).set({ deleted: true }).where(eq(Homes.id, homeId));
    const logObj: ILogObject = {
        level: ELogLevel.Info,
        message: `Home Listing Deleted. homeId: ${homeId}`,
        metaData: {
          service: "ESM-bnb-14",
          module: "Server Actions - removeFromCompleteHomeListing",
          category: "Home Listing",
        },
      };
    Logger.log(logObj);

    

  } catch (ex) {
    const logObj: ILogObject = {
		level: ELogLevel.Error,
		message: `Error: ${(ex as Error).message}`,
		metaData: {
		  service: "ESM-bnb-14",
		  module: "Server Actions - removeFromCompleteHomeListing",
		  category: "Home Listing",
		  stackdump: (ex as Error).stack,
		},
	  };
    Logger.log(logObj);

    return redirect(`/Error`);
  }

  revalidatePath("/myHomes");
}

export async function enableDisableCompleteHomeListing(formData: FormData) {
  try {
    const homeId = formData.get("homeId") as string;
    // const userId = formData.get("userId") as string;
    const checked = formData.get("checked") as string;

    await db
      .update(Homes)
      .set({ enabled: checked === "1" ? false : true })
      .where(eq(Homes.id, homeId));

    const logObj: ILogObject = {
        level: ELogLevel.Info,
        message: `Home Listing ${checked === "1" ? "Disabled" : "Enabled"} create. homeId: ${homeId}`,
        metaData: {
          service: "ESM-bnb-14",
          module: "Server Actions - enableDisableCompleteHomeListing",
          category: "Home Details",
        },
      };
    Logger.log(logObj);

    

  } catch (ex) {
    const logObj: ILogObject = {
		level: ELogLevel.Error,
		message: `Error: ${(ex as Error).message}`,
		metaData: {
		  service: "ESM-bnb-14",
		  module: "Server Actions - enableDisableCompleteHomeListing",
		  category: "Home Details",
		  stackdump: (ex as Error).stack,
		},
	  };
    Logger.log(logObj);

    return redirect(`/Error`);
  }

  revalidatePath("/myHomes");
}

export async function getHomeDetailsSSF(homeId: string) {
  try {
    const data = await db
      .select({
        categoryName: Homes.category,
        title: Homes.title,
        photo: Homes.photo,
        id: Homes.id,
        price: Homes.price,
        country: Homes.country,
        description: Homes.description,
        deleted: Homes.deleted,
        enabled: Homes.enabled,
        guests: Homes.guests,
        bedrooms: Homes.bedrooms,
        bathrooms: Homes.bathrooms,
        facilities: Homes.facilities,
        address: Homes.address,
      })
      .from(Homes)
      .where(eq(Homes.id, homeId));

    const logObj: ILogObject = {
        level: ELogLevel.Info,
        message: `Home Details retrieved. homeId: ${homeId}`,
        metaData: {
          service: "ESM-bnb-14",
          module: "Server Actions - getHomeDetailsSSF",
          category: "Home Details",
        },
      };
    Logger.log(logObj);

    

    return data;
  } catch (ex) {
    const logObj: ILogObject = {
		level: ELogLevel.Error,
		message: `Error: ${(ex as Error).message}`,
		metaData: {
		  service: "ESM-bnb-14",
		  module: "Server Actions - getHomeDetailsSSF",
		  category: "Home Details",
		  stackdump: (ex as Error).stack,
		},
	  };
    Logger.log(logObj);

    return redirect(`/Error`);
  }
}

export async function updateHomeDetails(formData: FormData) {
  const homeId = formData.get("homeId") as string;

  try {
    const categoryName = formData.get("categoryName") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const guests = formData.get("guests") as string;
    const bedrooms = formData.get("bedrooms") as string;
    const bathrooms = formData.get("bathrooms") as string;
    const country = formData.get("countryValue") as string;
    const address = formData.get("addressValue") as string;
    const facilities = formData.get("selectedFacilities") as string;

    await db
      .update(Homes)
      .set({
        category: categoryName,
        title,
        description,
        price: parseFloat(price),
        guests: parseInt(guests),
        bedrooms: parseInt(bedrooms),
        bathrooms: parseInt(bathrooms),
        facilities,
        country,
        address,
      })
      .where(eq(Homes.id, homeId));

    const logObj: ILogObject = {
        level: ELogLevel.Info,
        message: `Home Details updated. homeId: ${homeId}`,
        metaData: {
          service: "ESM-bnb-14",
          module: "Server Actions - updateHomeDetails",
          category: "Home Details",
        },
      };
    Logger.log(logObj);

    

  } catch (ex) {
    const logObj: ILogObject = {
		level: ELogLevel.Error,
		message: `Error: ${(ex as Error).message}`,
		metaData: {
		  service: "ESM-bnb-14",
		  module: "Server Actions - updateHomeDetails",
		  category: "Home Details",
		  stackdump: (ex as Error).stack,
		},
	  };
    Logger.log(logObj);

    return redirect(`/Error`);
  }

  return redirect(`/home/${homeId}`);
}

export async function getReservationsStatisticsEx(userId: string) {
  try {
    const homesStat = await db
      .select({
        month: sql`date_format(reservations.createdAt, '%m-%y')`,
        resCount: count(Reservations.id),
        resSales: sum(Reservations.totalCharged)
      })
      .from(Homes)
      .innerJoin(Reservations, eq(Homes.id, Reservations.homeId))
      .where(eq(Homes.userId, userId))
      .groupBy(sql`date_format(createdAt, '%m-%y')`);
      
    console.log(homesStat);

    const sortedHomeStat = homesStat.sort((a, b) => {
      const mmyyA = a.month!.toString().split('-');
      const mmyyB = b.month!.toString().split('-');

      if(mmyyA[0] == mmyyB[0]) {
        if(mmyyA[1] < mmyyB[1]) 
          return -1
        else if(mmyyA[1] < mmyyB[1])
          return 1
        else 
          return 0
      } else if(mmyyA[0] == mmyyB[0])
        return -1
      else 
        return 1

    });

    const mmyy1 = sortedHomeStat[sortedHomeStat.length - 1].month!.toString().split("-");
    const newMonths: { month: string, resCount: number, resSales: number }[] = [];
    let y = parseInt(mmyy1[1]);
    let m = parseInt(mmyy1[0]);
    let month = 1;

    while(month <= 12) {
      const exitingCount = sortedHomeStat.findIndex((r) => {
        const mmyy = r.month!.toString().split('-');
        return parseInt(mmyy[0]) == m && parseInt(mmyy[1]) == y;
      })

      const resCount = { 
        month: String(m).padStart(2, '0') + "-" + y.toString().trim(),
        resCount: exitingCount != -1 ? sortedHomeStat[exitingCount].resCount : 0,
        resSales: exitingCount != -1 ? parseFloat(sortedHomeStat[exitingCount].resSales!) : 0
      }

      newMonths.push(resCount);

      month++;

      y = m === 1 ? y-1 : y;
      m = m === 1 ? 12 : m-1;

      console.log(month, m, y);
        
    }

    const newSortedHomeStat = newMonths.sort((a, b) => {
      const mmyyA = a.month!.toString().split('-');
      const mmyyB = b.month!.toString().split('-');

      if(mmyyA[0] == mmyyB[0]) {
        if(mmyyA[1] < mmyyB[1]) 
          return 1
        else if(mmyyA[1] < mmyyB[1])
          return -1
        else 
          return 0
      } else if(mmyyA[0] == mmyyB[0])
        return 1
      else 
        return -1

    });
    
    const logObj: ILogObject = {
        level: ELogLevel.Info,
        message: `Collecting Listings Statistics. userId: ${userId}`,
        metaData: {
          service: "ESM-bnb-14",
          module: "Server Actions - getReservationsStatistics",
          category: "Home Details",
        },
      };
      Logger.log(logObj);

    return newSortedHomeStat;

  } catch (ex) {
    const logObj: ILogObject = {
		level: ELogLevel.Error,
		message: `Error: ${(ex as Error).message}`,
		metaData: {
		  service: "ESM-bnb-14",
		  module: "Server Actions - getReservationsStatistics",
		  category: "Home Details",
		  stackdump: (ex as Error).stack,
		},
	  };
    Logger.log(logObj);

    return redirect(`/Error`);
  }
}

export async function getListingsCount(userId: string) {
  try {
    // select other statistics data
    const listedHomesCount = await db.select({
        listedHomes: count(Homes.id)
      }).from(Homes)
      .where(and(eq(Homes.userId, userId), not(Homes.deleted)));

    const logObj: ILogObject = {
      level: ELogLevel.Info,
      message: `Collecting Listings Count. userId: ${userId}`,
      metaData: {
        service: "ESM-bnb-14",
        module: "Server Actions - getListingsCount",
        category: "Home Details",
      },
    };
    Logger.log(logObj); 

    return parseInt(listedHomesCount[0].listedHomes.toString());

  } catch(ex) {
    const logObj: ILogObject = {
      level: ELogLevel.Error,
      message: `Error: ${(ex as Error).message}`,
      metaData: {
        service: "ESM-bnb-14",
        module: "Server Actions - getListingsCount",
        category: "Home Details",
        stackdump: (ex as Error).stack,
      },
      };
      Logger.log(logObj);
  
      return redirect(`/Error`);
  }

  
}

export async function getUpcomingReservations(userId: string) {
  try {
    // select other statistics data
    const upcomingReservations = await db.select({
        title: Homes.title,
        startDate: Reservations.startDate,
        endDate: Reservations.endDate,
        rate: Reservations.rate,
        userName: sql<string>`firstName + ' ' + lastName`,
        paid: sql<boolean>`true`
      }).from(Reservations)
      .innerJoin(Homes, and(eq(Homes.id, Reservations.homeId), eq(Homes.userId, userId)))
      .innerJoin(Users, eq(Reservations.userId, Users.id))
      .where(and(eq(Homes.userId, userId), gte(Reservations.startDate, new Date())));

    const logObj: ILogObject = {
      level: ELogLevel.Info,
      message: `Collecting Upcoming Reservations. userId: ${userId}`,
      metaData: {
        service: "ESM-bnb-14",
        module: "Server Actions - getUpcomingReservations",
        category: "Home Details",
      },
    };
    Logger.log(logObj); 

    return upcomingReservations;

  } catch(ex) {
    const logObj: ILogObject = {
      level: ELogLevel.Error,
      message: `Error: ${(ex as Error).message}`,
      metaData: {
        service: "ESM-bnb-14",
        module: "Server Actions - getUpcomingReservations",
        category: "Home Details",
        stackdump: (ex as Error).stack,
      },
      };
      Logger.log(logObj);
  
      return redirect(`/Error`);
  }

  
}

export async function log(logObj: ILogObject) {
  Logger.log(logObj);
  
  return redirect(`/Error`);

}

export async function showHideDeletedListingsForm(formData: FormData) {
  try {
    const userId = formData.get("userId") as string;
    const checked = formData.get("checked") as string;

    const userSettings:IUserSettings = await getUserSettings(userId);
    const newUserSettings: IUserSettings = {
      ...userSettings, hideDeletedListings: !userSettings.hideDeletedListings
    }

    await db
      .update(Users)
      .set({ userSettings: JSON.stringify(newUserSettings) })
      .where(eq(Users.id, userId));

    const logObj: ILogObject = {
        level: ELogLevel.Info,
        message: `User Settings - hideDeletedListings set to ${checked === "1" ? "Show" : "Hide"}. userId: ${userId}`,
        metaData: {
          service: "ESM-bnb-14",
          module: "Server Actions - showHideDeletedListingsForm",
          category: "Home Details",
        },
      };
    Logger.log(logObj);

  } catch (ex) {
    const logObj: ILogObject = {
		level: ELogLevel.Error,
		message: `Error: ${(ex as Error).message}`,
		metaData: {
		  service: "ESM-bnb-14",
		  module: "Server Actions - showHideDeletedListingsForm",
		  category: "Home Details",
		  stackdump: (ex as Error).stack,
		},
	  };
    Logger.log(logObj);

    return redirect(`/Error`);
  }

  revalidatePath("/myHomes");
}


export async function showHideDeletedListings(userId: string, hideDeletedListings: boolean) {
  try {
    const checked = hideDeletedListings;

    const userSettings:IUserSettings = await getUserSettings(userId);
    const newUserSettings: IUserSettings = {
      ...userSettings, hideDeletedListings: hideDeletedListings
    }

    await db
      .update(Users)
      .set({ userSettings: JSON.stringify(newUserSettings) })
      .where(eq(Users.id, userId));

    const logObj: ILogObject = {
        level: ELogLevel.Info,
        message: `User Settings - hideDeletedListings set to ${checked ? "Show" : "Hide"}. userId: ${userId}`,
        metaData: {
          service: "ESM-bnb-14",
          module: "Server Actions - showHideDeletedListings",
          category: "Home Details",
        },
      };
    Logger.log(logObj);

  } catch (ex) {
    const logObj: ILogObject = {
		level: ELogLevel.Error,
		message: `Error: ${(ex as Error).message}`,
		metaData: {
		  service: "ESM-bnb-14",
		  module: "Server Actions - showHideDeletedListings",
		  category: "Home Details",
		  stackdump: (ex as Error).stack,
		},
	  };
    Logger.log(logObj);

    return redirect(`/Error`);
  }

  revalidatePath("/myHomes");
}

export const getUserSettings = async (userId: string) => {
  try {
    const userSettings = await db.select({
        userSettings: Users.userSettings
    }).from(Users).where(eq(Users.id, userId));
    
    console.log("UserSettings: ", 
        userSettings, 
        isJson(userSettings[0].userSettings!),
      JSON.parse(userSettings[0].userSettings!));
  
    if(userSettings.length === 0) return { hideDeletedListings: true, Currency: "AUD" };
    else return isJson(userSettings[0].userSettings!) ?  
        JSON.parse(userSettings[0].userSettings!) : { hideDeletedListings: true, Currency: "AUD" };

  } catch(ex) {
    const logObj: ILogObject = {
      level: ELogLevel.Error,
      message: `Error: ${(ex as Error).message}`,
      metaData: {
        service: "ESM-bnb-14",
        module: "Server Actions - showHideDeletedListings",
        category: "Home Details",
        stackdump: (ex as Error).stack,
      },
      };
      Logger.log(logObj);
  
      return redirect(`/Error`);
  }
}

export const validResToken = async (resToken: string) => {
  // check if this reservation token was used to create a reservation before.
  const data = await db.select({ resToken: Reservations.resToken})
    .from(Reservations).where(eq(Reservations.resToken, resToken));

  return data.length === 0;
}

export const getChattingUsers = async (uid: string) => {
    /*
        select users.firstName, users.email 
        from messages
            inner join users on users.id = messages.msgFrom or users.id = messages.msgTo
        group by users.firstname , users.email;
    */
   const data = await db.select({
            uid: Users.id,
            firstName: Users.firstName,
            lastName: Users.lastName,
            email: Users.email
        }).from(Messages)
        .innerJoin(Users, or(eq(Users.id, Messages.msgFrom), eq(Users.id, Messages.msgTo)))
        .where(or(eq(Messages.msgFrom, uid), eq(Messages.msgTo, uid)))
        .groupBy(Users.firstName, Users.email)

    return data;
}

export const getMessages = async (uid: string) => {
  const data = await db.select().from(Messages)
      .where(or(eq(Messages.msgFrom, uid), eq(Messages.msgTo, uid)))
      .orderBy(Messages.msgDateTime);

  return data;
}

export const sendMessageToHost = async (message: string, uid: string, hostId: string) => {
  const data = await db.insert(Messages)
    .values({
      msgMessage: message,
      msgFrom: uid,
      msgTo: hostId,
      msgDateTime: new Date(),
      msgSeen: false,
    })
    .$returningId();

    return data;
}
