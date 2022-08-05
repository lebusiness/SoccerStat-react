import "./index.css";

const PaginationItem = ({ index, active, onshowAnotherList }) => {
  const clickPaginationItemHandler = () => {
    onshowAnotherList(index - 1);
  };
  return (
    <li className="pagination-list__item">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <span className={`pagination-list__link ${active ? "active" : ""}`} onClick={clickPaginationItemHandler}>
        {index}
      </span>
    </li>
  );
};

export default PaginationItem;
