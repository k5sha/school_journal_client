<template>
    <Modal v-show="visible" @close="closeCreationModal">
        <template v-slot:header> Створення предмету</template>
        <template v-slot:text>
            <form @submit.prevent="confirmCreation">
                <div class="row g-3 p-4 align-items-center">
                    <div class="col-auto">
                        <label for="nameInput" class="col-form-label"
                            >Назва 🖋️
                        </label>
                    </div>
                    <div class="col-auto">
                        <input
                            type="text"
                            id="nameInput"
                            class="form-control"
                            aria-describedby="nameHelpInline"
                            v-model="title"
                            placeholder="Математика"
                        />
                    </div>

                    <hr />
                    <button class="btn btn btn-success btn-sm" type="submit">
                        Створити
                    </button>
                </div>
            </form>
        </template>
    </Modal>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import Modal from '../../Modal.vue';

export default defineComponent({
    name: 'create_subject_modal',
    components: {
        Modal
    },
    props: {
        visible: Boolean,
        role: String
    },
    data() {
        return {
            title: ''
        };
    },
    setup() {
        return {
            ...mapActions('subject', ['createSubject'])
        };
    },
    methods: {
        confirmCreation() {
            this.createSubject({ title: this.title });
            this.$emit('hide');
        },
        closeCreationModal() {
            this.$emit('hide');
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
