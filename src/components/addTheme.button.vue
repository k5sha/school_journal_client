<template>
    <add-theme-modal
        :visible="isAddModalVisible"
        :class_id="class_id"
        :suibject_id="subject_id"
        @hide="toggleAddThemeModal"
    />
    <button class="unselectable add-btn p-2" @click="toggleAddThemeModal">
        <strong>Додати тему</strong>
    </button>
</template>

<script lang="ts">
import AddThemeModal from './Modals/Themes/AddTheme.modal.vue';
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'add-theme-button',
    components: { AddThemeModal },
    data: function () {
        return {
            isAddModalVisible: false
        };
    },
    props: {
        subject_id: Number,
        class_id: Number
    },
    methods: {
        toggleAddThemeModal() {
            this.isAddModalVisible = !this.isAddModalVisible;
        }
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
