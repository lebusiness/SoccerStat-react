import { NavLink } from "react-router-dom";
import logoImage from "../../assets/logo/logo.png";
import "./index.css";

const Header = () => (
  <header className="header">
    <div className="container header__container">
      <div className="header__inner">
        <img src='https://s1.mzstatic.com/us/r30/Purple5/v4/9c/c0/7a/9cc07aa3-38f9-6c19-455f-c8e6d2cbfe72/mzl.tuebwjxl.png' width="70px" height="70px" alt="Логотип" />
        <nav className="header__nav">
          <ul className="header__list">
            <li className="header__list-item">
              <NavLink className="header__nav-link" to="/leagues" activeClassName="header__list-item--active">
                Лиги
              </NavLink>
            </li>
            <li className="header__list-item">
              <NavLink className="header__nav-link" to="/teams" activeClassName="header__list-item--active">
                Команды
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
);

export default Header;
