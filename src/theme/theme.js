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
    backgroundColor:
    {
      100: '#e5efff',
      200: '#e5efff',
      300: '#e5efff',
      400: '#e5efff',
      500: '#e5efff',
      600: '#e5efff',
      700: '#e5efff',
      800: '#e5efff',
      900: '#e5efff',
    },
    disabledColor: {
      100: '#8c8c8c',
      200: '#8c8c8c',
      300: '#8c8c8c',
      400: '#8c8c8c',
      500: '#8c8c8c',
      600: '#8c8c8c',
      700: '#8c8c8c',
      800: '#8c8c8c',
      900: '#8c8c8c'
    },
    borderColor:
    {
      100: '#d9d9d9',
      200: '#d9d9d9',
      300: '#d9d9d9',
      400: '#d9d9d9',
      500: '#d9d9d9',
      600: '#d9d9d9',
      700: '#d9d9d9',
      800: '#d9d9d9',
      900: '#d9d9d9',
    },
    secondaryColor:
    {
      100: "#068ff4",
      200: "#068ff4",
      300: "#068ff4",
      400: "#068ff4",
      500: "#068ff4",
      600: "#068ff4",
      700: "#068ff4",
      800: "#068ff4",
      900: "#068ff4",
    },
    warningColor: {
      100: "#d35400",
      200: "#d35400",
      300: "#d35400",
      400: "#d35400",
      500: "#d35400",
      600: "#d35400",
      700: "#d35400",
      800: "#d35400",
      900: "#d35400"
    },
    dangerColor:
    {
      100: "#f94a5b",
      200: "#f94a5b",
      300: "#f94a5b",
      400: "#f94a5b",
      500: "#f94a5b",
      600: "#f94a5b",
      700: "#f94a5b",
      800: "#f94a5b",
      900: "#f94a5b"
    },
    successColor: {
      100: "#61B246",
      200: "#61B246",
      300: "#61B246",
      400: "#61B246",
      500: "#61B246",
      600: "#61B246",
      700: "#61B246",
      800: "#61B246",
      900: "#61B246"
    },
    primaryTextColor: {
      100: "#4d4d4d",
      200: "#4d4d4d",
      300: "#4d4d4d",
      400: "#4d4d4d",
      500: "#4d4d4d",
      600: "#4d4d4d",
      700: "#4d4d4d",
      800: "#4d4d4d",
      900: "#4d4d4d"
    },
    secondaryTextColor: {
      100: "#878787",
      200: "#878787",
      300: "#878787",
      400: "#878787",
      500: "#878787",
      600: "#878787",
      700: "#878787",
      800: "#878787",
      900: "#878787"
    },
    hoverColor: {
      100: "#f9fafb",
      200: "#f9fafb",
      300: "#f9fafb",
      400: "#f9fafb",
      500: "#f9fafb",
      600: "#f9fafb",
      700: "#f9fafb",
      800: "#f9fafb",
      900: "#f9fafb"
    },
    foregroundColor: {
      100: "white",
      200: "white",
      300: "white",
      400: "white",
      500: "white",
      600: "white",
      700: "white",
      800: "white",
      900: "white",
    },
    primaryColorVariant: {
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



// customTheme.colors.hoverTextColor = customTheme.colors.primaryColorVariant[500];
// customTheme.colors.outlineColor = Chroma(customTheme.colors.primaryColorVariant[500]).brighten(1.9).css();


