import React, { useEffect, useState } from "react";
import SearchInput from "../../UI/SearchInput";
import ItemsList from "./ItemsList";
import Pagination from "../../UI/Pagination";

const ItemsPage = ({
  items,
  props,
  itemsOnPageCount,
}) => {
  const [searchFilterArray, setSearchFilterArray] = useState(items);
  const [loadFilterArray, setLoadFilterArray] = useState([]);
  const [activeIndex, setActiveIndex] = useState(1);

  const searchFilterItemsHandler = (searchValue) => {
    const searchFilteredArray = items
      .filter((item) => item.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1);
    setSearchFilterArray(searchFilteredArray);
  };

  const loadFilterItemsHandler = (listIndex) => {
    if (items === null) return;
    // console.log(searchFilterArray);
    if (searchFilterArray.length === 0) {
      setLoadFilterArray([]);
      return;
    }
    let finishArray = [];
    if (searchFilterArray.length) {
      finishArray = searchFilterArray;
    } else {
      finishArray = items;
    }
    setActiveIndex(listIndex + 1);
    const fromIndex = listIndex * itemsOnPageCount;
    const toIndex = fromIndex + (itemsOnPageCount - 1);
    const updatedArray = finishArray.filter((item, itemIndex) => {
      return (
        itemIndex >= fromIndex && itemIndex <= toIndex
      );
    });
    setLoadFilterArray(updatedArray);
    // console.log(`update`, updatedArray)
  };

  useEffect(() => {
    if(searchFilterArray){
      loadFilterItemsHandler(0);
    }
  }, [searchFilterArray, items]);

  useEffect(() => {
    if(items) {
      setSearchFilterArray(items);
    }
  }, [items]);

  const pathName = props.match.path;
  const LoadingPage = <section><p>Загрузка...</p></section>;
  const notFoundPage = <section><p>Не найдено...</p></section>;

  if (items === null) {
    return (
      <section className="items">
        <div className="container">
          <div className="error-message">Ошибка сервера</div>
        </div>
      </section>
    )
  }

  return (
    <section className="items">
      <div className="container">
        <SearchInput onFilterItemsHandler={searchFilterItemsHandler} />
        {!items.length && LoadingPage}
        {(searchFilterArray.length === 0 && items.length !== 0) && notFoundPage}
        {/*{searchFilterArray.length !== 0 && <ItemsList items={loadFilterArray} pathName={pathName} />}*/}
        <ItemsList items={loadFilterArray} pathName={pathName} />
        {searchFilterArray.length !== 0 && (
          <Pagination
            itemsCount={searchFilterArray.length}
            onLoadFilterItems={loadFilterItemsHandler}
            activeIndex={activeIndex}
            itemsOnPageCount={itemsOnPageCount}
          />
        )}

      </div>
    </section>
  );
};

export default ItemsPage;
