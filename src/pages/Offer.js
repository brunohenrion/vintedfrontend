import "./Offer.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>...Loading</p>
  ) : (
    <div>
      <div className="group">
        <div>
          <img src={data.product_image.secure_url} alt="" />
        </div>
        <div className="description">
          <span className="price"> {data.product_price} €</span>
          <div className="details">
            {data.product_details.map((detail, index) => {
              const keyName = Object.keys(detail);

              return (
                <div key={index}>
                  <div className="column">
                    <div className="left">
                      <span>{keyName[0]}</span>
                    </div>
                    <div className="right">
                      <span>{detail[keyName[0]]}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="parag">
            <p> _____________________________________________</p>
          </div>
          <div className="para">
            <span className="name">{data.product_name}</span>
            <br />
            <br />
            <span className="des">{data.product_description}</span>
            <br />
            <br />
            <span className="username">{data.owner.account.username}</span>
          </div>

          <button
            onClick={() => {
              navigate("/payment", {
                state: { title: data.product_name, price: data.product_price },
              });
            }}
            className="acheter"
          >
            Acheter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Offer;
