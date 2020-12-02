import Axios from 'axios'

Axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
Axios.defaults.timeout = process.env.VUE_APP_TIMEOUT
// Axios.defaults.headers.common[propriedade] = valor

export default Axios