<template>
    <Modal v-show="visible" @close="closeAddModal">
        <template v-slot:header> Створення заняття ✏️</template>
        <template v-slot:text>
            <form @submit.prevent="confirmAdd">
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
                    <button class="btn btn btn-success btn-sm" type="submit">
                        Додати
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
    name: 'add_lesson_modal',
    components: {
        Modal
    },
    props: {
        themes: {
            type: Array as PropType<ThemeInterface[]>
        },
        themeGroupId: Number,
        visible: Boolean
    },
    data: function () {
        return {
            num: '',
            title: '',
            themeId: 0,
            date: ''
        };
    },
    setup() {
        return {
            ...mapActions('lesson', ['addLesson'])
        };
    },
    watch: {
        themeGroupId: function (newThemeGroupId) {
            this.themeId = newThemeGroupId;
        }
    },
    methods: {
        confirmAdd() {
            this.addLesson({
                num: this.num,
                title: this.title,
                themeId: this.themeId,
                date: new Date(this.date)
            });
            this.$emit('hide-add-modal');
        },
        closeAddModal() {
            this.num = '';
            this.title = '';
            this.date = '';
            this.$emit('hide-add-modal');
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
