import axios from 'axios'

import { ResponseInterceptor } from './interceptor';

export const Responses = Object.freeze({
    success: 'success',
    failure: 'failed'
});

export const contentType = 'application/json';

export const apiConfig = (publicApi) => {
    const token = JSON.parse(localStorage.getItem('token'))?.access;
    
    const apiClient = axios.create({
        baseURL: process.env.REACT_APP_URL,
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
          ...(publicApi ?  {} : { Authorization: token
            ? token
            : null}),
        },
    });

    const { onRejected, onResponse } = ResponseInterceptor();
    apiClient.interceptors.response.use(onResponse, onRejected);

    return apiClient;
};

export const dispatchApi = async ({endPoint, method, reqParam, config = {}, publicApi=false}) => {
    const response = await apiConfig(publicApi)[`${method}`](endPoint, reqParam, config);
    return response;
};