// apiService.js
import axios from 'axios';

const apiService = {
  getAboutUsData: async () => {
    return await axios.get('https://api.usrike-learning.com/public/api/frontend/about-us');
  },
  getContactData: async () => {
    return await axios.get('https://api.usrike-learning.com/public/api/frontend/contact-us');
  },
};

export default apiService;