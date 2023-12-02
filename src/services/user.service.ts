import handleResponse from '@/services/utils/handleResponse';
import authHeader from './utils/authHeader';
import { UserRegisterInterface } from '@/store/modules/users';

export const userService = {
    login,
    logout,
    registration
};

function login(username: string, password: string) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(
        `${process.env.VUE_APP_SERVER_ADDRESS}auth/login`,
        requestOptions
    )
        .then(handleResponse)
        .then((user) => {
            if (user.token) {
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function registration(user: UserRegisterInterface) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(
        `${process.env.VUE_APP_SERVER_ADDRESS}auth/registration`,
        requestOptions
    ).then(handleResponse);
}

function logout() {
    localStorage.removeItem('user');
}
