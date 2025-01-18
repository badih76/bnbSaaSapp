import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Filter } from 'bad-words'
import BadWords from '@/data/badWords.json';

// const options = [
//   {
//     type: 'group',
//     name: 'Mobilenet v2 Model',
//     items: [
//       {
//         value: 'MobileNetV2',
//         label: '90% Accurate - 2.6MB',
//       },
//       {
//         value: 'MobileNetV2Mid',
//         label: '93% Accurate - 4.2MB',
//       },
//     ],
//   },
//   {
//     type: 'group',
//     name: 'Inception v3 Model',
//     items: [
//       {
//         value: 'InceptionV3',
//         label: '93% Accurate - Huge!',
//       },
//     ],
//   },
// ]

export const ImageStyles = {
  "normal": "mt-5 overflow-hidden hidden",
  "censorSexy": "mt-5 overflow-hidden blur-md border border-pink-300",
  "censorPorn": "mt-5 overflow-hidden blur-xl border border-red-500",
  "hidden": "hidden"
}

export enum ECensorLevels {
  Normal = "normal",
  CensorSexy = "censorSexy",
  CensorPorn = "censorPorn",
  Hidden = "hidden"
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isJson = (str: string) => {
  try {
    JSON.parse(str);
  } catch (ex) {
    console.log('Error: ', ex);
    return false;
  }
  return true;
}

export const getDomainName = () => window.location.origin;

export const uuid4 = () => {
  const h1 = String((Math.floor(Math.random() * 0xffff)).toString(16)).padStart(4, '0');
  const h2 = String((Math.floor(Math.random() * 0xffff)).toString(16)).padStart(4, '0');
  const h3 = String((Math.floor(Math.random() * 0xffff)).toString(16)).padStart(4, '0');
  const h6 = String((Math.floor(Math.random() * 0xffff)).toString(16)).padStart(4, '0');
  const h7 = String((Math.floor(Math.random() * 0xffff)).toString(16)).padStart(4, '0');
  const h8 = String((Math.floor(Math.random() * 0xffff)).toString(16)).padStart(4, '0');

  const h4 = '4' + String((Math.floor(Math.random() * 0x0fff)).toString(16)).padStart(3, '0');
  const h5 = (Math.floor(Math.random() * 4 + 8)).toString(16) 
      + String((Math.floor(Math.random() * 0x0fff)).toString(16)).padStart(3, '0');

  return (h1 + h2 + '-' + h3 + '-' + h4 + '-' + h5 + '-' + h6 + h7 + h8).toLowerCase();
}

export const getObjectURLFromFile = (file: File, setImageURL: (url: string) => void, extraAction: () => void ) => {
  const blob = file as Blob;
  extraAction();
  // setCensor(ECensorLevels.Normal);
  
  setImageURL(URL.createObjectURL(blob));

}

export const checkProfane = (text: string, setWarning: (state: boolean) => void) => {
  const filter = new Filter();
  // const originalBadWordsList = [...filter.list];
  // console.log(originalBadWordsList);
  filter.list = BadWords.words;

  const detected = filter.isProfane(text);

  if(detected) {
    setWarning(true);
  } else {
    setWarning(false);
  }
}