import api from './api';

const create = async (data) => {
    const response = await api.post('/tasks', data);
    return response.data; 
}

const list = async (params) => {
    const response = await api.get('/tasks', {params});
    return response.data; 
}

export default {
    create,
    list
}