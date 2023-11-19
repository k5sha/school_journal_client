<template>
    <div
        class="d-flex align-content-between flex-wrap mt-4 subject-list"
        :class="{ disabled: getSelectedClass == 0 }"
    >
        <div
            v-for="subject in getAllSubjects"
            :key="subject.id"
            @click="selectSubject(subject)"
            class="subject pe-4 unselectable"
            :class="{
                active:
                    getSelectedSubject == subject.id && getSelectedClass != 0
            }"
        >
            <strong>{{ subject.title }}</strong>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters, mapState } from 'vuex';

export default defineComponent({
    name: 'selectedSubject',
    computed: {
        ...mapGetters({
            getAllSubjects: 'subject/getAllSubjects',
            getSelectedSubject: 'subject/getSelectedSubject',
            getSelectedClass: 'classes/getSelectedClass'
        }),
        ...mapState('account', ['status', 'user'])
    },
    methods: {
        ...mapActions('subject', ['fetchSubjectsByFilter', 'selectSubject'])
    },
    async mounted() {
        await this.fetchSubjectsByFilter({
            class_: this.getSelectedClass,
            teacher_id: this.user.id
        });
    },
    watch: {
        async getSelectedClass(newClass) {
            await this.fetchSubjectsByFilter({
                class_: newClass,
                teacher_id: this.user.id
            });
        }
    }
});
</script>

<style scoped>
.subject-list {
    background-color: rgb(64, 88, 244);
    border-radius: 5px;
}

.disabled {
    pointer-events: none;
    opacity: 40%;
}

.subject {
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
