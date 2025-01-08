import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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
