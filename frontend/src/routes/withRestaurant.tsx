import { useEffect } from "react";
import Loading from "../components/general/Loading";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import paths from "./paths";
import { isAdmin, isSameRestaurant } from "./utils";
import NotFound from "../pages/NotFound";

const withRestaurant = (WrappedComponent: any) => {
  const HOCComponent = (props: any) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { restaurantId } = useParams();

    useEffect(() => {
      if (!user) {
        navigate(paths.login);
      }
    }, [user, navigate]);

    if (!user) {
      return <Loading />;
    }

    if (!isSameRestaurant(user, restaurantId) && !isAdmin(user)) {
      return <NotFound message="Not Authenticated" />;
    }

    return <WrappedComponent {...props} />;
  };

  return HOCComponent;
};

export default withRestaurant;
