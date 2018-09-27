import React, { Component } from "react";

import Select from "components/Select";

export default class Header extends Component {
  onSelectTeamChanged = e => {
    this.props.onSelectTeamChanged(Number(e.target.value));
  };

  render() {
    return (
      <header className="header">
        <span className="logo">
          <img src="img/logo-sm.png" alt="" />
        </span>
        <Select
          onChange={this.onSelectTeamChanged}
          value={this.props.selectedTeamId || undefined}
        >
          <option value="">Select a Team...</option>
          {this.props.teams.map(team => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </Select>
        <span className="header-subtitle">Snapshot</span>
      </header>
    );
  }
}
