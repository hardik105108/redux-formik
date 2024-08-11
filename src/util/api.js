import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
    baseURL: 'http://localhost:4001',
    headers: { 'Content-Type': 'application/json' },
});
// api.interceptors.request.use((req)=>{
//     if(localStorage.getItem('token')){
//         req.headers.Authorization =`Bearer ${JSON.parse(localStorage.getItem('token'))}`;
//     }
// })
const request = async (method, resource, data = {}) => {
    try {
        const response = await api[method](`/${resource}`, data);
        return response.data;
    } catch (error) {
        toast.error("An error occurred. Please try again.");
        console.error(error);
        throw error;
    }
};

export const apiService = {
    getAll: (resource) => request('get', resource),
    getOne: (resource, id) => request('get', `${resource}/${id}`),
    create: (resource, data) => request('post', resource, data),
    update: (resource, id, data) => request('put', `${resource}/${id}`, data),
    remove: (resource, id) => request('delete', `${resource}/${id}`),
};
