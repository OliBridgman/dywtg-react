import { Component } from 'react';
import API from "../services/Api";

export default class FetchDivision extends Component {
    state = {
        division: {
            name: "Division",
            teams: []
          }
    }
  
    componentDidUpdate(prevProps) {
      if (this._shouldRefetch(prevProps, this.props)) {
        this.setState({ division: {
            name: "Division",
            teams: []
          } },
          () => this._fetchDivisions(this.props.teamId)
        )
      }
    } 
  
    render () {
      return this.props.children({division: this.state.division})
    }
  
    _fetchDivisions (teamId) {
      API.getStandingsByDivision(teamId).then(response => {
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
      })
    }

    _shouldRefetch(prevProps, props) {
        return props.teamId !== prevProps.teamId
    }
}