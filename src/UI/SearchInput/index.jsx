import { useRef } from "react";
import search from "../../assets/SearchInput/search.svg";
import "./index.css";

const SearchInput = ({ onFilterItemsHandler }) => {
  const searchInputRef = useRef();
  const inputFilterBValueHandler = () => {
    const searchValue = searchInputRef.current.value;
    onFilterItemsHandler(searchValue);
  };
  return (
    <form className="search-form">
      <input className="search-form__input" type="text" placeholder="Поиск" onInput={inputFilterBValueHandler} ref={searchInputRef} />
      <img className="search-form__img" src='https://schtirlitz.ru/800/600/https/static.tildacdn.com/tild6139-3134-4533-a665-313066353937/img_517697.png' style={{opacity: '0.8'}} width="15px" alt="search" />
    </form>
  );
};

export default SearchInput;
