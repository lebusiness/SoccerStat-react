import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import MatchCalendarPage from "./components/MatchCalendar";
import ItemPages from "./components/Items";

const App = () => {
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchLeagues = async () => {
      let response;
      try {
        response = await fetch('https://api.football-data.org/v2/competitions?plan=TIER_ONE', {
          method: "GET",
          headers: {
            "X-Auth-Token": process.env.REACT_APP_API_KEY,
          },
        });
      } catch (e) {
        // setErrorMessage("Ошибка при запросе на сервер");
        setLeagues(null);
        return;
      }
      const data = await response.json();
      const transformedLeagues = data.competitions.map((leagueData) => ({
        id: leagueData.id,
        name: leagueData.name,
        country: leagueData.area.name,
      }));
      setLeagues(transformedLeagues);
    };

    const fetchTeams = async () => {
      let response;
      console.log(process.env.REACT_APP_API_KEY);
      try {
        response = await fetch('https://api.football-data.org/v2/teams', {
          method: "GET",
          headers: {
            "X-Auth-Token": process.env.REACT_APP_API_KEY,
          },
        });
      } catch (e) {
        console.log("error");
        setTeams([]);
        return;
      }
      const data = await response.json();
      const transformedTeams = data.teams.map((teamData) => ({
        id: teamData.id,
        name: teamData.name,
        imgUrl: teamData.crestUrl,
      }));
      setTeams(transformedTeams);
    };
    fetchLeagues();
    fetchTeams();
  }, []);

  return (
    <>
      <Header />
      <main className="main">
        <Switch>
          <Route path="/" exact>
            <Redirect to="/leagues" />
          </Route>
          <Route path="/leagues" exact>
            {((props) => (
              <ItemPages
                items={leagues}
                props={props}
                itemsOnPageCount={9}
              />
            ))}
          </Route>
          <Route path="/leagues/:leagueID">
            <MatchCalendarPage teams={teams} leagues={leagues} />
          </Route>
          <Route path="/teams" exact>
            {(props) => <ItemPages items={teams} props={props} itemsOnPageCount={10} />}
          </Route>
          <Route path="/teams/:teamID">
            <MatchCalendarPage teams={teams} leagues={leagues} />
          </Route>
        </Switch>
      </main>
    </>
  );
};

export default App;
