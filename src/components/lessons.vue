<template>
    <div v-if="getSelectedClass == 0 || getSelectedSubject == 0">
        <div
            class="container-fluid d-flex justify-content-center align-items-center overflow-hidden"
            style="height: 50vh"
        >
            <div class="row">
                <div
                    class="d-flex align-items-center justify-content-center pt-10"
                >
                    <div class="text-center">
                        <h4 class="fw-bold">🔎Тут нічого немає</h4>
                        <p class="fs-6">
                            🧐 Виберіть будь-ласка
                            <strong
                                >{{
                                    getSelectedClass == 0
                                        ? 'клас, предмет'
                                        : ''
                                }}{{
                                    getSelectedSubject == 0 &&
                                    getSelectedClass != 0
                                        ? 'предмет'
                                        : ''
                                }}
                            </strong>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <hr />
        <div class="m-3">
            <add-theme-button
                :class_id="getSelectedClass"
                :subject_id="getSelectedSubject"
            />
            <remove-theme-button
                :class_id="getSelectedClass"
                :subject_id="getSelectedSubject"
            />
        </div>

        <div v-if="getAllLessons.length < 1" class="text-center">
            <div
                class="container-fluid d-flex justify-content-center align-items-center overflow-hidden"
                style="height: 50vh"
            >
                <div class="row">
                    <div
                        class="d-flex align-items-center justify-content-center pt-10"
                    >
                        <div class="text-center">
                            <h4 class="fw-bold">🔎Тут нічого немає</h4>
                            <p class="fs-6">
                                😯 Тут ще <strong>жодного</strong> уроку
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="container"></div>
            <theme_component
                :class_id="getSelectedClass"
                :subject_id="getSelectedSubject"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import theme_component from '@/components/theme.component.vue';
import addThemeButton from './addTheme.button.vue';
import RemoveThemeButton from './removeTheme.button.vue';
export default defineComponent({
    name: 'Lesson-view',
    components: { theme_component, addThemeButton, RemoveThemeButton },
    computed: {
        ...mapGetters({
            getSelectedSubject: 'subject/getSelectedSubject',
            getSelectedClass: 'classes/getSelectedClass',
            getAllLessons: 'lesson/getAllLessons'
        })
    },
    methods: {
        ...mapActions('lesson', ['fetchLessons'])
    },
    watch: {
        async getSelectedClass(newClass) {
            await this.fetchLessons({
                class_id: newClass || 0,
                subject_id: this.getSelectedSubject || 0
            });
        },
        async getSelectedSubject(newSubject) {
            await this.fetchLessons({
                class_id: this.getSelectedClass || 0,
                subject_id: newSubject || 0
            });
        }
    }
});
</script>
