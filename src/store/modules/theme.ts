import { themeService } from '@/services/theme.service';
import { ActionContext, Commit, Dispatch } from 'vuex';
import { LessonInterface } from './lesson';

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
            (error) => {
                dispatch('alert/error', error, { root: true });
            }
        );
    },
    async deleteLessonFromTheme(
        { dispatch, commit }: ActionContext<Dispatch, Commit>,
        { theme_id, lesson_id }: { theme_id: number; lesson_id: number }
    ) {
        commit('deleteLessonFromTheme', {
            theme_id: theme_id,
            lesson_id: lesson_id
        });
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
