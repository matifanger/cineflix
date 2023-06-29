<script lang="ts" setup>
import { PropType } from 'vue'
import { Movie } from 'global'

const props = defineProps({
    data: {
        type: Array as PropType<Movie[]>,
        required: true,
    },
})
</script>

<template>
    <div class="grid-movies">
        <template v-for="movie in props.data">
            <CardMovie :data="movie" />
        </template>
    </div>
</template>

<script setup lang="ts"></script>

<style lang="postcss" scoped>
.grid-movies {
    @apply grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5;
}
</style>
