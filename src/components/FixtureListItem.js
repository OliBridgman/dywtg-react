import React, { Component } from "react";

import { formatDateToString } from "common/helpers";

export default class FixtureListItem extends Component {
  // Create the results string from the team scores
  getResultString(team1Score, team2Score) {
    let winLossDraw;
    if (team1Score > team2Score) {
      winLossDraw = "Win";
    } else if (team1Score < team2Score) {
      winLossDraw = "Loss";
    } else {
      winLossDraw = "Draw";
    }

    return `${winLossDraw} ${team1Score} - ${team2Score}`;
  }

  getTeamString(fixture) {
    return `${fixture.teams.home.team.name} vs ${fixture.teams.away.team.name}`;
  }

  // Get the results data from a fixture
  getGameResultsData(fixture) {
    const homeTeamId = fixture.teams.home.team.id;
    const homeTeamScore = fixture.teams.home.score;
    const awayTeamScore = fixture.teams.away.score;

    // check if home team is the current team and get result string
    return homeTeamId === this.props.currentTeamId
      ? this.getResultString(homeTeamScore, awayTeamScore)
      : this.getResultString(awayTeamScore, homeTeamScore);
  }

  render() {
    return (
      <li>
        <p>{formatDateToString(this.props.fixture.gameDate)}</p>
        <p>{this.getTeamString(this.props.fixture)}</p>
        {this.props.showResults ? (
          <div className="fixture-results">
            <p>{this.getGameResultsData(this.props.fixture)}</p>
            {this.props.fixture.highlightsLink ? (
              <a
                href={this.props.fixture.highlightsLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                View highlights
              </a>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </li>
    );
  }
}
