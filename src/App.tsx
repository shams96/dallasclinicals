import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Sponsors from "./pages/Sponsors";
import Patients from "./pages/Patients";
import Locations from "./pages/Locations";
import About from "./pages/About";
import Eligibility from "./pages/Eligibility";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="admin" element={<Admin />} />
          <Route path="sponsors" element={<Sponsors />} />
          <Route path="patients" element={<Patients />} />
          <Route path="locations" element={<Locations />} />
          <Route path="about" element={<About />} />
          <Route path="check-eligibility" element={<Eligibility />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
