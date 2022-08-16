// REACT-ROUTER-DOM
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// STYLED COMPONENTS
import { ThemeProvider } from "styled-components";
// Theme Style
import { theme } from "styled/themes";
import GlobalStyle from "styled/GlobalStyle";

// PAGES
import Home from "pages/Home";
import About from "pages/About";
import Listen from "pages/Listen";
import Contact from "pages/Contact";
import Services from "pages/Services";
import Hire from "pages/Hire";
import Admin from "pages/admin/AdminHome";
import AdminLogin from "pages/admin/AdminLogin";
import AdminTracks from "pages/admin/AdminTracks";
import AdminNewTrack from "pages/admin/AdminNewTrack";
import FormikTSAdminNewTrack from "pages/admin/FormikTSAdminNewTrack";
import AdminUpdateTrack from "pages/admin/AdminUpdateTrack";
import AdminText from "pages/admin/AdminText";
import AdminGenres from "pages/admin/AdminGenres";

// Components
import Navbar from "components/Navbar";

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
          <Route path="/services" element={<Services />} />
          <Route path="/hire" element={<Hire />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/tracks" element={<AdminTracks />} />
          <Route path="/admin/tracks/new" element={<AdminNewTrack />} />
          <Route
            path="/admin/tracks/new-formik"
            element={<FormikTSAdminNewTrack />}
          />
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
