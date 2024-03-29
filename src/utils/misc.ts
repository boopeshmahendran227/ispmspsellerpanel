import { AddressInterface } from "../types/order";

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

const formatNumber = (num: number) => {
  return num.toLocaleString("en-IN");
};

const convertTo12hour = (time: string) => {
  const hour = Number(time.substr(0, 2));
  const amPm = hour >= 12 ? "pm" : "am";

  return (hour % 12 || 12) + ":" + time.substr(3, 2) + " " + amPm;
};

export {
  formatPrice,
  capitalizeFirstLetter,
  valueToPercentage,
  percentageToValue,
  returnEmptyStringIfFalse,
  splitCamelCase,
  formatAddress,
  formatNumber,
  convertTo12hour,
};
