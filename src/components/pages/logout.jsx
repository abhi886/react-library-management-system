import { useState, useEffect } from "react";
import auth from "../../services/authService";
import LoadingSpinner from "../common/loadingSpinner";
const Logout = () => {
  const [isLoading, SetIsLoading] = useState(false);
  useEffect(() => {
    SetIsLoading(true);
    try {
      setTimeout(() => {
        auth.logout();
        window.location = "/";
      }, 5000);
    } catch (ex) {
      console.log(ex.message);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner
          type={"balls"}
          color={"#0b3060"}
          text={"Logging You Out Gracefull !!"}
        />
      ) : null}
    </>
  );
};

export default Logout;
