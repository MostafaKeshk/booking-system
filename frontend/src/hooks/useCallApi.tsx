import { useState } from "react";
import { useAlert } from "../contexts/AlertContext";
import { useAuth } from "../contexts/AuthContext";

const useCallApi = () => {
  const { msg, setErrorMessage, error } = useAlert();
  const { handleLogout } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const callApi = async (API: any, onSuccess: any, onError?: any) => {
    setLoading(true);
    try {
      const data = await API;
      onSuccess(data);
    } catch (error: any) {
      console.error({ error });
      // error callback
      if (onError) {
        onError(error);
      }

      // error token expired --> logout
      if (error?.response?.status === 401) {
        setTimeout(
          () => setErrorMessage("Section expired please log in again"),
          1000
        );
        handleLogout();
      } else if (error.response?.data?.message) {
        setErrorMessage(error?.response?.data?.message);
      } else {
        setErrorMessage("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { callApi, loading, msg, error };
};

export default useCallApi;
