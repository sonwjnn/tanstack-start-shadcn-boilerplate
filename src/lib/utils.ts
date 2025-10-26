import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function sleep(ms: number = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
