import { Component } from 'react';

export default class Router extends Component {
  updateRoute(teamId) {
      this.props.document.location.hash = `#${teamId}`;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.teamId !== this.props.teamId) {
      this.updateRoute(this.props.teamId)
    }
  } 

  render () {
    return null
  }
}