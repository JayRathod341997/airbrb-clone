import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/login", { email, password });
      alert("Login successfully");
    } catch (e) {
      console.error(e);
      alert("Invalid credentials. Please try again");
      // setEmail("");
      // setPassword("");
    }
  };
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
