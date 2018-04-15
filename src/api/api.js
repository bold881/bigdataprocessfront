import axios from 'axios';

let base = 'http://101.200.47.113:8081';

export const requestLogin = params => { 
    return axios.post(`${base}/userbyemail`, params)
        .then(res => res.data); 
    };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

export const getDashboardData = params => {
    return axios.get(`${base}/rundatabydate`, {params: params});
};

export const getDataPeriod = params => {
    return axios.post(`${base}/rundatabyperiod`, params);
};

export const getUserInfoById = params => {
    return axios.get(`${base}/userInfoById`, {params});
};

export const updateUserInfo = params => {
    return axios.post(`${base}/updateUserInfo`, params);
}
