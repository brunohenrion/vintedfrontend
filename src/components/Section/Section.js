import "./Section.css";
import { Link } from "react-router-dom";

const Section = () => {
  return (
    <>
      <article className="hero">
        <div>
          <p>Prêts à faire du tri dans vos placards? </p>

          <Link to="/publish">
            <button>Commencer a vendre</button>
          </Link>
        </div>
      </article>
    </>
  );
};

export default Section;
