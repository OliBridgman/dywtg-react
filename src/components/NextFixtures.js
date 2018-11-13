import { Component } from 'react';

import { getDateForUrl } from "../common/helpers";
import API from "../services/Api";

export default class NextFixtures extends Component {
    state = {
      nextFixtures: []
    }
  
    componentDidUpdate(prevProps) {
      if (this.props.teamId !== prevProps.teamId) {
        const { teamId } = this.props
        const params = {
          teamId, 
          startDate: getDateForUrl(),
          endDate: getDateForUrl(1)
        }
        this.setState({ nextFixtures: [] },
          () => this._fetchNextFixtures(params)
        )
      }
    } 
  
    render () {
      return this.props.children({fixtures: this.state.nextFixtures})
    }
  
    _fetchNextFixtures (params) {
      API.getSchedule(params).then(response => {
        this.setState({
          nextFixtures: response.data.dates.slice(0, 5)
        });
      });
    }
}