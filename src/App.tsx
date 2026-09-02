import { BrowserRouter, Routes, Route, useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Nav from "./components/Nav";
import NoiseFilter from "./components/NoiseFilter";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import About from "./pages/About";
import Work from "./pages/Work";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import ProjectDetail from "./pages/ProjectDetail";
import Blog from "./pages/Blog";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import Training from "./pages/Training";
import FAQ from "./pages/FAQ";
import Sitemap from "./pages/Sitemap";
import NotFound from "./pages/NotFound";

function Footer() {
  return (
    <footer className="relative z-10 bg-bg text-center text-muted text-xs py-8 border-t border-white/5 flex flex-col items-center gap-3">
      <div className="flex items-center gap-6">
        <Link to="/work" className="hover:text-cyan transition-colors">Work</Link>
        <Link to="/faq" className="hover:text-cyan transition-colors">FAQ</Link>
        <Link to="/sitemap" className="hover:text-cyan transition-colors">Sitemap</Link>
      </div>
      <span>Martinez Knight — Digital Infrastructure &amp; Business Transformation Company</span>
    </footer>
  );
}

// Handles both: smooth-scrolling to a section hash on the home page,
// and resetting scroll to top when landing on a fresh route/page.
function ScrollManager() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const id = location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 80);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);
  return null;
}

function App() {
  return (
    <BrowserRouter basename="/martinez-knight">
      <div id="top" className="relative min-h-screen bg-bg" style={{ overflowX: "clip" }}>
        <NoiseFilter />
        <Nav />
        <ScrollManager />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<Work />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/work/:slug" element={<ProjectDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/career" element={<Career />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/training" element={<Training />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </BrowserRouter>
  );
}

export default App;
