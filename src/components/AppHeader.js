import React, { Component } from "react";
import styled from "styled-components";

export default class AppHeader extends Component {
  onSelectTeamChanged = e => {
    this.props.onSelectTeamChanged(Number(e.target.value));
  };

  render() {
    return (
      <AppHeaderContainer>
        <LogoContainer>
          <LogoImg src="img/logo-sm.png" alt="" />
        </LogoContainer>
        <TeamSelect
          onChange={this.onSelectTeamChanged}
          value={this.props.selectedTeamId || undefined}
        >
          <option value="">Select a Team...</option>
          {this.props.teams.map(team => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </TeamSelect>
        <AppHeaderSubtitle>Snapshot</AppHeaderSubtitle>
      </AppHeaderContainer>
    );
  }
}

const AppHeaderContainer = styled.header`
  grid-area: header;
  background-color: #32292f;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoContainer = styled.span`
  position: absolute;
  left: 40px;

  @media (max-width: 521px) {
    display: none;
  }

  @media (max-width: 1081px) {
    left: 80px;
  }
`;

const LogoImg = styled.img`
  height: 34px;
  padding-top: 2px;
`;

const TeamSelect = styled.select`
  background-color: #32292f;
  color: white;
  font-size: 0.9rem;
`;

const AppHeaderSubtitle = styled.span`
  font-weight: 100;
  border-left: 2px solid #ccc;
  padding-left: 10px;
  margin-left: 10px;
`;
