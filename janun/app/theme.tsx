import { createTheme } from "@mui/material/styles";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const getTheme = (mode:any) => createTheme({
  palette: {
    mode: mode,
    background: {
      default: mode === 'dark' ? "#010101" : "#0f0f0f",
      paper: mode === 'dark' ? "#181C14" : "#181C14",
    },
    primary: {
      main: "#bcfd49",
    },
    secondary: {
      main: "#f9e94b",
    },
    text: {
      primary: mode === 'dark' ? "#ffffff" : "#ffffff",
      secondary: mode === 'dark' ? "#eeeeee" : "#eeeeee",
    },
  },
  typography: {
    fontFamily: `'${inter.style.fontFamily}', sans-serif`,
    h1: {
      fontFamily: `'${inter.style.fontFamily}', sans-serif`,
      fontWeight: 700,
      fontSize: "4rem",
    },
    body1: {
      fontFamily: `'${inter.style.fontFamily}', sans-serif`,
      fontWeight: 400,
      fontSize: "1rem",
    },
  },
});

export default getTheme;
