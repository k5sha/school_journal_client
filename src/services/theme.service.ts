import handleResponse from '@/services/utils/handleResponse';
import authHeader from './utils/authHeader';
import { ThemeInterface } from '../store/modules/theme';

export const themeService = {
    getAllByClassAndSubject,
    createTheme,
    deleteTheme
};

function getAllByClassAndSubject(class_id: number, subject_id: number) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(
        `${process.env.VUE_APP_SERVER_ADDRESS}themes/filter?class=${class_id}&subject=${subject_id}`,
        requestOptions
    )
        .then(handleResponse)
        .then((lessons) => {
            return lessons;
        });
}

function createTheme(theme: ThemeInterface) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(theme)
    };

    return fetch(
        `${process.env.VUE_APP_SERVER_ADDRESS}themes/`,
        requestOptions
    ).then(handleResponse);
}

function deleteTheme(theme_id: number) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(
        `${process.env.VUE_APP_SERVER_ADDRESS}themes/${theme_id}`,
        requestOptions
    ).then(handleResponse);
}
