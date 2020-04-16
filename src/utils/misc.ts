import { AddressInterface } from "../types/order";

const BASE_URL = "http://mpldev.cdn.istakapaza.com/";

const formatPrice = (price: number) => {
  return "₹ " + price.toLocaleString("en-IN");
};

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const percentageToValue = (percent, total) => {
  const numPercent = Number(percent);
  const numTotal = Number(total);
  return Math.round((numPercent * numTotal) / 100.0);
};

const valueToPercentage = (value, total) => {
  if (value === 0 || total === 0) {
    return 0;
  }
  const numValue = Number(value);
  const numTotal = Number(total);
  return Math.round((numValue * 100.0) / numTotal);
};

const getProductUrl = (name, id) => {
  const slug = name.split(" ").join("-");
  return `/p/${slug}/${id}`;
};

const getProductImageUrl = (relativePath) => {
  return BASE_URL + relativePath;
};

const returnEmptyStringIfFalse = (val) => {
  if (val === 0) return 0;
  else if (!val) return "";
  else return val;
};

const splitCamelCase = (word: string) => {
  return word.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
};

const formatAddress = (address: AddressInterface) => {
  return `${address.apartmentNumber}, ${address.street}, ${address.locality}, ${address.city} - ${address.zipCode}, ${address.state}`;
};

export {
  formatPrice,
  capitalizeFirstLetter,
  valueToPercentage,
  percentageToValue,
  getProductUrl,
  getProductImageUrl,
  returnEmptyStringIfFalse,
  splitCamelCase,
  formatAddress,
};
