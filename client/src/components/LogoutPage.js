import { useHistory, Link } from "react-router-dom";
function LogoutPage() {
  const history = useHistory();
  // history.push("/");
  return (
    <>
      <h1> Thank you for visiting!</h1>
      <Link to="/">Visit again!</Link>
    </>
  );
}
export default LogoutPage;
