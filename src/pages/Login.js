import "./Login.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );

      console.log(response.data);
      handleToken(response.data.token);
      navigate("/");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div>
      <section>
        <h3>Se connecter</h3>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleLogin();
          }}
        >
          <section>
            <input
              value={email}
              placeholder="Email"
              type="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              value={password}
              placeholder="Password"
              type="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />

            <button className="submit" type="submit">
              Se connecter
            </button>
            <p>pas encore de compte ? Inscris-toi !</p>
          </section>
        </form>
      </section>
    </div>
  );
};

export default Login;
