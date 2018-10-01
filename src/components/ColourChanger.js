import { Component } from "react";

export default class ColourChanger extends Component {
  cssVars = {
    primary: "--primary-colour",
    secondary: "--secondary-colour",
    tertiary: "--tertiary-colour"
  };

  // Sets a specific app CSS variable with a provided colour
  setAppColour(variableName, colour) {
    let htmlStyle = document.documentElement.style;
    htmlStyle.setProperty(variableName, `#${colour}`);
  }

  // Resets a specific app CSS variable to default colour
  resetAppColour(variableName) {
    let htmlStyle = document.documentElement.style;
    htmlStyle.removeProperty(variableName);
  }

  // Set app colours based on team colours from teams array
  setAppColours(teamId) {
    let team = this.props.teams[teamId];
    if (team) {
      let teamColours = team.colours.hex; // Team colours hex array

      // Loop through CSS variables and set team colours
      // Only sets if the index exists in team colours array
      // Resets colour to default if not
      Object.values(this.cssVars).forEach((variableName, index) => {
        if (teamColours[index]) {
          this.setAppColour(variableName, teamColours[index]);
        } else {
          this.resetAppColour(variableName);
        }
      });
    }
  }

  componentDidUpdate() {
    this.setAppColours(this.props.selectedTeamId);
  }

  render() {
    return "";
  }
}
