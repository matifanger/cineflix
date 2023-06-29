<script setup lang="ts">
import { PropType, ref } from 'vue'
import { Movie } from 'global'

defineProps({
    data: {
        type: Object as PropType<Movie>,
        required: true,
    },
})

// Handle image error on load
const error = ref(false)
</script>

<template>
    <NuxtLink class="movie" :to="`/movie/${data.imdbID}`">
        <img
            class="movie__image --zoom"
            :src="data.Poster"
            alt="poster"
            @error="() => (error = true)"
            v-if="!error"
        />
        <div class="movie__fallback --zoom" v-else>
            <h2>{{ data.Title }}</h2>
        </div>
    </NuxtLink>
</template>

<style lang="postcss" scoped>
.movie {
    @apply overflow-hidden;
    &__image {
        @apply h-full rounded-lg;
    }
    &__fallback {
        @apply px-5 py-10 flex items-center justify-center text-xl md:text-2xl h-full text-center border border-gray-300 border-opacity-30 rounded-lg backdrop-blur-md;
    }
}

.--zoom {
    @apply hover:scale-105 hover:brightness-125 transition;
}
</style>
