import React, { Component } from "react";
import styled from "styled-components";
import FetchHighlight from './FetchHighlight';

import { formatDateToString } from "common/helpers";
import { fadeIn, slideLeft } from "common/animations";

import { createGet } from '../helpers';

const getLink = createGet(['content', 'link'])

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
    const { fixture, showResults } = this.props
    return (
      <ListItem>
        <p>{formatDateToString(fixture.gameDate)}</p>
        <p>{this.getTeamString(fixture)}</p>
        {showResults ? (
          <FixtureListItemResults>
            <FixtureScore as="p">
              {this.getGameResultsData(fixture)}
            </FixtureScore>
            <FetchHighlight link={getLink(fixture)}>
              {({link}) => link && (
                <FixtureHighlights
                  as="a"
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer">
                View highlights
              </FixtureHighlights>
              )}
            </FetchHighlight>
          </FixtureListItemResults>
        ) : (
          ""
        )}
      </ListItem>
    );
  }
}

const ListItem = styled.li`
  margin-bottom: 1.5em;
  animation: fade-in 500ms;
  list-style-type: none;
  > p {
    margin: 5px 0;
    &:nth-child(2) {
      font-weight: 900;
    }
  }
`;

const Button = styled.button`
  display: inline-block;
  width: 150px;
  padding: 8px;
  margin: 0;
  line-height: 1.5;
  font-size: 0.9em;
  background-color: var(--secondary-colour);
  color: white;
  text-transform: uppercase;
  text-align: center;
  border: 1px solid transparent;
  text-decoration: none;
  animation: ${fadeIn} 500ms;
  :hover,
  :focus {
    background-color: var(--primary-colour);
  }
`;

const FixtureScore = styled(Button)`
  position: relative;
  overflow: hidden;
  cursor: default;
  ::after {
    content: "Reveal Score...";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 7px;
    cursor: default;
    background-color: var(--primary-colour);
    border: 1px dashed white;
  }
  :hover::after {
    background-color: var(--secondary-colour);
    animation: ${slideLeft} 1s;
    animation-timing-function: cubic-bezier(1, 0.005, 1, 0.505);
    animation-fill-mode: forwards;
  }
`;

const FixtureHighlights = styled(Button)`
  @media (min-width: 521px) {
    margin-left: 10px;
  }
`;

const FixtureListItemResults = styled.div`
  display: flex;
  margin-top: 0.5em;
  @media (max-width: 520px) {
    flex-direction: column;
  }
`;
