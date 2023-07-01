import { Route, Routes as RouterRoutes } from "react-router-dom";

import Login from "../pages/Login";

import paths from "./paths";

import Signup from "../pages/Signup";
import UserHome from "../pages/User/Home";
import UserRestaurants from "../pages/User/Restaurants";
import UserRestaurant from "../pages/User/Restaurants/Restaurant";
import UserReservations from "../pages/User/Reservations";
import UserHistory from "../pages/User/History";

import { RedirectToHome, RedirectToNotFound } from "./utils";
import UserLayout from "../components/Layout/User";
import RestaurantLayout from "../components/Layout/Restaurant";
import AdminLayout from "../components/Layout/Admin";

import UserSettings from "../pages/User/Settings";
import RestaurntHome from "../pages/Restaurant/Home";
import RestaurantReservations from "../pages/Restaurant/Reservations";
import RestaurantReviews from "../pages/Restaurant/Reviews";
import RestaurantSettings from "../pages/Restaurant/Settings";

import AdminHome from "../pages/Admin/Home";
import AdminRestaurants from "../pages/Admin/Restaurants";
import AddAdminRestaurant from "../pages/Admin/Restaurants/Add";
import EditAdminRestaurant from "../pages/Admin/Restaurants/Edit";

import AdminUsers from "../pages/Admin/Users";
import AddAdminUser from "../pages/Admin/Users/Add";
import EditAdminUser from "../pages/Admin/Users/Edit";

const Navigation = () => {
  return (
    <RouterRoutes>
      <Route
        path={paths.login}
        element={<RedirectToHome Component={Login} />}
      />

      <Route
        path={paths.signup}
        element={<RedirectToHome Component={Signup} />}
      />

      <Route path="/" element={<RedirectToHome Component={Login} />} />

      <Route element={<UserLayout />}>
        <Route path={paths.user} element={<UserHome />} />
        <Route path={paths.userRestaurants} element={<UserRestaurants />} />
        <Route path={paths.userRestaurant} element={<UserRestaurant />} />

        <Route path={paths.userReservations} element={<UserReservations />} />
        <Route path={paths.userHistory} element={<UserHistory />} />
        <Route path={paths.userSettings} element={<UserSettings />} />
      </Route>

      <Route element={<RestaurantLayout />}>
        <Route path={paths.restaurant} element={<RestaurntHome />} />
        <Route
          path={paths.restaurantReservations}
          element={<RestaurantReservations />}
        />
        <Route path={paths.restaurantReviews} element={<RestaurantReviews />} />
        <Route
          path={paths.restaurantSettings}
          element={<RestaurantSettings />}
        />
      </Route>

      <Route element={<AdminLayout />}>
        <Route path={paths.admin} element={<AdminHome />} />
        <Route path={paths.adminRestaurants} element={<AdminRestaurants />} />
        <Route
          path={paths.addAdminRestaurant}
          element={<AddAdminRestaurant />}
        />
        <Route
          path={paths.editAdminRestaurant}
          element={<EditAdminRestaurant />}
        />

        <Route path={paths.adminUsers} element={<AdminUsers />} />
        <Route path={paths.addAdminUser} element={<AddAdminUser />} />
        <Route path={paths.editAdminUser} element={<EditAdminUser />} />
      </Route>

      <Route path="*" element={<RedirectToNotFound />} />
    </RouterRoutes>
  );
};
export default Navigation;
