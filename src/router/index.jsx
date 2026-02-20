import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import SetLanguage from "../pages/SelectLanguage";
import SetInterest from "../pages/SelectInterest";
import MakeTravelerProfile from "../pages/MakeTravelerProfile";
import WelcomePage from "../pages/WelcomePage";
import Temp from "../pages/Temp";
import StartPage from "../pages/StartPage";
import Login from "../pages/LoginPage";
import RoleSelectPage from "../pages/RoleSelectPage";
import TravelerSignupPage from "../pages/TravelerSignupPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/role" element={<RoleSelectPage />} />
          <Route path="/language" element={<SetLanguage />} />
          <Route path="/interest" element={<SetInterest />} />
          <Route path="/make-traveler-profile" element={<MakeTravelerProfile />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/travelersignup" element={<TravelerSignupPage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default Router;
