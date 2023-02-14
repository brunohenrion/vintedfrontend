import "./Publish.css";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Publish = ({ userToken }) => {
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [state, setState] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);
  // const [imageToDisplay, setImageToDisplay] = useState();

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("picture", picture);
      formData.append("title", title);
      formData.append("Description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("state", state);
      formData.append("city", location);
      formData.append("price", price);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return userToken ? (
    <div className="Publish">
      <h4>Vends ton article</h4>
      <div className="form">
        <input
          type="file"
          name="Ajouter une photo"
          onChange={(event) => {
            // console.log(event.target.files[0]);
            setPicture(event.target.files[0]);
          }}
        />
        <input
          value={title}
          type="text"
          placeholder="ex: Chemise Sézanne verte"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <textarea
          value={description}
          placeholder="ex: porté quelquefois, taille correctement"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <input
          value={brand}
          type="text"
          placeholder="ex: Zara"
          onChange={(event) => {
            setBrand(event.target.value);
          }}
        />

        <input
          value={size}
          type="text"
          placeholder="ex: L / 40 / 12"
          onChange={(event) => {
            setSize(event.target.value);
          }}
        />

        <input
          value={color}
          type="text"
          placeholder="ex: Fushia"
          onChange={(event) => {
            setColor(event.target.value);
          }}
        />

        <input
          value={state}
          type="text"
          placeholder="ex: Neuf avec etiquette"
          onChange={(event) => {
            setState(event.target.value);
          }}
        />
        <input
          value={location}
          type="text"
          placeholder="ex: Paris"
          onChange={(event) => {
            setLocation(event.target.value);
          }}
        />

        <input
          value={price}
          type="Number"
          placeholder="ex: 0.00 €"
          onChange={(event) => {
            setPrice(event.target.value);
          }}
        />
        <br />
        <input className="checkbox" type="checkbox" />
        <label htmlFor="inscription">
          Je suis intéressé(e) par les échanges
        </label>
        <button className="ajouter" onClick={handleSubmit}>
          Ajouter
        </button>
      </div>
      {/* {imageToDisplay && <img src={imageToDisplay.secure_url} alt="" />} */}
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
