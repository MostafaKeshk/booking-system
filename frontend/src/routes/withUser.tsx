import { useEffect } from "react";
import Loading from "../components/general/Loading";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import paths from "./paths";
import { isAdmin, isSameUser } from "./utils";
import NotFound from "../pages/NotFound";
const withUser = (WrappedComponent: any) => {
  const HOCComponent = (props: any) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { userId } = useParams();

    useEffect(() => {
      if (!user) {
        navigate(paths.login);
      }
    }, [user, navigate]);

    if (!user) {
      return <Loading />;
    }

    if (!isSameUser(user, userId) && !isAdmin(user)) {
      return <NotFound message="Not Authenticated" />;
    }

    return <WrappedComponent {...props} />;
  };

  return HOCComponent;
};

export default withUser;
