import axios from 'axios';
import { BASE_URL } from '../../config';
import { store } from '../Redux/Store';
import { refreshTokens } from '../Redux/Store/authStore';

const instance = axios.create({
    baseURL: BASE_URL,
});

instance.interceptors.request.use(
    (config) => {

        const { auth } = store.getState();
        const { accessToken } = auth;

        if (accessToken) {
            config.headers["x-access-token"] = accessToken;
        }

        return config;

    }, (err) => {
        return Promise.reject(err);
    }
);

instance.interceptors.response.use(
    async (res) => {

        const originalConfig = res.config;

        if (res.status === 401) {

            // reset token and fire off request with new config

            try {

                await store.dispatch(refreshTokens()).then(data => {
                    originalConfig.headers['x-access-token'] = data.payload.accessToken;
                })

                // use the new instance to resend the original request
                return axios.request(originalConfig);

            } catch (e) {
                Promise.reject(e);
            }

        }

        return res;
    }, async (err) => {

        const originalConfig = err.response.config;

        if (err.response.status === 401) {

            await store.dispatch(refreshTokens()).then(data => {
                originalConfig.headers['x-access-token'] = data.payload.accessToken;
            })

            return axios.request(originalConfig)

        }

        return err;
    }

)

export default instance;