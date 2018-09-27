import React, { Component } from "react";

export default class DivisionTableRow extends Component {
  render() {
    return (
      <tr className={this.props.isCurrent ? "active" : ""}>
        <td>#{this.props.divisionPlace + 1}</td>
        <td>{this.props.divisionEntry.team.name}</td>
        <td>{this.props.divisionEntry.points}</td>
        <td>{this.props.divisionEntry.leagueRecord.wins}</td>
        <td>{this.props.divisionEntry.leagueRecord.losses}</td>
        <td>{this.props.divisionEntry.leagueRecord.ot}</td>
      </tr>
    );
  }
}
