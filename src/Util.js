import axios from "axios"
class Util {
  constructor(restURL) {
    this.restURL = restURL
  }

  async validateAddress(address) {
    try {
      const response = await axios.get(
        `${this.restURL}util/validateAddress/${address}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

export default Util
