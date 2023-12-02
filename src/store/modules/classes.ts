import { classesService } from '@/services/classes.service';
import { ActionContext, Commit, Dispatch } from 'vuex';
import handleErrors from '../utils/handleErrors';

interface Class_ {
    id: number;
    title: string;
}
export interface ClassState {
    classes: Class_[];
    selectedClass: number;
}
const state = {
    classes: [],
    selectedClass: 0
};

const actions = {
    async fetchClasses({ dispatch, commit }: ActionContext<Dispatch, Commit>) {
        classesService.getAll().then(
            (classes) => {
                commit('setClasses', classes);
            },
            (error: Error) => {
                handleErrors(error, dispatch);
            }
        );
    },
    async selectClass(
        { dispatch, commit }: ActionContext<Dispatch, Commit>,
        class_: Class_
    ) {
        dispatch('subject/selectSubject', { id: 0 }, { root: true });
        commit('selectClass', class_);
    },
    async createClass(
        { dispatch }: { dispatch: Dispatch },
        class_: { title: string }
    ) {
        classesService.create(class_).then(
            () => {
                dispatch(
                    'alert/success',
                    `${class_.title} успішно додана до списку класів`,
                    {
                        root: true
                    }
                );
            },
            (error: Error) => {
                handleErrors(error, dispatch);
            }
        );
    }
};

const mutations = {
    setClasses(state: ClassState, classes: Class_[]) {
        state.classes = classes;
    },
    selectClass(state: ClassState, class_: Class_) {
        if (state.selectedClass == class_.id) return (state.selectedClass = 0);
        return (state.selectedClass = class_.id);
    }
};

const getters = {
    getAllClasses(state: ClassState): Class_[] {
        return state.classes;
    },
    getSelectedClass(state: ClassState) {
        return state.selectedClass;
    }
};

export const classes = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
