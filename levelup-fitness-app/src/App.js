// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom"; // Import routing components
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Navbar from "./components/Navbar";
import Home from "./pages/Feed";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import HeroPage from "./pages/Hero";
import logInPage from "./pages/LogIn";
const userLoggedIn = false;

const AnimatedRoutes = () => {
  const location = useLocation(); // Call useLocation inside the component

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key} // Unique key for each route change
        classNames="fade" // This should match the class name in your CSS
        timeout={500} // Duration of the transition in ms
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<logInPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/hero"
            element={<HeroPage isLoggedIn={userLoggedIn} />}
          />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={userLoggedIn} />
        <AnimatedRoutes />
      </div>
    </Router>
  );
};

export default App;
