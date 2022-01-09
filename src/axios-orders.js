import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-75fd2-default-rtdb.asia-southeast1.firebasedatabase.app/'
});

export default instance;