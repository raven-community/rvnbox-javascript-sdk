import axios from "axios"
class Price {
  // TODO: v3: Default currency to usd, always call api.coinmarketcap.com
  async current(currency = "all") {
    try {
      if (currency === "all") {
        const response = await axios.get(
          `https://api.coinmarketcap.com/v2/ticker/2577/?convert=EUR`
        )
        return response.data
      }

      const response = await axios.get(
        `https://api.coinmarketcap.com/v2/ticker/2577/?convert=${currency}`
      )
      return response.data.quotes[currency];
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

export default Price
