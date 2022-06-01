import React from "react";
// REACT-ROUTER-DOM
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// STYLED COMPONENTS
import { ThemeProvider } from "styled-components";
// Theme Style
import { theme } from "./styled/themes";
import GlobalStyle from "./styled/GlobalStyle";

// PAGES
import Home from "./pages/Home";
import About from "./pages/About";
import Listen from "./pages/Listen";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import Hire from "./pages/Hire";
import Admin from "./pages/Admin/AdminHome";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminTracks from "./pages/Admin/AdminTracks";
import AdminNewTrack from "./pages/Admin/AdminNewTrack";
import AdminUpdateTrack from "./pages/Admin/AdminUpdateTrack";
import AdminText from "./pages/Admin/AdminText";
import AdminGenres from "./pages/Admin/AdminGenres";

// Components
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/listen" element={<Listen />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/hire" element={<Hire />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/tracks" element={<AdminTracks />} />
          <Route path="/admin/tracks/new" element={<AdminNewTrack />} />
          <Route
            path="/admin/tracks/update/:id"
            element={<AdminUpdateTrack />}
          />
          <Route path="/admin/genres" element={<AdminGenres />} />
          <Route path="/admin/text" element={<AdminText />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
