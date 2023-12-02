import { themeService } from '@/services/theme.service';
import { ActionContext, Commit, Dispatch } from 'vuex';
import { LessonInterface } from './lesson';
import handleErrors from '../utils/handleErrors';

export interface ThemeInterface {
    id: number;
    title: string;
    lessons: LessonInterface[];
}
export interface ThemeState {
    themes: ThemeInterface[];
}
const state = {
    themes: []
};

const actions = {
    async fetchAllThemes(
        { dispatch, commit }: ActionContext<Dispatch, Commit>,
        { class_id, subject_id }: { class_id: number; subject_id: number }
    ) {
        themeService.getAllByClassAndSubject(class_id, subject_id).then(
            (themes) => {
                commit('setThemes', themes);
            },
            (error: Error) => {
                handleErrors(error, dispatch);
            }
        );
    },
    async deleteLessonFromTheme(
        { commit }: { commit: Commit },
        { theme_id, lesson_id }: { theme_id: number; lesson_id: number }
    ) {
        commit('deleteLessonFromTheme', {
            theme_id: theme_id,
            lesson_id: lesson_id
        });
    },
    async editLessonFromTheme(
        { commit }: { commit: Commit },
        lesson: LessonInterface
    ) {
        commit('editLessonFromTheme', lesson);
    },
    async addLessonFromTheme(
        { commit }: { commit: Commit },
        lesson: LessonInterface
    ) {
        commit('addLessonFromTheme', lesson);
    },
    async addTheme(
        { dispatch, commit }: ActionContext<Dispatch, Commit>,
        theme: ThemeInterface
    ) {
        themeService.createTheme(theme).then(
            (createdTheme) => {
                commit('addTheme', createdTheme);
                dispatch('alert/success', 'Тему успішно створенно', {
                    root: true
                });
            },
            (error: Error) => {
                handleErrors(error, dispatch);
            }
        );
    },
    async removeTheme(
        { dispatch, commit }: ActionContext<Dispatch, Commit>,
        id: number
    ) {
        themeService.deleteTheme(id).then(
            () => {
                commit('removeTheme', id);
                dispatch('alert/success', 'Тему успішно видаленно', {
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
    setThemes(state: ThemeState, themes: ThemeInterface[]) {
        state.themes = themes;
    },
    deleteLessonFromTheme(
        state: ThemeState,
        { theme_id, lesson_id }: { theme_id: number; lesson_id: number }
    ) {
        const themeIndex = state.themes.findIndex(
            (theme) => theme.id === theme_id
        );
        state.themes[themeIndex].lessons = state.themes[
            themeIndex
        ].lessons.filter(function (e: LessonInterface) {
            return e.id !== lesson_id;
        });
        // eslint-disable-next-line no-self-assign
        state.themes = state.themes;
    },
    editLessonFromTheme(state: ThemeState, editedLesson: LessonInterface) {
        const themeIndex = state.themes.findIndex(
            (theme) => theme.id === editedLesson.themeId
        );

        const lessons = state.themes[themeIndex].lessons;
        lessons[lessons.findIndex((lesson) => lesson.id == editedLesson.id)] =
            editedLesson;
        // eslint-disable-next-line no-self-assign
        state.themes = state.themes;
    },
    addLessonFromTheme(state: ThemeState, createdLesson: LessonInterface) {
        const themeIndex = state.themes.findIndex(
            (theme) => theme.id === createdLesson.themeId
        );
        state.themes[themeIndex].lessons.push(createdLesson);
        // eslint-disable-next-line no-self-assign
        state.themes = state.themes;
    },
    addTheme(state: ThemeState, theme: ThemeInterface) {
        state.themes.push(theme);
    },
    removeTheme(state: ThemeState, theme_id: number) {
        state.themes = state.themes.filter(function (e) {
            return e.id !== theme_id;
        });
    }
};

const getters = {
    getAllThemes(state: ThemeState): ThemeInterface[] {
        return state.themes;
    }
};

export const theme = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
