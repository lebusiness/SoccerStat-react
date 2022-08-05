import "./index.css";
import { Link } from "react-router-dom";

const Item = ({
  name, country, pathName, crestUrl, id,
}) => {
  return (
    <li className="items__item">
      <Link className={`items__link-wrapper${pathName !== "/leagues" ? "-img" : ""}`} to={`${pathName}/${id}`}>
        <p className="items__name">{name}</p>
        {pathName === "/leagues" && <p className="items__country">{country}</p>}
        {pathName !== "/leagues" && <img className="items__img" width="100px" src={crestUrl} alt="" />}
      </Link>
    </li>
  );
};

export default Item;
