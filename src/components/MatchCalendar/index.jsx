import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MatchItemsList from "./MatchItemsList";
import Pagination from "../../UI/Pagination";
import "./index.css";

const MatchCalendarPage = ({ teams, leagues }) => {
  const [matches, setMatches] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [activeItem, setActiveItem] = useState(null);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const params = useParams();
  const key = Object.entries(params)[0];
  const [matchType, matchName] = key;
  const matchTypeName = (matchType === "leagueID" ? "Лиги" : "Команды");
  const prevUrl = (matchType === "leagueID" ? "/leagues" : "/teams");
  const urlFetch = matchType === "leagueID"
    ? `https://api.football-data.org/v2/competitions/${params.leagueID}/matches`
    : `https://api.football-data.org/v2/teams/${params.teamID}/matches`;

  const onGetData = async (response) => {
    const data = await response.json();
    if (data.errorCode || data.matches?.length === 0) {
      setMatches(null);
      setErrorMessage(data.message);
    } else {
      setErrorMessage(null);
      setMatches(data.matches);
    };
  }

  async function getData(url, onGetData) {
    // console.log(params);
    let response;
    try {
      response = await fetch(url, {
        method: "GET",
        headers: {
          "X-Auth-Token": process.env.REACT_APP_API_KEY,
        },
      });
    } catch (e) {
      setErrorMessage("Ошибка при запросе на сервер");
      setMatches(null);
      return;
    }
    onGetData(response);
  }

  useEffect(() => {
    getData(urlFetch, onGetData);
  }, []);

  useEffect(() => {
    if (dateFrom === null || dateTo === null) return;
    getData(`${urlFetch}?dateFrom=${dateFrom}&dateTo=${dateTo}`, onGetData);
  }, [dateFrom, dateTo]);

  useEffect(() => {
    if (!leagues || !teams) return;
    if (matchType === "leagueID") {
      setActiveItem(leagues.filter((el) => el.id === +params.leagueID)[0]);
    } else {
      setActiveItem(teams.filter((el) => el.id === +params.teamID)[0]);
    }
  }, [leagues, teams]);

  const loadFilterItemsHandler = (pageIndex) => {
    setActivePage(pageIndex + 1);
  };

  return (
    <section className="match-calendar">
      <div className="container">
        <div className="match-calendar__link-wrapper">
          <Link className="match-calendar__prev-link" to={prevUrl}>
            {matchTypeName}
          </Link>
          <span className="sign">
            {">"}
          </span>
          <div>
            {activeItem ? activeItem.name : "загрузка..."}
          </div>
        </div>
        <div className="match-calendar__title">
          { matchTypeName }
        </div>
        <div className="match-calendar__main">
          <span>c</span>
          <input
            type="date"
            onChange={(event) => setDateFrom(event.target.value)}
          />
          <span>до</span>
          <input
            type="date"
            onChange={(event) => setDateTo(event.target.value)}
          />
        </div>
        {errorMessage ? (
          <span className="error-message">{errorMessage}</span>
        ) : (
          <MatchItemsList
            matches={
              matches ? matches.filter((_, index) => {
                if (index < (activePage - 1) * 7) return false;
                if (index > (activePage) * 7 - 1) return false;
                return true;
              }) : null
            }
          />
        )}
      </div>
      {(matches && matches.length !== 0) && (
        <Pagination
          itemsCount={matches.length}
          onLoadFilterItems={loadFilterItemsHandler}
          activeIndex={activePage}
          itemsOnPageCount={7}
        />
      )}
    </section>
  );
};

export default MatchCalendarPage;
