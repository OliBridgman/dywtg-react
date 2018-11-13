import { Component } from 'react';

import { getDateForUrl } from "../common/helpers";
import API from "../services/Api";

export default class LatestFixtures extends Component {
    state = {
      latestFixtures: []
    }
  
    componentDidUpdate(prevProps) {
      if (this.props.teamId !== prevProps.teamId) {
        const { teamId } = this.props
        const params = {
          teamId, 
          startDate: getDateForUrl(-1),
          endDate: getDateForUrl()
        }
        this.setState({ latestFixtures: [] },
          () => this._fetchLatestFixtures(params)
        )
      }
    } 
  
    render () {
      return this.props.children({fixtures: this.state.latestFixtures})
    }
  
    _fetchLatestFixtures (params) {
      API.getSchedule(params).then(response => {
        this.setState({
          latestFixtures: response.data.dates.slice(-5).reverse()
        });
      });
    }
}