import { clsx } from "clsx";
import { twMerge } from "tw-merge";

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
