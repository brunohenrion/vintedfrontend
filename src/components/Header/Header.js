import "./Header.css";
import logo from "../../img/logo.svg";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

library.add(faMagnifyingGlass);

const Header = ({ handleToken, userToken }) => {
  return (
    <>
      <header>
        <div>
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
          <div className="searchbargroup">
            <button
              className="searchbar"
              id="searchbar"
              type="search"
              name="search"
              placeholder="Rechercher des articles"
            >
              <FontAwesomeIcon
                style={{ backgroundColor: "#f0f0f0", color: "grey" }}
                icon="magnifying-glass"
              />
              <input
                id="searchbar"
                type="search"
                name="search"
                placeholder="Rechercher des articles"
              />
            </button>
          </div>
          <div>
            {!userToken ? (
              <>
                <Link to="/signup">
                  <button>s'inscrire</button>
                </Link>
                <Link to="/login">
                  <button>Se connecter</button>
                </Link>
              </>
            ) : (
              <button
                style={{ backgroundColor: "red" }}
                onClick={() => {
                  handleToken();
                }}
              >
                Deconnexion
              </button>
            )}
            <Link to="/publish">
              <button className="Vendstesarticles">Vends tes articles</button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
