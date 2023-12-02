import authHeader from '@/services/utils/authHeader';
import handleResponse from '@/services/utils/handleResponse';

export const classesService = {
    getAll,
    create
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(
        `${process.env.VUE_APP_SERVER_ADDRESS}classes`,
        requestOptions
    ).then(handleResponse);
}

function create(class_: { title: string }) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(class_)
    };

    return fetch(
        `${process.env.VUE_APP_SERVER_ADDRESS}classes`,
        requestOptions
    ).then(handleResponse);
}
