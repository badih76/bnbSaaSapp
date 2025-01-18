import { ELogLevel, ILogObject } from "@/loggerServices/loggerInterfaces";
import { IAddress } from "./interfaces";
import { log } from "@/app/actions/actions";

export enum FlagSize {
    FS16x12 = '16x12',
    FS20x15 = '20x15',
    FS24x18 = '24x18',
    FS28x21 = '28x21',
    FS32x24 = '32x24',
    FS36x27 = '36x27',
    FS40x30 = '40x30',
    FS48x36 = '48x36',
    FS56x42 = '56x42',
    FS60x45 = '60x45',
    FS64x48 = '64x48',
    FS72x54 = '72x54',
    FS80x60 = '80x60',
    FS84x63 = '84x63',
    FS96x72 = '96x72',
    FS108x8 = '108x8',
    FS112x8 = '112x8',
    FS120x9 = '120x9',
    FS128x9 = '128x9',
    FS144x1 = '144x1',
    FS160x1 = '160x1',
    FS192x1 = '192x1',
    FS224x1 = '224x1',
    FS256x192 = '256x192'
}

export const ImageStyles = {
    "normal": "mt-5 overflow-hidden hidden",
    "censorSexy": "mt-5 overflow-hidden blur-md border border-pink-300",
    "censorPorn": "mt-5 overflow-hidden blur-xl border border-red-500"
  }

export enum ECensorLevels {
    Normal = "normal",
    CensorSexy = "censorSexy",
    CensorPorn = "censorPorn"
}

export const getFlagURL = ((countryCode: string, size: FlagSize = FlagSize.FS20x15 ) => {
    // const arrSize: string[] = [ '20x15',  ]
    const cc: string = countryCode;
    return `https://flagcdn.com/${size}/${cc.toLowerCase()}.png`
});

export const SearchAddress = (address: string, 
        setFoundAddresses: React.Dispatch<React.SetStateAction<IAddress[]>>, 
        country: string | null=null, 
        setPending?: React.Dispatch<React.SetStateAction<boolean>> | undefined) => {
    const apiKey = process.env.GEOAPIFY_API_KEY!;
    const url = `https://api.geoapify.com/v1/geocode/search?name=${address}&text=${address}${country !== null ? '&country='+country : ''}&limit=50&format=json&apiKey=${apiKey}`;

    try {
        fetch(url,
            {
              method: 'get',
              cache: "no-cache" 
            })
            .then(res => {
                return res.json();

            })
            .then(json => {
                // console.log(json);
                const foundAddresses: IAddress[] = [];

                json.results.map((r: any) => {
                    // console.log(r.formatted);
                    foundAddresses.push({ value: r.formatted, label: r.formatted, lon: parseFloat(r.lon), lat: parseFloat(r.lat) });
                })
                
                setFoundAddresses(foundAddresses);
                return json
                
            })
            .catch (ex => {
                const logObj: ILogObject = {
                    level: ELogLevel.Error,
                    message: `Error: ${(ex as Error).message}`,
                    metaData: {
                        service: "ESM-bnb-14",
                        module: "utilsCode - SearchAddress",
                        category: "utilsCode",
                        stackdump: (ex as Error).stack,
                    },
                    };
                log(logObj);                   
                
                return false;
            });
    } catch(ex) {
        const logObj: ILogObject = {
            level: ELogLevel.Error,
            message: `Error: ${(ex as Error).message}`,
            metaData: {
                service: "ESM-bnb-14",
                module: "utilsCode - SearchAddress",
                category: "utilsCode",
                stackdump: (ex as Error).stack,
            },
            };
        log(logObj);        
            
        return false;
    }

    if(setPending) setPending(false);
}

export function dataURItoBlob(dataURI: string) {
    try {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        const byteString = atob(dataURI.split(',')[1]);
    
        // separate out the mime component
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    
        // write the bytes of the string to an ArrayBuffer
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
    
        return new Blob([ab], {type: mimeString});

    } catch(ex) {
        const logObj: ILogObject = {
            level: ELogLevel.Error,
            message: `Error: ${(ex as Error).message}`,
            metaData: {
                service: "ESM-bnb-14",
                module: "utilsCode - dataURItoBlob",
                category: "utilsCode",
                stackdump: (ex as Error).stack,
            },
            };
        log(logObj);   

        return null;
    }
}