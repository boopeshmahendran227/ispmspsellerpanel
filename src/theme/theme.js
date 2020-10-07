import { theme } from "@chakra-ui/core";

export const customTheme = {
  ...theme,
  fonts: {
    body: "Lato, sans-serif",
    heading: "Lato, serif",
    mono: "Menlo, monospace",
  },
  colors: {
    ...theme.colors,
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  },
};