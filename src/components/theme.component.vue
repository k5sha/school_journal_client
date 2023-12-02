<template>
    <confirm-delete-lesson-modal
        :visible="showDeleteModal"
        :lessonToDeleteId="lessonToDeleteId"
        :lessonToDeleteThemeId="themeToDeleteId"
        @hide-delete-modal="hideDeleteModal"
    />
    <edit-lesson-modal
        :visible="showEditModal"
        :lesson="editLesson"
        :themes="getAllThemes"
        @hide-edit-modal="hideEditModal"
    />
    <add-lesson-modal
        :visible="showAddModal"
        :themes="getAllThemes"
        :themeGroupId="selectedThemeId"
        @hide-add-modal="hideAddModal"
    />
    <div v-for="theme in getAllThemes" :key="theme.id">
        <div
            class="d-flex align-items-center p-3 my-3 text-white green rounded shadow-sm"
            :style="{ backgroundColor: nextColor(theme.id) }"
        >
            <img
                class="me-3"
                src="@/assets/favicon.svg"
                alt=""
                width="48"
                height="38"
            />
            <div class="lh-base d-flex justify-content-between w-100">
                <h1 class="h5 mt-2 text-white lh-base float-right">
                    📚 Тема: {{ theme.title }}
                </h1>
                <div class="float-left">
                    <strong class="pe-3" v-if="theme.lessons != undefined">
                        {{ getUncompletedLessonCout(theme) }}/{{
                            theme.lessons.length
                        }}✅</strong
                    >
                    <button
                        class="btn btn-white"
                        @click="toggleAddModal(theme.id)"
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
        <div v-if="theme.lessons != undefined && theme.lessons.length > 0">
            <div
                class="d-flex align-items-start justify-content-start my-3 p-3 bg-body rounded shadow-sm"
                v-for="lesson in theme.lessons"
                :key="lesson.id"
            >
                <div
                    class="pt-3 w-100"
                    style="cursor: pointer"
                    @click="showDetail(lesson)"
                >
                    <div
                        class="align-items-start justify-content-start d-inline-flex pt-3 w-100"
                    >
                        <span
                            class="lesson-index me-2 rounded"
                            :class="{
                                'bg-success': isCompleted(lesson),
                                'bg-warning': !isCompleted(lesson)
                            }"
                            >{{ lesson.num }}</span
                        >
                        <div
                            class="d-flex flex-column p-2 align-items-start justify-content-start"
                        >
                            <p class="pb-3 mb-0 lh-sm border-bottom text-left">
                                <strong>Тема🖊️: </strong>
                                {{ lesson.title }}
                            </p>
                        </div>
                    </div>
                    <div
                        v-if="selectedLesson.id == lesson.id"
                        class="d-flex align-items-start justify-content-start my-3 ms-4 bg-body rounded"
                    >
                        <p>
                            <strong>Дата проведення📅: </strong>
                            {{
                                new Date(lesson.date).toLocaleDateString(
                                    'ua-UK',
                                    {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    }
                                )
                            }}
                        </p>
                        <p class="ps-4" v-if="isEdited(lesson)">
                            <strong>Остані зміни🕰️: </strong>
                            {{
                                new Date(lesson.updatedAt).toLocaleDateString(
                                    'ua-UK',
                                    {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    }
                                )
                            }}
                        </p>
                    </div>
                </div>
                <div class="d-flex p-2">
                    <button
                        class="btn btn-warning ms-2"
                        @click="toggleEditModal(lesson)"
                    >
                        <font-awesome-icon :icon="['fas', 'edit']" />
                    </button>
                    <button
                        class="btn btn-danger ms-2"
                        @click="toggleDeleteModal(lesson.id, lesson.themeId)"
                    >
                        <font-awesome-icon :icon="['fas', 'trash']" />
                    </button>
                </div>
            </div>
        </div>
        <div v-else>
            <div
                class="d-flex align-items-start justify-content-start my-3 p-2 bg-body rounded shadow-sm"
            >
                <div class="w-100">
                    <div
                        class="align-items-center justify-content-center d-inline-flex w-100 text-center"
                    >
                        <p>Тут нічого немає</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { LessonInterface } from '@/store/modules/lesson';
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import ConfirmDeleteLessonModal from './Modals/Lessons/ConfirmDeleteLesson.modal.vue';
import EditLessonModal from './Modals/Lessons/EditLesson.modal.vue';
import AddLessonModal from './Modals/Lessons/AddLesson.modal.vue';
import { ThemeInterface } from '../store/modules/theme';

