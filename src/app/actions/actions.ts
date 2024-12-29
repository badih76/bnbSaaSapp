"use server";

import { supabase } from "@/data/supabase";
import { Favorites, Homes, Reservations } from "@/drizzle/schema";
import { IFilesUploadType, IHomeImages } from "@/lib/thumnailsInterface";
import { dataURItoBlob } from "@/lib/utilsCode";
import { Logger } from "@/loggerServices/logger";
import { ELogLevel, ILogObject } from "@/loggerServices/loggerInterfaces";
import { count, desc, eq, sql } from "drizzle-orm";
import {
  AnyMySql2Connection,
  drizzle,
  MySql2Database,
} from "drizzle-orm/mysql2";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

let db: MySql2Database<Record<string, never>> & {
  $client: AnyMySql2Connection;
};

try {
  db = drizzle({ connection: { uri: process.env.DATABASE_URL } });
} catch (ex) {
  const logObj: ILogObject = {
    level: ELogLevel.Error,
    message: `Error: ${(ex as Error).message}`,
    metaData: {
      service: "ESM-bnb-14",
      module: "Server Actions - Database Connection",
      category: "Database",
      stackdump: (ex as Error).stack,
    },
  };
  Logger.log(logObj);

  redirect(`/Error`);
}

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
        console.log(stringifiedHomeImages);
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
    // const userId = formData.get("userId") as string;

    await db.delete(Favorites).where(eq(Favorites.id, favoriteId));

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

export async function createReservation(formData: FormData) {
  try {
    const userId = formData.get("userId") as string;
    const homeId = formData.get("homeId") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;

    await db.insert(Reservations).values({
      homeId: homeId,
      userId: userId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
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

  return redirect("/reservations");
}

export async function removeFromHomeListing(formData: FormData) {
  try {
    const homeId = formData.get("homeId") as string;
    // const userId = formData.get("userId") as string;
    // const pathName = formData.get("pathName") as string;

    await db.delete(Homes).where(eq(Homes.id, homeId));

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
    const userId = formData.get("userId") as string;
    console.log("Delet home", homeId, userId);

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

export async function getReservationsStatistics(userId: string) {
  try {
    const homesStat = db
      .select({
        month: sql`date_format(reservations.createdAt, '%m-%y')`,
        resCount: count(Reservations.id),
      })
      .from(Homes)
      .innerJoin(Reservations, eq(Homes.id, Reservations.homeId))
      .where(eq(Homes.userId, userId))
      .groupBy(sql`date_format(createdAt, '%m-%y')`);

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

    // console.log(homesStat);

    return homesStat;
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


export const log = (logObj: ILogObject) => {
  
  Logger.log(logObj);

}