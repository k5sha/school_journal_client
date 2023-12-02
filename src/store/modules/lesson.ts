import { lessonService } from '@/services/lesson.service';
import { ActionContext, Commit, Dispatch } from 'vuex';
import handleErrors from '../utils/handleErrors';

export interface LessonInterface {
    id: number;
    num: number;
    date: Date;
    title: string;
    themeId: number;
    updatedAt: Date;
    createdAt: Date;
}
export interface LessonState {
    lessons: LessonInterface[];
}
const state = {
    lessons: []
};

const actions = {
    async fetchLessons(
        { dispatch, commit }: ActionContext<Dispatch, Commit>,
        { class_id, subject_id }: { class_id: number; subject_id: number }
    ) {
        lessonService.getAllByClassAndSubject(class_id, subject_id).then(
            (lessons) => {
                commit('setLessons', lessons);
            },
            (error: Error) => {
                handleErrors(error, dispatch);
            }
        );
    },
    async deleteLesson(
        { dispatch, commit }: ActionContext<Dispatch, Commit>,
        { theme_id, lesson_id }: { theme_id: number; lesson_id: number }
    ) {
        lessonService.deleteLesson(lesson_id).then(
            () => {
                commit('deleteLesson', lesson_id);
                dispatch(
                    'theme/deleteLessonFromTheme',
                    { theme_id: theme_id, lesson_id: lesson_id },
                    {
                        root: true
                    }
                );
                dispatch('alert/success', 'Заняття успішно видаленно', {
                    root: true
                });
            },
            (error: Error) => {
                handleErrors(error, dispatch);
            }
        );
    },
    async editLesson(
        { dispatch, commit }: ActionContext<Dispatch, Commit>,
        lesson: LessonInterface
    ) {
        lessonService.editLesson(lesson).then(
            () => {
                commit('editLesson', lesson);
                dispatch('theme/editLessonFromTheme', lesson, {
                    root: true
                });
                dispatch('alert/success', 'Заняття успішно зміненно', {
                    root: true
                });
            },
            (error: Error) => {
                handleErrors(error, dispatch);
            }
        );
    },
    async addLesson(
        { dispatch, commit }: ActionContext<Dispatch, Commit>,
        lesson: LessonInterface
    ) {
        lessonService.createLesson(lesson).then(
            (createdLesson) => {
                commit('addLesson', createdLesson);
                dispatch('theme/addLessonFromTheme', createdLesson, {
                    root: true
                });
                dispatch('alert/success', 'Заняття успішно створенно', {
                    root: true
                });
            },
            (error: Error) => {
                handleErrors(error, dispatch);
            }
        );
    }
};

const mutations = {
    setLessons(state: LessonState, lessons: LessonInterface[]) {
        state.lessons = lessons;
    },
    deleteLesson(state: LessonState, lesson_id: number) {
        state.lessons = state.lessons.filter(function (e) {
            return e.id !== lesson_id;
        });
    },
    editLesson(state: LessonState, editedLesson: LessonInterface) {
        state.lessons[
            state.lessons.findIndex((lesson) => lesson.id == editedLesson.id)
        ] = editedLesson;
        // eslint-disable-next-line no-self-assign
        state.lessons = state.lessons;
    },
    addLesson(state: LessonState, createdLesson: LessonInterface) {
        state.lessons.push(createdLesson);
    }
};

const getters = {
    getAllLessons(state: LessonState): LessonInterface[] {
        return state.lessons;
    }
};

export const lesson = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
