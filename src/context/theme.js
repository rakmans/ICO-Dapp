import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    // primary: {
    //   // main: "rgba(255, 202, 212,0.7)",
    // },

    secondary: {
      main: "#1B3C73",
    },
  },
});
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    // primary: {
    //   main: "rgba(0, 0, 0)",
    // },

    // secondary: {
    //   main: "rgba(0, 0, 0)",
    // },
  },
});
