import { lessonService } from '@/services/lesson.service';
import { ActionContext, Commit, Dispatch } from 'vuex';

export interface LessonInterface {
    id: number;
    num: number;
    date: Date;
    title: string;
    themeId: number;
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
            (error) => {
                dispatch('alert/error', error, { root: true });
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
            (error) => {
                dispatch('alert/error', error, { root: true });
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
