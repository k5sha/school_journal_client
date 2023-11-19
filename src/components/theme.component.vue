<template>
    <confirm-delete-lesson-modal
        :visible="showDeleteModal"
        :lessonToDeleteId="lessonToDeleteId"
        :lessonToDeleteThemeId="themeToDeleteId"
        @hide-delete-modal="hideDeleteModal"
    />
    <lesson-detail-modal
        :visible="showDetailModal"
        :lesson="selectedLesson"
        @hide-detail-modal="hideDetailModal"
    ></lesson-detail-modal>
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
            <div class="lh-1">
                <h1 class="h5 mb-0 text-white lh-1">
                    📚 Тема: {{ theme.title }}
                </h1>
            </div>
        </div>
        <div
            class="d-flex align-items-start justify-content-start my-3 p-3 bg-body rounded shadow-sm"
            v-for="lesson in theme.lessons.reverse()"
            :key="lesson.id"
        >
            <div class="pt-3 w-100">
                <div
                    class="align-items-start justify-content-start d-inline-flex pt-3 w-100"
                >
                    <span
                        class="lesson-index me-2 rounded"
                        :style="{ backgroundColor: nextColor(lesson.id) }"
                        >{{ lesson.num }}</span
                    >
                    <div
                        class="d-flex flex-column p-2 align-items-start justify-content-start"
                    >
                        <p class="pb-3 mb-0 lh-sm border-bottom text-left">
                            <strong class="ps-2 text-gray-dark">{{
                                lesson.title
                            }}</strong>
                        </p>
                    </div>
                </div>
            </div>
            <div class="d-flex p-2">
                <button
                    class="btn btn-info ms-2"
                    @click="toggleDetailModal(lesson)"
                >
                    <font-awesome-icon :icon="['fas', 'info']" />
                </button>
                <button class="btn btn-warning ms-2">
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
</template>

<script lang="ts">
import { LessonInterface } from '@/store/modules/lesson';
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import ConfirmDeleteLessonModal from './Modals/ConfirmDeleteLesson.modal.vue';
import LessonDetailModal from './Modals/LessonDetail.moda.vue';
export default defineComponent({
    name: 'theme_component',
    components: { ConfirmDeleteLessonModal, LessonDetailModal },
    data: function () {
        return {
            showDeleteModal: false,
            showDetailModal: false,
            selectedLesson: {},
            lessonToDeleteId: 0,
            themeToDeleteId: 0
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
            return `rgb(${44 + 20 * (id - 1)}, ${88 - 10 * (id - 1)} ,  88)`;
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
        toggleDetailModal(lesson: LessonInterface) {
            this.selectedLesson = lesson;
            this.showDetailModal = true;
        },
        hideDetailModal() {
            this.showDetailModal = false;
            this.selectedLesson = {};
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
