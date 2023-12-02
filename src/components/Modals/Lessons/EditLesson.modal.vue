<template>
    <Modal v-show="visible" @close="closeEditModal">
        <template v-slot:header> Редагування ✏️</template>
        <template v-slot:text>
            <form @submit.prevent="confirmEdit">
                <div class="row g-3 align-items-center">
                    <div class="row g-3 align-items-center">
                        <div class="col-auto">
                            <label for="numberInput" class="col-form-label"
                                >№ Номер</label
                            >
                        </div>
                        <div class="col-auto">
                            <input
                                type="number"
                                id="numberInput"
                                class="form-control"
                                aria-describedby="numberHelpInline"
                                v-model="num"
                            />
                        </div>
                        <div class="col-auto">
                            <span id="numberHelpInline" class="form-text">
                                За календарним плануванням
                            </span>
                        </div>
                    </div>
                    <div class="row align-items-center">
                        <div class="col-auto">
                            <label for="selectTheme" class="col-form-label"
                                >Тема</label
                            >
                        </div>
                        <div class="col-12">
                            <select
                                id="selectTheme"
                                class="form-select"
                                aria-label="Select theme"
                                v-model="themeId"
                            >
                                <option
                                    v-for="theme in themes"
                                    :key="theme.id"
                                    :value="theme.id"
                                    :selected="themeId == theme.id"
                                >
                                    {{ theme.title }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="row align-items-center">
                        <div class="col-auto">
                            <label for="textAreaTheme" class="col-form-label"
                                >Під. тема</label
                            >
                        </div>
                        <div class="col-12">
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
                                Під. тема уроку за календарним плануванням
                            </span>
                        </div>
                    </div>

                    <div class="row g-3 align-items-center">
                        <div class="col-auto">
                            <label for="dateInput" class="col-form-label"
                                >Дата 📅
                            </label>
                        </div>
                        <div class="col-auto">
                            <input
                                type="date"
                                id="dateInput"
                                class="form-control"
                                aria-describedby="dateHelpInline"
                                v-model="date"
                            />
                        </div>
                        <div class="col-auto">
                            <span id="dateHelpInline" class="form-text">
                                Дата проведення уроку
                            </span>
                        </div>
                    </div>
                    <hr />
                    <button class="btn btn btn-warning btn-sm" type="submit">
                        Змінити
                    </button>
                </div>
            </form>
        </template>
    </Modal>
</template>
<script lang="ts">
import { ThemeInterface } from '@/store/modules/theme';
import { defineComponent, PropType } from 'vue';
import { mapActions } from 'vuex';
import Modal from '../../Modal.vue';

export default defineComponent({
    name: 'edit_lesson_modal',
    components: {
        Modal
    },
    props: {
        lesson: Object,
        themes: {
            type: Array as PropType<ThemeInterface[]>
        },
        visible: Boolean
    },
    data: function () {
        return {
            num: '',
            title: '',
            themeTitle: 'Second theme',
            themeId: 0,
            date: ''
        };
    },
    setup() {
        return {
            ...mapActions('lesson', ['editLesson'])
        };
    },
    watch: {
        lesson: function (newLesson) {
            this.num = newLesson.num;
            this.title = newLesson.title;
            this.date = new Date(newLesson.date).toISOString().slice(0, 10);
            this.themeId = newLesson.themeId;
        }
    },
    methods: {
        confirmEdit() {
            this.editLesson({
                id: this.lesson?.id,
                num: this.num,
                title: this.title,
                themeTitle: this.themeTitle,
                themeId: this.lesson?.themeId,
                date: new Date(this.date)
            });
            this.$emit('hide-edit-modal');
        },
        closeEditModal() {
            this.$emit('hide-edit-modal');
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
