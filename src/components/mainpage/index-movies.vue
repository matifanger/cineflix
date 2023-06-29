<script lang="ts" setup>
import { Movie } from 'global'

const props = defineProps({
    data: {
        type: Array as PropType<Movie[]>,
        required: true,
    },
})
</script>

<template>
    <main class="homepage">
        <h1>Last movies</h1>
        <section>
            <div class="homepage__wrapper">
                <GridMovies :data="props.data" />
            </div>
        </section>
    </main>
</template>

<style lang="postcss" scoped>
.homepage {
    @apply pb-10 lg:pb-20 pt-5 lg:pt-10;
    & h1 {
        @apply container text-3xl lg:text-4xl font-semibold pt-20 lg:pt-20;
    }
    &__wrapper {
        @apply container pt-5;
    }
}
</style>
