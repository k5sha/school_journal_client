<template>
    <Modal v-show="visible" @close="closeDeleteModal">
        <template v-slot:header> Підтвердження </template>
        <template v-slot:text>
            Ви впевнені, що хочете видалити цей урок?
            <hr />
            <button
                class="btn btn btn-danger btn-sm"
                type="button"
                @click="confirmDelete"
            >
                Видалити
            </button>
        </template>
    </Modal>
</template>
<script>
import { mapActions } from 'vuex';
import Modal from '../Modal.vue';
export default {
    name: 'delete_lesson_modal',
    components: {
        Modal
    },
    props: {
        lessonToDeleteThemeId: Number,
        lessonToDeleteId: Number,
        visible: Boolean
    },
    setup() {
        return {
            ...mapActions('lesson', ['deleteLesson'])
        };
    },
    methods: {
        confirmDelete() {
            this.deleteLesson({
                theme_id: this.lessonToDeleteThemeId,
                lesson_id: this.lessonToDeleteId
            });
            this.$emit('hide-delete-modal');
        },
        closeDeleteModal() {
            this.$emit('hide-delete-modal');
        }
    }
};
</script>

<style scoped></style>
