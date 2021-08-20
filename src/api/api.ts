import axios from 'axios';

const MAIN_URL = process.env.REACT_APP_MAIN_URL;

const serverAPI = {
  getTasks() {
    return axios.get(MAIN_URL || '');
  },
};

export default serverAPI;
