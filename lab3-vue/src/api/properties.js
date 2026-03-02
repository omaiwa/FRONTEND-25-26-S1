export default class PropertiesApi {
  constructor(axios) {
    this.axios = axios
  }

  getAll() {
    return this.axios.get("/properties")
  }

  getById(id) {
    return this.axios.get(`/properties/${id}`)
  }
}