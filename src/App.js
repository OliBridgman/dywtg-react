import React, { Component } from "react";

import teams from "teamsList";
import Api from "services/Api";
import { getDateForUrl } from "common/helpers";

import FixturesList from "components/FixturesList";
import Footer from "components/Footer";
import Header from "components/Header";
import DivisionTable from "components/DivisionTable";
import ColourChanger from "components/ColourChanger";

export default class App extends Component {
  api = new Api();
  teams = teams;
  state = {
    selectedTeamId: null,
    nextFixtures: [],
    latestFixtures: [],
    division: {
      name: "Division",
      teams: []
    }
  };

  // Main team change event
  // Is triggered on load and when a new team is selected
  onSelectTeamChanged = teamId => {
    const fixturesLimit = 5;
    this.setUrlHash(teamId);
    this.setState({
      selectedTeamId: teamId
    });

    // Get the information for the selected team
    this.getNextFixtures(
      {
        teamId: teamId,
        startDate: getDateForUrl(),
        endDate: getDateForUrl(1)
      },
      fixturesLimit
    );
    this.getLatestFixtures(
      {
        teamId: teamId,
        startDate: getDateForUrl(-1),
        endDate: getDateForUrl()
      },
      fixturesLimit
    );
    this.getDivisionTeams(teamId);
  };

  // Get the selected teams next fixtures
  getNextFixtures(params, limit) {
    this.api.getSchedule(params).then(response => {
      this.setState({
        nextFixtures: response.data.dates.slice(0, limit)
      });
    });
  }

  // Get the selected teams recently played fixtures
  getLatestFixtures(params, limit) {
    this.api.getSchedule(params).then(response => {
      const latestFixtures = response.data.dates.slice(-limit).reverse();
      latestFixtures.forEach((fixture, index) => {
        this.api.getHighlights(fixture.games[0].content.link).then(response => {
          let highlightsLink;
          try {
            highlightsLink =
              response.data.media.epg[2].items[0].playbacks[9].url;
          } catch (error) {
            console.log("No highlight link found");
          } finally {
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
      <div className="wrapper">
        <ColourChanger
          teams={this.teams}
          selectedTeamId={this.state.selectedTeamId}
        />
        <Header
          teams={this.teams}
          onSelectTeamChanged={this.onSelectTeamChanged}
          selectedTeamId={this.state.selectedTeamId}
        />
        <div className="container">
          <section className="panel panel-next-fixtures">
            <h2>
              <i className="far fa-calendar-alt" /> Next Fixtures
            </h2>
            <FixturesList fixtures={this.state.nextFixtures} />
          </section>

          <section className="panel panel-latest-results">
            <h2>
              <i className="fas fa-history" /> Latest Results
            </h2>
            <FixturesList
              fixtures={this.state.latestFixtures}
              showResults={true}
              currentTeamId={this.state.selectedTeamId}
            />
          </section>

          <section className="panel panel-division-table">
            <h2>
              <i className="fas fa-trophy" /> {this.state.division.name}
            </h2>
            <DivisionTable
              teams={this.state.division.teams}
              selectedTeamId={this.state.selectedTeamId}
            />
          </section>
        </div>
        <Footer />
      </div>
    );
  }
}
