<template>
    <Modal v-show="visible" @close="closeAddModal">
        <template v-slot:header> Створення теми ✏️</template>
        <template v-slot:text>
            <form @submit.prevent="confirmAdd">
                <div class="row g-3 align-items-center">
                    <div class="row align-items-center">
                        <div class="col-auto">
                            <label for="textAreaTheme" class="col-form-label"
                                >Тема</label
                            >
                        </div>
                        <div class="col-12 p-2">
                            <textarea
                                id="textAreaTheme"
                                class="form-control w-100"
                                aria-describedby="textareaHelpInline"
                                v-model="title"
                                ref="textarea"
                            ></textarea>
                        </div>
                        <div class="col-auto">
                            <span id="textareaHelpInline" class="form-text">
                                Тема уроку за календарним плануванням
                            </span>
                        </div>
                    </div>
                    <hr />
                    <button class="btn btn btn-success btn-sm" type="submit">
                        Додати
                    </button>
                </div>
            </form>
        </template>
    </Modal>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import Modal from '../../Modal.vue';

export default defineComponent({
    name: 'add_theme_modal',
    components: {
        Modal
    },
    props: {
        class_id: Number,
        suibject_id: Number,
        visible: Boolean
    },
    data: function () {
        return {
            title: ''
        };
    },
    setup() {
        return {
            ...mapActions('theme', ['addTheme'])
        };
    },
    methods: {
        confirmAdd() {
            this.addTheme({
                title: this.title,
                subjectId: this.suibject_id,
                classId: this.class_id
            });
            this.title = '';
            this.$emit('hide');
        },
        closeAddModal() {
            this.title = '';
            this.$emit('hide');
        }
    }
});
</script>

<style scoped>
#textAreaTheme {
    display: block;
    overflow: visible;
}
</style>
