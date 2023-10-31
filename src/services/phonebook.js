import axios from 'axios';
const urlBase = "http://localhost:3001/api/persons";
const getAll =() => axios.get(urlBase);
const getOne  = (id) => axios.get(`${urlBase}/${id}`)
const create = (listafoneObject) => axios.post(urlBase, listafoneObject);
const remove = (id) => axios.delete(`${urlBase}/${id}`);
const update = (id, listafoneObject) => axios.put(`${urlBase}/${id}`, listafoneObject)
const listafoneService = {getAll, getOne, create, remove, update};

export default listafoneService;