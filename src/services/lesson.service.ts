import handleResponse from '@/services/utils/handleResponse';
import authHeader from './utils/authHeader';
import { LessonInterface } from '../store/modules/lesson';

export const lessonService = {
    getAllByClassAndSubject,
    deleteLesson,
    editLesson,
    createLesson
};

function getAllByClassAndSubject(class_id: number, subject_id: number) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(
        `${process.env.VUE_APP_SERVER_ADDRESS}lessons/filter?class=${class_id}&subject=${subject_id}`,
        requestOptions
    )
        .then(handleResponse)
        .then((lessons) => {
            return lessons;
        });
}

function deleteLesson(lesson_id: number) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(
        `${process.env.VUE_APP_SERVER_ADDRESS}lessons/${lesson_id}`,
        requestOptions
    ).then(handleResponse);
}

function editLesson(lesson: LessonInterface) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(lesson)
    };

    return fetch(
        `${process.env.VUE_APP_SERVER_ADDRESS}lessons/${lesson.id}`,
        requestOptions
    ).then(handleResponse);
}

function createLesson(lesson: LessonInterface) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(lesson)
    };

    return fetch(
        `${process.env.VUE_APP_SERVER_ADDRESS}lessons/`,
        requestOptions
    ).then(handleResponse);
}
