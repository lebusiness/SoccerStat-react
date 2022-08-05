import "./index.css";

const MatchItem = ({
  date, status, firstTeam, secondTeam, score,
}) => (
  <li className="match-calendar__item">
    <div>{date}</div>
    <div>{status}</div>
    <span>{firstTeam}</span>
    <div>-</div>
    <span>{secondTeam}</span>
    <div>
      {(score.fullTime?.homeTeam !== null) && (
        <span>
          {score.fullTime.homeTeam}
          :
          {score.fullTime.awayTeam}
        </span>
      )}
      {(score.extraTime?.homeTeam !== null) && (
        <span>
          {score.extraTime.homeTeam}
          :
          {score.extraTime.awayTeam}
        </span>
      )}
      {(score.extraTime?.homeTeam !== null) && (
        <span>
          {score.penalties.homeTeam}
          :
          {score.penalties.awayTeam}
        </span>
      )}
    </div>
    {/* <div>{score}</div> */}
  </li>
);

export default MatchItem;
