import axios from './axios';

const listAvarage = (weeks) => axios.get(`/covid19/listAvarage/${weeks}`);
const saveUpdateData = () => axios.get('/covid19/saveUpdateData');
export default {
    listAvarage,
    saveUpdateData
};