import "./Signup.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ handleToken }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsLetter, setNewsLetter] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          username: name,
          email: email,
          password: password,
          newsletter: newsLetter,
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
        <h1>S'inscrire</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSignup();
          }}
        >
          <section>
            <input
              value={name}
              placeholder="Nom d'utilisateur"
              type="text"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
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
            <div>
              <input
                className="checkbox"
                type="checkbox"
                checked={newsLetter}
                onChange={() => {
                  setNewsLetter(!newsLetter);
                }}
              />
              <label htmlFor="inscription">S'inscrire ?? notre newsletter</label>
            </div>
            <p>
              En m'inscrivant je confirme avoir lu et accept?? les Termes &
              Conditions et politique de Confidentialit?? de Vinted.Je confirme
              avoir au moins 18 ans{" "}
            </p>
            <button className="submit" type="submit">
              S'inscrire
            </button>
          </section>
        </form>
      </section>
    </div>
  );
};

export default Signup;
