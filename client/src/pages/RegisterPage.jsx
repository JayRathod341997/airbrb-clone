import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const registerUser = (event) => {
    event.preventDefault();
    axios.get("http://localhost:4000/test");
  };
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input type="text" placeholder="Jay Rathod" />
          <input type="email" placeholder="your@email.com" />
          <input type="password" placeholder="password" />
          <button className="primary">Register</button>
          <div className="text-center py-1">
            <p className="text-sm text-gray-500">
              {"Already Member? "}
              <Link to={"/login"} className="underline text-primary">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
