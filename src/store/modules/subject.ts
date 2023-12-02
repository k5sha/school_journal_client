import { subjectService } from '@/services/subject.service';
import { ActionContext, Commit, Dispatch } from 'vuex';
import handleErrors from '../utils/handleErrors';

interface Subject {
    id: number;
    title: string;
}
export interface SubjectState {
    subjects: Subject[];
    selectedSubject: number;
}
const state = {
    subjects: [],
    selectedSubject: 0
};

const actions = {
    async fetchSubjects({ dispatch, commit }: ActionContext<Dispatch, Commit>) {
        subjectService.getAll().then(
            (subjects) => {
                commit('setSubjects', subjects);
            },
            (error: Error) => {
                handleErrors(error, dispatch);
            }
        );
    },
    async fetchSubjectsByFilter(
        { dispatch, commit }: ActionContext<Dispatch, Commit>,
        { class_id, teacher_id }: { class_id: number; teacher_id: number }
    ) {
        subjectService.getAllByFilter(class_id, teacher_id).then(
            (subjects: Subject[]) => {
                commit('setSubjects', subjects);
            },
            (error: Error) => {
                handleErrors(error, dispatch);
            }
        );
    },
    async selectSubject(
        { commit }: ActionContext<Dispatch, Commit>,
        subject: Subject
    ) {
        commit('selectSubject', subject);
    },
    async createSubject(
        { dispatch }: { dispatch: Dispatch },
        subject: { title: string }
    ) {
        subjectService.create(subject).then(
            () => {
                dispatch(
                    'alert/success',
                    `${subject.title} успішно додана до списку предметів`,
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
    setSubjects(state: SubjectState, subjects: Subject[]) {
        state.subjects = subjects;
    },
    selectSubject(state: SubjectState, subject: Subject) {
        if (state.selectedSubject == subject.id)
            return (state.selectedSubject = 0);
        return (state.selectedSubject = subject.id);
    }
};

const getters = {
    getAllSubjects(state: SubjectState): Subject[] {
        return state.subjects;
    },
    getSelectedSubject(state: SubjectState) {
        return state.selectedSubject;
    }
};

export const subject = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
