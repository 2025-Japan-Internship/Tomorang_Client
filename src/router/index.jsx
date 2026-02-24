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
import MainPage from "../pages/MainPage";
import EmergingDestination from "../pages/EmergingDestination";
import DestinationListPage from "../pages/DestinationListPage";
import CourseDescriptionPage from "../pages/CourseDescriptionPage";
import SearchPage from "../pages/SeachPage";
import MapPage from "../pages/MapPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/role" element={<RoleSelectPage />} />
          <Route path="/language" element={<SetLanguage />} />
          <Route path="/interest" element={<SetInterest />} />
          <Route path="/make-traveler-profile" element={<MakeTravelerProfile />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="emergingDestination" element={<EmergingDestination></EmergingDestination>}/>
          <Route path="/destination" element={<DestinationListPage />} /> 
          <Route path="/course" element={<CourseDescriptionPage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default Router;
