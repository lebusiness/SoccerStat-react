import "./index.css";
import Item from "../Item";

const ItemsList = ({ items, pathName }) => {
  const ItemsData = items
    .map((item) => (
      <Item
        name={item.name}
        country={item.country}
        key={item.id}
        id={item.id}
        pathName={pathName}
        crestUrl={item.imgUrl}
      />
    ));

  return (
    <ul className={pathName === "/leagues" ? "items__list-3" : "items__list-5"}>
      {ItemsData}
    </ul>
  );
};

export default ItemsList;
