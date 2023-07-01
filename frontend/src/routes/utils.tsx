import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import paths from "./paths";
import NotFound from "../pages/NotFound";
import { userTypes } from "../utils/constants";

export const isUser = (user: any) => user && user.userType === userTypes.user;

export const isSameUser = (user: any, userId: any) =>
  user && user.userType === userTypes.user && user._id === userId;

export const isRestaurant = (user: any) =>
  user && user.userType === userTypes.restaurant;

export const isSameRestaurant = (user: any, restaurantId: any) =>
  user && user.userType === userTypes.restaurant && user._id === restaurantId;

export const isAdmin = (user: any) => user && user.userType === "admin";

type IProps = {
  Component: any;
};

export const RedirectToHome: React.FC<IProps> = ({ Component }) => {
  const { user } = useAuth();

  if (isUser(user)) {
    return <Navigate to={paths.getUser(user._id)} />;
  }

  if (isRestaurant(user)) {
    return <Navigate to={paths.getRestaurant(user._id)} />;
  }

  if (isAdmin(user)) {
    return <Navigate to={paths.getAdmin(user._id)} />;
  }

  return <Component />;
};

export const RedirectToNotFound: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={paths.login} />;
  }

  return <NotFound message="404 Not Found" pageHasHeader />;
};
