import { log } from "@/app/actions/actions";
import { ELogLevel, ILogObject } from "@/loggerServices/loggerInterfaces";

export function fileToDataUri(field: File) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      
      reader.addEventListener("load", () => {
        resolve(reader.result);
  
      });
      
      reader.readAsDataURL(field);
    });
  }
  
  export function resizeImage(imgToResize: HTMLImageElement | null, resizingFactor = 0.5) {
   
    try {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      
      const originalWidth = imgToResize!.width;
      const originalHeight = imgToResize!.height;
    
      const canvasWidth = originalWidth * resizingFactor; // originalWidth * newResizeFactor;
      const canvasHeight = originalHeight * resizingFactor; // originalHeight * newResizeFactor
    
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    
      context!.drawImage(
        imgToResize!,
        0,
        0,
        originalWidth * resizingFactor,
        originalHeight * resizingFactor
      );
    
      return canvas.toDataURL();

    } catch(ex) {
      const logObj: ILogObject = {
        level: ELogLevel.Error,
        message: `Error: ${(ex as Error).message}`,
        metaData: {
          service: "ESM-bnb-14",
          module: "thumbnailsComponent - resizeImage",
          category: "thumbnailsComponent",
          stackdump: (ex as Error).stack,
        },
        };
      log(logObj);
      
      return '';
    }
  }