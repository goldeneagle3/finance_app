import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2596BE',
      light: '#F6EFEF',
      dark: '#7CC0D8',
      contrastText: '#165A72',
    },
    secondary: {
      main: '#DA1B44',
      light: '#FBE8EC',
      dark: '#ED8DA2',
      contrastText: '#6D0E22',
    },
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      // most basic recommended timing
      standard: 300,
      // this is to be used in complex animations
      complex: 375,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195,
    },
  },
});

export { theme };
