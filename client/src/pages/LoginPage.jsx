import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContextProvider";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState("");
  const { setUser } = useContext(UserContext);
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/login", { email, password });
      alert("Login successfully");

      setUser(data); // fetch user document from mongodb -> await User.findOne({ email })
      setRedirect(true); // Redirect to home page after successful login
    } catch (e) {
      console.error(e);
      alert("Invalid credentials. Please try again");
      // setEmail("");
      // setPassword("");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto " onSubmit={formSubmitHandler}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-1">
            <p className="text-sm text-gray-500">
              {"Don't have an account? Sign up "}
              <Link to={"/register"} className="underline text-primary">
                here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
