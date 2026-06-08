/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Reviews from "./pages/Reviews";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

