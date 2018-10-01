import React, { Component } from "react";
import styled from "styled-components";

import DivisionTableRow from "components/DivisionTableRow";
import { fadeIn, pulse } from "common/animations";

export default class DivisionTable extends Component {
  render() {
    return (
      <Table>
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
        <tbody>
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
      </Table>
    );
  }
}

const Table = styled.table`
  font-size: 14px;
  width: 100%;
  max-width: 30em;
  border-collapse: collapse;
  border-spacing: 0;
  text-align: center;
  tr {
    td,
    th {
      padding: 1em;
      &:nth-child(1),
      &:nth-child(2) {
        text-align: left;
      }
    }
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  }
  tbody {
    &:empty {
      animation: ${fadeIn} 2s;
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
    tr {
      animation: ${fadeIn} 500ms;
      &:nth-child(4) {
        border-bottom: 4px solid white;
      }
      &.active {
        background-color: var(--primary-colour);
        font-weight: 900;
      }
    }
  }
`;
