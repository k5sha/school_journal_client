<template>
    <remove-theme-modal
        :visible="isRemoveModalVisible"
        @hide="toggleRemoveThemeModal"
        :themes="getAllThemes"
    />
    <button
        class="unselectable add-btn ms-3 p-2"
        @click="toggleRemoveThemeModal"
    >
        <strong>Видалити тему</strong>
    </button>
</template>

<script lang="ts">
import RemoveThemeModal from './Modals/Themes/RemoveTheme.modal.vue';
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
export default defineComponent({
    name: 'remove-theme-button',
    components: { RemoveThemeModal },
    data: function () {
        return {
            isRemoveModalVisible: false
        };
    },
    props: {
        subject_id: Number,
        class_id: Number
    },
    computed: {
        ...mapGetters({
            getAllThemes: 'theme/getAllThemes'
        })
    },

    methods: {
        ...mapActions({
            fetchAllStudents: 'student/fetchAllStudents',
            fetchAllThemes: 'theme/fetchAllThemes'
        }),
        toggleRemoveThemeModal() {
            this.isRemoveModalVisible = !this.isRemoveModalVisible;
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
        await this.fetchAllThemes({
            class_id: this.class_id,
            subject_id: this.subject_id
        });
    }
});
</script>

<style scoped>
.unselectable {
    user-select: none;
    cursor: pointer;
}

.add-btn {
    color: white;
    background-color: rgb(64, 88, 244);
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 2%), 0 2px 5px 0 rgb(0 0 0 / 2%);
    border: 2px solid rgb(64, 88, 244);
    border-radius: 5px;
}
.add-btn:hover {
    color: rgb(64, 88, 244);
    background-color: white;
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 2%), 0 2px 5px 0 rgb(0 0 0 / 2%);
    border: 2px solid rgb(64, 88, 244);
    border-radius: 5px;
}
</style>
