<template>
    <Modal v-show="visible" @close="closeDetailModal">
        <template v-slot:header> Тримайте більше деталей 🧐 </template>
        <template v-slot:text>
            <div class="m-4">
                <p><strong>Тема🖊️: </strong>{{ lesson.title }}</p>

                <hr />
                <p>
                    <strong>Дата проведення📅: </strong>
                    {{
                        new Date(lesson.date).toLocaleDateString('ua-UK', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })
                    }}
                </p>
                <hr />
                <p
                    v-if="
                        new Date(lesson.updatedAt).getTime() -
                            new Date(lesson.createdAt).getTime() >
                        0
                    "
                >
                    <strong>Остані зміни🕰️: </strong>
                    {{
                        new Date(lesson.updatedAt).toLocaleDateString('ua-UK', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })
                    }}
                </p>
            </div>
        </template>
    </Modal>
</template>
<script>
import Modal from '../Modal.vue';
export default {
    name: 'detail_lesson_modal',
    components: {
        Modal
    },
    props: {
        lesson: Object,
        visible: Boolean
    },
    methods: {
        closeDetailModal() {
            this.$emit('hide-detail-modal');
        }
    }
};
</script>

<style scoped></style>
