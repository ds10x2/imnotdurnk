import axios from 'axios';
import { ToastError } from '../components/_common/alert';
import useAuthStore from '../stores/useAuthStore';
import useUserStore from '../stores/useUserStore';

// 게임 등 로그인이 필요없는 api 요청시 사용(토큰없이도 요청 가능한 용)
const apiNoToken = axios.create({
    //baseURL: 'http://i11a609.p.ssafy.io:8080', //로컬용1
    baseURL: 'https://i11a609.p.ssafy.io/api', // 원격용1
    timeout: 5000, // 5초 내 서버 응답 없으면 요청 취소
});
const api = axios.create({
    //baseURL: 'http://i11a609.p.ssafy.io:8080', //로컬용2
    baseURL: 'https://i11a609.p.ssafy.io/api', // 원격용2
    timeout: 5000, // 5초 내 서버 응답 없으면 요청 취소
    withCredentials: true, // 이게 있어야 refresh Token받을 수 있음
    //zustand로 저장된 accessToken 불러와서 매 요청의 헤더에 넣기
});

//변수 저장 시도
//api 요청 전의 처리
api.interceptors.request.use(
    (config) => {
        // Zustand 이용해 useAuthStore에서 토큰을 가져와서 헤더에 추가
        const { accessToken } = useAuthStore.getState();
        if (accessToken) {
            config.headers['Authorization'] = accessToken;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

let isTokenRefreshing = false; //토큰 요청 상태 저장

//api 요청 후의 처리
api.interceptors.response.use(
    (response) => {
        const accessToken = response.headers['authorization'];
        if (accessToken) {
            useAuthStore.getState().setAccessToken(accessToken);
            useAuthStore.getState().setIsAuthenticated(true);
        }
        return response;
    },
    async (error) => {
        const { config, response } = error;
        const { clearUser } = useUserStore.getState();
        const { clearAccessToken, setIsAuthenticated } = useAuthStore.getState();

        if (response?.data?.statusCode === 401) {
            if (!isTokenRefreshing) {
                isTokenRefreshing = true;
                try {
                    const refreshResponse = await api.get('/auth/refresh', {
                        params: { type: 'access' },
                    });
                    const newAccessToken = refreshResponse.headers['authorization'];
                    if (newAccessToken) {
                        useAuthStore.getState().setAccessToken(newAccessToken);
                        useAuthStore.getState().setIsAuthenticated(true);
                        config.headers['Authorization'] = newAccessToken;
                        isTokenRefreshing = false;
                        return api(config);
                    } else {
                        throw new Error('No new access token received');
                    }
                } catch (refreshError) {
                    console.error('Token refresh failed:', refreshError);
                    clearUser();
                    clearAccessToken();
                    setIsAuthenticated(false);
                    ToastError('로그인이 필요합니다', true);
                    window.location.href = '/account';
                    return Promise.reject(refreshError);
                } finally {
                    isTokenRefreshing = false;
                }
            }
        }
        return Promise.reject(error);
    }
);

export { api, apiNoToken };

