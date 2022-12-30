import { MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride = {
  colorScheme: "light",
  colors: {
    // Add your color
    deepBlue: ["#E9EDFC", "#C1CCF6", "#99ABF0" /* ... */],
    // or replace default theme color
    blue: ["#E9EDFC", "#C1CCF6", "#99ABF0" /* ... */],
  },

  shadows: {
    md: "1px 1px 3px rgba(0, 0, 0, .25)",
    xl: "5px 5px 3px rgba(0, 0, 0, .25)",
  },

  fontFamily: "'Josefin Sans', sans-serif",

  headings: {
    fontFamily: "'Yeseva One', cursive",
    sizes: {
      h1: { fontSize: 36, lineHeight: 1.2 },
      h2: { fontSize: 28, lineHeight: 1.2 },
      h3: { fontSize: 24, lineHeight: 1.2 },
    },
  },

  globalStyles: (theme) => ({
    body: {
      ...theme.fn.fontStyles(),
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[0]
          : theme.colors.gray[6],
    },
  }),
};
