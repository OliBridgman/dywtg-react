import React, { Component } from "react";
import styled from "styled-components";

import FixtureListItem from "components/FixtureListItem";
import { pulse } from "common/animations";
export default class FixturesList extends Component {
  render() {
    return (
      <FixturesListContainer>
        {this.props.fixtures.map((fixture, index) => (
          <FixtureListItem
            key={index}
            fixture={fixture.games[0]}
            showResults={this.props.showResults}
            currentTeamId={this.props.currentTeamId}
          />
        ))}
      </FixturesListContainer>
    );
  }
}

const FixturesListContainer = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  &:empty {
    animation: fade-in 2s;
    &::before {
      content: "LOADING";
      font-size: 0.9em;
    }
    &::after {
      content: "...";
      font-size: 2em;
      margin-left: 0.1em;
      animation: ${pulse} 2s infinite;
    }
  }
`;
