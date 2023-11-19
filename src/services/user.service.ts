import handleResponse from '@/services/utils/handleResponse';

export const userService = {
    login,
    logout
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

function logout() {
    localStorage.removeItem('user');
}
