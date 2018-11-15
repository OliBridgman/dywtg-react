import React, { Component, Fragment } from "react";
import styled from "styled-components";

import teams from "teamsList";
import { fadeIn } from "common/animations";
import FixturesList from "components/FixturesList";
import AppFooter from "components/AppFooter";
import AppHeader from "components/AppHeader";
import DivisionTable from "components/DivisionTable";
import ColourChanger from "components/ColourChanger";
import FetchFixtures from 'components/FetchFixtures';
import FetchDivision from 'components/FetchDivision';
import Router from 'components/Router';

import { getDateForUrl } from "common/helpers";

export default class App extends Component {
  teams = teams;
  state = {
    selectedTeamId: null
  };

  // Main team change event
  // Is triggered on load and when a new team is selected
  onSelectTeamChanged = teamId => {
    this.setState({
      selectedTeamId: teamId
    });
  };

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
        <Router document={document} teamId={this.state.selectedTeamId} />
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
            <FetchFixtures
              teamId={this.state.selectedTeamId}
              startDate={getDateForUrl()}
              endDate={getDateForUrl(1)} render={
                ({fixtures}) => (
                  fixtures ? <FixturesList fixtures={fixtures.slice(0, 5)} /> : null
                )
              } />
          </Panel>

          <Panel>
            <PanelHeading>
              <i className="fas fa-history" /> Latest Results
            </PanelHeading>
            <FetchFixtures
              teamId={this.state.selectedTeamId}
              startDate={getDateForUrl(-1)}
              endDate={getDateForUrl()}>
              {({fixtures}) => (
                fixtures ?
                  <FixturesList
                    fixtures={fixtures.slice(-5).reverse()}
                    showResults={true}
                    currentTeamId={this.state.selectedTeamId} /> : null
              )}
            </FetchFixtures>
          </Panel>

          <Panel>
          <FetchDivision teamId={this.state.selectedTeamId}>
            {({division}) => (
              <Fragment>
                <PanelHeading>
                  <i className="fas fa-trophy" /> {division.name}
                </PanelHeading>
                <DivisionTable teams={division.teams} selectedTeamId={this.state.selectedTeamId} />
              </Fragment>
            )}
            </FetchDivision>
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
