import { useEffect } from "react";
import Loading from "../components/general/Loading";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import paths from "./paths";
import { isAdmin } from "./utils";
import NotFound from "../pages/NotFound";
const withAdmin = (WrappedComponent: any) => {
  const HOCComponent = (props: any) => {
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
      if (!user) {
        navigate(paths.login);
      }
    }, [user, navigate]);

    if (!user) {
      return <Loading />;
    }

    if (!isAdmin(user)) {
      return <NotFound message="Not Authenticated" />;
    }

    return <WrappedComponent {...props} />;
  };

  return HOCComponent;
};

export default withAdmin;
