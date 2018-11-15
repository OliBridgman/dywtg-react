import { Component } from 'react';
import API from "../services/Api";

export default class FetchFixtures extends Component {
    state = {
      fixtures: []
    }
  
    componentDidUpdate(prevProps) {
      if (this._shouldRefetch(prevProps, this.props)) {
        this.setState({ fixtures: [] },
          () => this._fetchFixtures(this.props)
        )
      }
    } 
  
    render () {
      if (this.props.render) {
        return this.props.render({fixtures: this.state.fixtures})
      }
      return this.props.children({fixtures: this.state.fixtures})
    }
  
    _fetchFixtures (params) {
      API.getSchedule(params).then(response => {
        this.setState({
          fixtures: response.data.dates
        });
      });
    }

    _shouldRefetch(prevProps, props) {
        return props.teamId !== prevProps.teamId ||
            prevProps.startDate !== props.startDate ||
            prevProps.endDate !== props.endDate
    }
}