import React, { Component } from "react";
import styled from "styled-components";

import teams from "teamsList";
import { fadeIn } from "common/animations";
import { createGet } from './helpers';
import FixturesList from "components/FixturesList";
import AppFooter from "components/AppFooter";
import AppHeader from "components/AppHeader";
import DivisionTable from "components/DivisionTable";
import ColourChanger from "components/ColourChanger";
import NextFixtures from 'components/NextFixtures';
import LatestFixtures from 'components/LatestFixtures';

const getHighlightsLink = createGet(['data', 'media', 'epg', 2, 'items', 0, 'playbacks', 9, 'url'])

export default class App extends Component {
  teams = teams;
  state = {
    selectedTeamId: null,
    division: {
      name: "Division",
      teams: []
    }
  };

  // Main team change event
  // Is triggered on load and when a new team is selected
  onSelectTeamChanged = teamId => {
    this.setUrlHash(teamId);
    this.setState({
      selectedTeamId: teamId
    });

    // this.getDivisionTeams(teamId);
  };

  // Get the selected teams recently played fixtures
  getLatestFixtures(params, limit) {
    this.api.getSchedule(params).then(response => {
      const latestFixtures = response.data.dates.slice(-limit).reverse();
      latestFixtures.forEach((fixture, index) => {
        this.api.getHighlights(fixture.games[0].content.link).then(response => {
            const highlightsLink = getHighlightsLink(response)
            if (highlightsLink) {
              const updatedFeatures = this.state.latestFixtures.map(
                (fixture, i) => {
                  if (i === index) {
                    fixture.games[0].highlightsLink = highlightsLink;
                  }
                  return fixture;
                }
              );
              this.setState({ latestFixtures: updatedFeatures });
            }
        });
      });
      this.setState({ latestFixtures });
    });
  }

  // Get the division of the selected team
  getDivisionTeams(teamId) {
    this.api.getStandingsByDivision(teamId).then(response => {
      response.data.records.forEach(standing => {
        standing.teamRecords.forEach(teamRecord => {
          if (teamId === teamRecord.team.id) {
            this.setState({
              division: {
                name: `${standing.division.name} Division`,
                teams: standing.teamRecords
              }
            });
            return;
          }
        });
      });
    });
  }

  // Set URL hash
  setUrlHash(teamId) {
    document.location.hash = `#${teamId}`;
  }

  // Set team from url hash (default to Canucks if none present)
  getTeamFromUrlHash() {
    return Number(document.location.hash.substr(1));
  }

  componentDidMount() {
    this.onSelectTeamChanged(this.getTeamFromUrlHash() || 23);
  }

  render() {
    return (
      <AppContainer>
        <ColourChanger
          teams={this.teams}
          selectedTeamId={this.state.selectedTeamId}
        />
        <AppHeader
          teams={this.teams}
          onSelectTeamChanged={this.onSelectTeamChanged}
          selectedTeamId={this.state.selectedTeamId}
        />
        <PanelContainer>
          <Panel>
            <PanelHeading>
              <i className="far fa-calendar-alt" /> Next Fixtures
            </PanelHeading>
            <NextFixtures teamId={this.state.selectedTeamId}>
              {({fixtures}) => (
                fixtures ? <FixturesList fixtures={fixtures} /> : null
              )}
            </NextFixtures>
          </Panel>

          <Panel>
            <PanelHeading>
              <i className="fas fa-history" /> Latest Results
            </PanelHeading>
            <LatestFixtures teamId={this.state.selectedTeamId}>
              {({fixtures}) => (
                fixtures ? <FixturesList fixtures={fixtures} showResults={true} currentTeamId={this.state.selectedTeamId} /> : null
              )}
            </LatestFixtures>
          </Panel>

          <Panel>
            <PanelHeading>
              <i className="fas fa-trophy" /> {this.state.division.name}
            </PanelHeading>
            <DivisionTable
              teams={this.state.division.teams}
              selectedTeamId={this.state.selectedTeamId}
            />
          </Panel>
        </PanelContainer>
        <AppFooter />
      </AppContainer>
    );
  }
}

const AppContainer = styled.div`
  font-family: Roboto, sans-serif;
  color: white;

  @media (min-width: 631px) {
    min-height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 50px auto 50px;
    grid-template-areas:
      "header header header"
      "main main main"
      "footer footer footer";
  }
`;

const PanelContainer = styled.div`
  grid-area: main;
  @media (min-width: 1081px) {
    display: flex;
  }
`;

const Panel = styled.section`
  padding: 20px 40px;
  flex-grow: 1;
  flex-basis: 33.33333%;

  :nth-child(1) {
    background-color: var(--primary-colour);
    h2,
    p {
      color: white;
      animation: ${fadeIn} 500ms;
    }
  }

  :nth-child(2) {
    background-color: white;
    color: var(--secondary-colour);
    h2 {
      border-bottom-color: var(--primary-colour);
    }
  }

  :nth-child(3) {
    background-color: var(--secondary-colour);
  }

  @media (max-width: 421px) {
    padding: 20px 20px;
  }

  @media (max-width: 1081px) {
    padding: 20px 80px;
  }
`;

const PanelHeading = styled.h2`
  letter-spacing: 1.5px;
  padding-bottom: 5px;
  border-bottom: 5px solid rgba(255, 255, 255, 0.5);
`;
