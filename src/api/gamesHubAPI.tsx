import axios from "axios";
import {urlsAPI} from '../../app.config';


export const gamesHubAPI = axios.create({
  baseURL: 'http://localhost:8000/api',
})
export const userAccountAPI = axios.create({
  baseURL: 'http://localhost:8000/api/my-account'
});
export const authBackendAPI = axios.create({
  baseURL: 'http://localhost:8000/api/auth'
})


