import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import SetLanguage from "../pages/SelectLanguage";
import Temp from "../pages/Temp";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Temp />} />
          <Route path="/language" element={<SetLanguage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
