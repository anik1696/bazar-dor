import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const BN = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBn(val) {
  if (val === null || val === undefined) return "";
  return String(val).replace(/[0-9]/g, (d) => BN[+d]);
}

export function formatPrice(amount) {
  if (!amount && amount !== 0) return "—";
  return `${toBn(Number(amount).toLocaleString("en-US"))} টাকা`;
}

export function formatPricePerUnit(amount, unit) {
  return `${toBn(Number(amount).toLocaleString("en-US"))} টাকা/${unitShort(unit)}`;
}

export function unitLong(unit) {
  const u = (unit || "").trim().toLowerCase();
  if (u === "kg") return "প্রতি কেজি";
  if (u === "liter") return "প্রতি লিটার";
  if (u === "dozen") return "প্রতি ডজন";
  if (u === "piece") return "প্রতি পিস";
  if (u.startsWith("প্রতি")) return unit;
  return `প্রতি ${unit}`;
}

export function unitShort(unit) {
  const u = (unit || "").trim().toLowerCase();
  if (u === "kg") return "কেজি";
  if (u === "liter") return "লিটার";
  if (u === "dozen") return "ডজন";
  if (u === "piece") return "পিস";
  return unit;
}

export function getBengaliDate(date = new Date()) {
  try {
    return date.toLocaleDateString("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export function sortProducts(products, sortOption) {
  if (!products) return [];
  const arr = [...products];
  if (sortOption === "price-asc")
    return arr.sort((a, b) => Number(a.today) - Number(b.today));
  if (sortOption === "price-desc")
    return arr.sort((a, b) => Number(b.today) - Number(a.today));
  return arr;
}
