import MatchItem from "../MatchItem";
import "./index.css";

const MatchItemsList = ({ matches }) => (
  <ul className="match-calendar__items-list">
    {
      (matches && matches.length !== 0) && (
        matches.map((item) => (
          <MatchItem
            key={item.id}
            date={item.utcDate}
            status={item.status}
            firstTeam={item.homeTeam.name}
            secondTeam={item.awayTeam.name}
            score={item.score}
          />
        ))
      )
    }
    {
      (matches && matches.length === 0) && (
        <li>Загрузка</li>
      )
    }
    {
      (!matches) && (
        <li>Информация отсутствует</li>
      )
    }
  </ul>
);

export default MatchItemsList;
