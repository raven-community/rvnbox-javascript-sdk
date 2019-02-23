import axios from "axios"
class Asset {
    constructor(restURL) {
        this.restURL = restURL
    }

    async details(asset) {
        try {
            const response = await axios.get(
                `${this.restURL}asset/details/${asset}`
            )
            return response.data
        } catch (error) {
            if (error.response && error.response.status) throw error.response.status+" "+error.response.statusText
            else throw error
        }
    }

    async list() {
        try {
            const response = await axios.get(
                `${this.restURL}asset/list`
            )
            return response.data
        } catch (error) {
            if (error.response && error.response.status) throw error.response.status+" "+error.response.statusText
            else throw error
        }
    }

    async addresses(asset) {
        try {
            const response = await axios.get(
                `${this.restURL}asset/addresses/${asset}`
            )
            return response.data
        } catch (error) {
            if (error.response && error.response.status) throw error.response.status+" "+error.response.statusText
            else throw error
        }
    }

    async balances(address) {
        try {
            const response = await axios.get(
                `${this.restURL}asset/details/${address}`
            )
            return response.data
        } catch (error) {
            if (error.response && error.response.status) throw error.response.status+" "+error.response.statusText
            else throw error
        }
    }
}

export default Asset
