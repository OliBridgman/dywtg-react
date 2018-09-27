import axios from "axios";

export default class Api {
  apiConfig = {
    url: "https://statsapi.web.nhl.com",
    version: "/api/v1"
  };
  /**
   * Get schedule for a team on specified dates
   * (more info: https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#schedule)
   *
   * @param {Object} params - Request parameters object
   * @param {Number} params.teamId - Team ID
   * @param {String} params.startDate - Start date for fixtures
   * @param {String} params.endDate - Start date for fixtures
   *
   * @returns {Promise} - The request promise
   */
  getSchedule(params) {
    return axios.get(
      `${this.apiConfig.url}${this.apiConfig.version}/schedule`,
      { params }
    );
  }

  /**
   * Get highlights for a specific fixture
   *
   * @param {String} path - Request path string
   *
   * @returns {Promise} - The request promise
   */
  getHighlights(path) {
    return axios.get(`${this.apiConfig.url}${path}`);
  }

  /**
   * Get current standings by division
   * (more info: https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#standings)
   *
   * @returns {Promise} - The request promise
   *
   */
  getStandingsByDivision() {
    return axios.get(
      `${this.apiConfig.url}${this.apiConfig.version}/standings/byDivision`
    );
  }
}
