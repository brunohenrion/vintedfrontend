import "./Home.css";
import axios from "axios";
import Section from "../components/Section/Section";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = ({ userToken }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        console.log(response.data);
        console.log(response.data.offers[0].owner.account.avatar.secure_url);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <div>
      <Section />

      <div className="imageGroup">
        {data.offers.map((elem) => {
          return (
            <div className="images" key={elem._id}>
              <div>
                <div className="ava">
                  {elem.owner.account.avatar && (
                    <img
                      className="avatar"
                      src={elem.owner.account.avatar.secure_url}
                      alt=""
                    />
                  )}

                  <h2>{elem.owner.account.username}</h2>
                </div>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/offer/${elem._id}`}
                >
                  <img src={elem.product_image.secure_url} alt="" />

                  <section className="description">
                    <h3>{elem.product_price} €</h3>
                    {elem.product_details.map((elem, index) => {
                      return (
                        <div className="infos" key={index}>
                          <span>{elem.TAILLE}</span>
                          <span>{elem.MARQUE}</span>
                        </div>
                      );
                    })}
                  </section>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
