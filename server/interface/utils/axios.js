import axios from 'axios'
const instance = axios.create({
  baseURL:`http://cp-tools.cn`,
  timeout:3000,
  headers:{
  }
});
export default instance