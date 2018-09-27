import React, { Component } from "react";

import DivisionTableRow from "components/DivisionTableRow";

export default class DivisionTable extends Component {
  render() {
    return (
      <table className="division-table">
        <thead>
          <tr>
            <th>Pos</th>
            <th>Team</th>
            <th>Pts</th>
            <th>W</th>
            <th>L</th>
            <th>OL</th>
          </tr>
        </thead>
        <tbody id="division-table-content" className="empty-loading">
          {this.props.teams.map((entry, index) => {
            return (
              <DivisionTableRow
                key={index}
                divisionPlace={index}
                divisionEntry={entry}
                isCurrent={entry.team.id === this.props.selectedTeamId}
              />
            );
          })}
        </tbody>
      </table>
    );
  }
}
