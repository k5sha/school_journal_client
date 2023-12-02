<template>
    <Modal v-show="visible" @close="closeAddModal">
        <template v-slot:header> Видалення теми 🔴</template>
        <template v-slot:text>
            <form @submit.prevent="confirmAdd">
                <div class="row g-3 align-items-center">
                    <div class="row align-items-center">
                        <div class="col-auto">
                            <label for="selectTheme" class="col-form-label"
                                >Виберіть темя для видалення</label
                            >
                        </div>
                        <div class="col-12">
                            <select
                                id="selectTheme"
                                class="form-select"
                                aria-label="Select theme"
                                v-model="idToRemove"
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
                    <hr />
                    <button class="btn btn btn-danger btn-sm" type="submit">
                        Видалити
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
    name: 'remove_theme_modal',
    components: {
        Modal
    },
    props: {
        themes: {
            type: Array as PropType<ThemeInterface[]>
        },
        visible: Boolean
    },
    data: function () {
        return {
            idToRemove: 0
        };
    },
    setup() {
        return {
            ...mapActions('theme', ['removeTheme'])
        };
    },
    methods: {
        confirmAdd() {
            this.removeTheme(this.idToRemove);
            this.idToRemove = 0;
            this.$emit('hide');
        },
        closeAddModal() {
            this.idToRemove = 0;
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
