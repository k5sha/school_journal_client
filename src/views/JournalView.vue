<template>
    <div class="container">
        <div class="d-flex align-content-between mt-4">
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
    computed: {
        ...mapGetters({
            isTeacher: 'acount/isTeacher'
        })
    }
});
</script>
