import { useEffect } from "react";
import { useHistory } from "react-router-dom";

function Logout() {
  const history = useHistory();
  useEffect(() => {
    fetch("/logout", { method: "DELETE" }).then((r) => r.json());
    history.push("/");
  }, []);
}
export default Logout;
