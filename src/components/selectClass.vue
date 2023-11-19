<template>
    <div class="d-flex align-content-between flex-wrap mt-4 class-list">
        <div
            v-for="class_ in getAllClasses"
            :key="class_.id"
            @click="selectClass(class_)"
            class="class-item pe-4 unselectable"
            :class="{ active: getSelectedClass == class_.id }"
        >
            <strong>{{ class_.title }}</strong>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters, mapState } from 'vuex';

export default defineComponent({
    name: 'selectedClass',
    computed: {
        ...mapGetters('classes', ['getAllClasses', 'getSelectedClass']),
        ...mapState('account', ['status', 'user'])
    },
    methods: {
        ...mapActions({
            fetchClasses: 'classes/fetchClasses',
            selectClass: 'classes/selectClass'
        })
    },
    async mounted() {
        await this.fetchClasses();
    }
});
</script>

<style scoped>
.class-list {
    background-color: rgb(64, 88, 244);
    border-radius: 5px;
}

.class-item {
    color: white;
    padding: 8px 8px 8px 8px;
}
.unselectable {
    user-select: none;
    cursor: pointer;
}
.active {
    color: rgb(64, 88, 244);
    background-color: white;
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 2%), 0 2px 5px 0 rgb(0 0 0 / 2%);
    border: 2px solid rgb(64, 88, 244);
    border-radius: 5px;
}
</style>
