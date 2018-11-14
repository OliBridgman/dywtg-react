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
  
    async _fetchDivisions (teamId) {
      const { data: { records } } = await API.getStandingsByDivision(teamId)
      const [standing] = records.filter(r => r.teamRecords.filter(tr => tr.team.id === teamId).length)
      this.setState({
        division: {
          name: `${standing.division.name} Division`,
          teams: standing.teamRecords
        }
      });
    }

    _shouldRefetch(prevProps, props) {
        return props.teamId !== prevProps.teamId
    }
}