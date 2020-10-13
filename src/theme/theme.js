import { theme } from "@chakra-ui/core";
import Chroma from "chroma-js";

export const customTheme = {
  ...theme,
  fonts: {
    body: "Lato, Roboto",
    heading: "Lato",
    mono: "Menlo, monospace",
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.25rem",
    xl: "1.5rem",
    "2xl": "2rem",
    "3xl": "2.5rem",
    "4xl": "3.5rem",
    "5xl": "4.5rem",
    "6xl": "5.5rem",
    "7xl": "6rem",
  },
  colors: {
    ...theme.colors,
    backgroundColor: "#F7FAFF",
    foregroundColor: "#FFFFFF",
    disabledColor: "#999",
    borderColor: "#ccc",
    primaryColor: "rgb(57, 118, 249)",
    secondaryColor: "#068ff4",
    warningColor: "#d35400",
    dangerColor: "#f94a5b",
    successColor: "#61B246",
    primaryTextColor: "#4d4d4d",
    secondaryTextColor: "#878787",
    hoverColor: "#f9fafb",
    outlineColor: "",
    hoverTextColor: "", // This is set down
    lightPrimaryColor: "", // This is set down
    primaryColorVariant:
    {
      50: '#e0eeff',
      100: '#b2ccff',
      200: '#81a9fe',
      300: '#5087fb',
      400: '#2065f8',
      500: '#2065f8',
      600: '#003bae',
      700: '#002a7e',
      800: '#00194e',
      900: '#000820',
    },
    secondaryColorVariant:
    {
      50: '#dbf6ff',
      100: '#aedfff',
      200: '#7fc8ff',
      300: '#4eb3fc',
      400: '#1f9df9',
      500: '#0683e0',
      600: '#0066af',
      700: '#00497e',
      800: '#002c4f',
      900: '#001020',
    },
    warningColorVariant:
    {
      50: '#ffeedb',
      100: '#ffd0ae',
      200: '#ffb17e',
      300: '#ff944c',
      400: '#ff751a',
      500: '#e65b00',
      600: '#b44600',
      700: '#813200',
      800: '#4f1c00',
      900: '#200700',
    },
    dangerColorVariant: {
      50: '#ffe3e8',
      100: '#ffb3bb',
      200: '#fc838f',
      300: '#f95262',
      400: '#f72337',
      500: '#dd0c1d',
      600: '#ad0616',
      700: '#7c020f',
      800: '#4c0007',
      900: '#1f0000',
    },
    successColorVariant:
    {
      50: '#e9fae6',
      100: '#cdeac4',
      200: '#b0dba1',
      300: '#91cd7e',
      400: '#73be5a',
      500: '#5aa541',
      600: '#458031',
      700: '#305c22',
      800: '#1b3812',
      900: '#031400',
    },
    disabledColorVariant:
    {
      50: '#feeff2',
      100: '#ded7d9',
      200: '#c2bebf',
      300: '#a7a5a6',
      400: '#8c8c8c',
      500: '#8c8c8c',
      600: '#5a5959',
      700: '#423f40',
      800: '#2a2526',
      900: '#17080d',
    },
    lightPrimaryColorVariant:
    {
      50: '#e0edff',
      100: '#b1c9ff',
      200: '#7fa5ff',
      300: '#4d81ff',
      400: '#1e5dfe',
      500: '#4d81ff',
      600: '#0035b3',
      700: '#002681',
      800: '#001750',
      900: '#000820',
    },

  },


}

customTheme.colors.lightPrimaryColor = Chroma(customTheme.colors.primaryColor)
  .brighten(0.4)
  .css();

customTheme.colors.hoverTextColor = customTheme.colors.primaryColor;
customTheme.colors.outlineColor = Chroma(customTheme.colors.primaryColor).brighten(1.9).css();


