import "./index.css";
import PaginationItem from "./PaginationItem";

const Pagination = ({
  itemsCount, onLoadFilterItems, activeIndex, itemsOnPageCount,
}) => {
  if (itemsCount === null) {
    return <div>Nothing to read</div>;
  }

  const paginationItemsCount = (itemsCount % itemsOnPageCount) === 0
    ? itemsCount / itemsOnPageCount
    : Math.trunc(itemsCount / itemsOnPageCount) + 1;
  const pagItemsArray = [];
  const showAnotherListHandler = (index) => {
    onLoadFilterItems(index);
  };
  let startIndex;
  let endIndex;
  if (paginationItemsCount === 6) {
    startIndex = 1;
    endIndex = 6;
  } else if (activeIndex < 5) {
    startIndex = 1;
    endIndex = 5;
  } else {
    startIndex = activeIndex - 2;
    endIndex = activeIndex + 2;
  }
  for (let i = startIndex; i <= paginationItemsCount; i += 1) {
    if (i <= endIndex || i === paginationItemsCount) {
      pagItemsArray.push(
        <PaginationItem
          index={i}
          key={i}
          active={i === activeIndex}
          onshowAnotherList={showAnotherListHandler}
        />,
      );
    } else if (i === paginationItemsCount - 1) {
      pagItemsArray.push(<li className="pagination-list__item pagination-list__link-etc" key={i}>...</li>);
    }
  }
  return (
    <div className="wrapp-flex">
      <ul className="pagination-list">
        <li className={`pagination-list__item ${activeIndex === 1 && "arrow-disabled"}`}>
          <span
            className="pagination-list__link"
            onClick={() => {
              activeIndex > 1 && showAnotherListHandler(activeIndex - 2);
            }}
          >
            «
          </span>
          </li>
          {pagItemsArray}
          <li className={`pagination-list__item ${activeIndex === paginationItemsCount && "arrow-disabled"}`}>
          <span
            className="pagination-list__link"
            onClick={() => {
              activeIndex < paginationItemsCount && showAnotherListHandler(activeIndex);
            }}
          >
            »
          </span>
          </li>
        </ul>
    </div>
  );
};

export default Pagination;
