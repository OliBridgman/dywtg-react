import React, { Component } from "react";

import FixtureListItem from "components/FixtureListItem";

export default class FixturesList extends Component {
  render() {
    return (
      <ul className="empty-loading list-unstyled">
        {this.props.fixtures.map((fixture, index) => (
          <FixtureListItem
            key={index}
            fixture={fixture.games[0]}
            showResults={this.props.showResults}
            currentTeamId={this.props.currentTeamId}
          />
        ))}
      </ul>
    );
  }
}
