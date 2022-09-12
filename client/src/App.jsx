// REACT-ROUTER-DOM
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// STYLED COMPONENTS
import { ThemeProvider } from "styled-components";
// Theme Style
import { theme } from "styled/themes";
import GlobalStyle from "styled/GlobalStyle";

// Auth Wrapper
import ProtectedRoute from "components/ProtectedRoute";

// PAGES
import Home from "pages/Home";
import About from "pages/About";
import Listen from "pages/Listen";
import Contact from "pages/Contact";
import Services from "pages/Services";
import Hire from "pages/Hire";
import Page404 from "pages/Page404";

// ADMIN PAGES
import AdminHome from "pages/PagesAdmin/AdminHome";
import AdminLogin from "pages/PagesAdmin/AdminLogin";
import AdminLogout from "pages/PagesAdmin/AdminLogout";
import AdminTracks from "pages/PagesAdmin/AdminTracks";
import AdminNewTrack from "pages/PagesAdmin/AdminNewTrack";
import AdminUpdateTrack from "pages/PagesAdmin/AdminUpdateTrack";
import AdminText from "pages/PagesAdmin/AdminText";
import AdminGenres from "pages/PagesAdmin/AdminGenres";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/listen" element={<Listen />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/hire" element={<Hire />} />

          {/* PROTECTED ADMIN PAGES */}
          <Route
            path="/admin"
            element={<ProtectedRoute component={AdminHome} />}
          />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/logout"
            element={<ProtectedRoute component={AdminLogout} />}
          />
          <Route
            path="/admin/tracks"
            element={<ProtectedRoute component={AdminTracks} />}
          />
          <Route
            path="/admin/tracks/new"
            element={<ProtectedRoute component={AdminNewTrack} />}
          />
          <Route
            path="/admin/tracks/update/:id"
            element={<ProtectedRoute component={AdminUpdateTrack} />}
          />
          <Route
            path="/admin/genres"
            element={<ProtectedRoute component={AdminGenres} />}
          />
          <Route
            path="/admin/text"
            element={<ProtectedRoute component={AdminText} />}
          />

          {/* ADMIN PAGES DEV */}
          {/* <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/logout" element={<AdminLogout />} />
          <Route path="/admin/tracks" element={<AdminTracks />} />
          <Route path="/admin/tracks/new" element={<AdminNewTrack />} />
          <Route
            path="/admin/tracks/update/:id"
            element={<AdminUpdateTrack />}
          />
          <Route path="/admin/genres" element={<AdminGenres />} />
          <Route path="/admin/text" element={<AdminText />} /> */}
          {/* 404 ROUTE */}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
