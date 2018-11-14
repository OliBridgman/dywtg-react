import { Component } from 'react';
import API from "../services/Api";
import { createGet } from '../helpers';

const getHighlightsLink = createGet(['data', 'media', 'epg', 2, 'items', 0, 'playbacks', 9, 'url'])

export default class FetchHighlight extends Component {
    state = {
      link: null
    }

    componentDidMount() {
      this.props.link &&
        API.getHighlights(this.props.link).then(
            response => {
                const highlightsLink = getHighlightsLink(response)
                this.setState({ link: highlightsLink });
            }
      )
    }
  
    render () {
      return this.props.children({link: this.state.link})
    }
}