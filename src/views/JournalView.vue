<template>
    <div class="container">
        <div class="flex-box text-center mt-4">
            <selectedClass />
            <selectedSubject class="ms-5" />
        </div>
        <lessons />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import selectedSubject from '@/components/selectSubject.vue';
import selectedClass from '@/components/selectClass.vue';
import lessons from '@/components/lessons.vue';
import { mapGetters } from 'vuex';

export default defineComponent({
    components: { selectedSubject, selectedClass, lessons },
    data: function () {
        return {
            isAddThemeVisible: false
        };
    },
    computed: {
        ...mapGetters({
            isTeacher: 'acount/isTeacher'
        })
    }
});
</script>

<style scoped>
@media (min-width: 991.98px) {
    .flex-box {
        display: flex;
    }
}

@media (max-width: 991.98px) {
    .flex-box {
        display: grid;
        max-width: 2vh;
    }
}
.add-theme {
    color: white;
    background-color: rgb(64, 88, 244);
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 2%), 0 2px 5px 0 rgb(0 0 0 / 2%);
    border: 2px solid rgb(64, 88, 244);
    border-radius: 5px;
}

.add-theme:hover {
    color: rgb(64, 88, 244);
    background-color: white;
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 2%), 0 2px 5px 0 rgb(0 0 0 / 2%);
    border: 2px solid rgb(64, 88, 244);
    border-radius: 5px;
}
.unselectable {
    user-select: none;
    cursor: pointer;
}
</style>
