import Typography from "@mui/material/Typography";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Outlet } from "react-router-dom";
import Header1 from "./components/header/Header1";
import Header2 from "./components/header/Header2";
import Header3 from "./components/header/Header3";
import Hero from "./components/hero/Hero";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/scroll/ScrollToTop";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Header1/>
          <Header2/>
          <Header3/>
        <Box sx={{bgcolor:theme.palette.bg.main}}>
            <Hero/>
            <Main/>
        </Box>
        <Footer/>
        <ScrollToTop/>
          <Outlet />
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