export default defineComponent({
    name: 'theme_component',
    components: { ConfirmDeleteLessonModal, EditLessonModal, AddLessonModal },
    data: function () {
        return {
            showDeleteModal: false,
            showEditModal: false,
            showAddModal: false,
            lessonToDeleteId: 0,
            themeToDeleteId: 0,
            selectedThemeId: 0,
            selectedLesson: { id: 0 },
            editLesson: {}
        };
    },
    props: {
        class_id: Number,
        subject_id: Number
    },
    computed: {
        ...mapGetters({
            getAllStudents: 'student/getAllStudents',
            getAllThemes: 'theme/getAllThemes'
        })
    },
    methods: {
        ...mapActions({
            fetchAllStudents: 'student/fetchAllStudents',
            fetchAllThemes: 'theme/fetchAllThemes'
        }),
        nextColor(id: number) {
            while (id > 32) {
                id = Math.round(id / 1.5);
            }
            return `rgb(${44 - 4 * (id - 1)}, ${88 + 2 * (id - 1)} ,  120)`;
        },
        toggleDeleteModal(lesson_id: number, theme_id: number) {
            this.lessonToDeleteId = lesson_id;
            this.themeToDeleteId = theme_id;
            this.showDeleteModal = true;
        },
        hideDeleteModal() {
            this.lessonToDeleteId = 0;
            this.showDeleteModal = false;
        },
        toggleEditModal(lesson: LessonInterface) {
            this.editLesson = lesson;
            this.showEditModal = true;
        },
        hideEditModal() {
            this.showEditModal = false;
        },
        toggleAddModal(themeId: number) {
            this.selectedThemeId = themeId;
            this.showAddModal = true;
        },
        hideAddModal() {
            this.selectedThemeId = 0;
            this.showAddModal = false;
        },
        showDetail(lesson: LessonInterface) {
            if (lesson.id == this.selectedLesson.id)
                return (this.selectedLesson = { id: 0 });
            this.selectedLesson = lesson;
        },
        getUncompletedLessonCout(theme: ThemeInterface) {
            return theme.lessons.filter((e: LessonInterface) => {
                return new Date(e.date).getTime() - Date.now() < 0;
            }).length;
        },
        isEdited(lesson: LessonInterface) {
            return (
                new Date(lesson.updatedAt).getTime() -
                    new Date(lesson.createdAt).getTime() >
                0
            );
        },
        isCompleted(lesson: LessonInterface) {
            return new Date(lesson.date).getTime() - Date.now() < 0;
        }
    },
    watch: {
        class_id: async function (newClassId) {
            await this.fetchAllThemes({
                class_id: newClassId,
                subject_id: this.subject_id
            });
        },
        subject_id: async function (newSubjectId) {
            await this.fetchAllThemes({
                class_id: this.class_id,
                subject_id: newSubjectId
            });
        }
    },
    async mounted() {
        await this.fetchAllStudents(this.class_id);
        await this.fetchAllThemes({
            class_id: this.class_id,
            subject_id: this.subject_id
        });
    }
});
</script>

<style scoped>
.btn-white {
    background-color: white;
    border-radius: 4px;
    color: rgb(64, 88, 244);
    font-size: large;
}
.lesson-index {
    padding: 4px 8px 4px 8px;
    border-radius: 4px;
    color: white;
}

.status-badge {
    padding: 8px;
    margin: 8px;
}
</style>
