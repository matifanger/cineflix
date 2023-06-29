<script setup lang="ts">
import { DetailedMovieResponse, MoviesResponse } from 'global'
const route = useRoute()
const router = useRouter()

// Get details from the API
const { data: movie } = await useAsyncData<DetailedMovieResponse>('movie' + route.params.id, () =>
    $fetch(`/api/getdata?i=${route.params.id}`)
)

if (movie.value?.Response === 'False') {
    router.push('/404')
}

// Get movies from the API
const search = getRandomMovie()
const { data: movies } = await useAsyncData<MoviesResponse>('movies' + route.params.id + search, () =>
    $fetch(`/api/getdata?s=${search}`)
)

// Set a color for the metascore background
const metascore_color = computed(() => {
    const score = parseInt(movie.value?.Metascore || '0')

    if (score > 70) {
        return 'bg-green-500'
    } else if (score > 50) {
        return 'bg-yellow-500'
    } else {
        return 'bg-red-500'
    }
})

definePageMeta({
    middleware: ['auth'],
})

useHead({
    title: movie.value?.Title || 'Movie',
    meta: [{ name: 'description', content: `${movie.value?.Title || 'Movie'} - Cineflix` }],
})
</script>

<template>
    <div>
        <main v-if="movie" class="movie">
            <article class="movie__content">
                <div class="movie__wrapper">
                    <div class="movie__info">
                        <div class="info__important">
                            <h1>{{ movie.Title }}</h1>
                            <p>{{ movie.Year }} · {{ movie.Runtime }} · {{ movie.Rated }}</p>
                        </div>
                        <div class="info__ratings">
                            <div v-for="rating in movie.Ratings">{{ rating.Source }}: {{ rating.Value }}</div>
                        </div>
                    </div>
                    <div class="movie__poster">
                        <img :src="movie.Poster" :alt="movie.Title" />
                        <ul class="poster__data">
                            <li v-if="movie.Plot">{{ movie.Plot }}</li>
                            <li v-if="movie.Awards"><UnoIcon class="i-mdi:trophy" /> {{ movie.Awards }}</li>
                            <li v-if="movie.Genre">
                                <UnoIcon class="i-mdi:google-circles-extended" /> {{ movie.Genre }}
                            </li>
                            <li v-if="movie.Actors"><UnoIcon class="i-mdi:people" /> {{ movie.Actors }}</li>
                            <li v-if="movie.Director">
                                <UnoIcon class="i-mdi:camera" /> {{ movie.Director }}
                            </li>
                            <li v-if="movie.Writer"><UnoIcon class="i-mdi:pen" /> {{ movie.Writer }}</li>
                            <li v-if="movie.Language">
                                <UnoIcon class="i-mdi:language" /> {{ movie.Language }}
                            </li>
                            <li v-if="movie.Metascore">
                                Metascore:
                                <span class="metascore" :class="metascore_color"> {{ movie.Metascore }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </article>
        </main>
        <section class="movie__recommended" v-if="movies">
            <h2>More movies</h2>
            <div class="recommended">
                <GridMovies :data="movies.Search" />
            </div>
        </section>
    </div>
</template>

<style lang="postcss" scoped>
.movie {
    @apply text-white bg-gray-800 backdrop-blur-lg bg-opacity-10 pt-20 lg:pt-0;
    &__content {
        @apply container py-4 lg:py-32;
    }
    &__wrapper {
        @apply flex flex-col gap-5;
        & img {
            @apply w-52 mx-auto sm:w-auto;
        }
    }
    & h1 {
        @apply text-4xl lg:text-5xl font-semibold;
    }
    &__info {
        @apply flex flex-wrap justify-between items-center gap-5 lg:gap-10 mb-3;
        & .info__important {
            @apply space-y-1;
        }
    }
    &__poster {
        @apply flex flex-col md:flex-row gap-5;
        & .poster__data {
            @apply flex flex-col gap-1 w-full;
            & li {
                @apply pb-3 flex items-center gap-3 pt-3;
                & div {
                    @apply shrink-0;
                }
            }
            & li:not(:last-of-type) {
                @apply border-b border-white border-opacity-30;
            }
            & .metascore {
                @apply p-0.5 px-1 font-medium text-stone-100;
            }
        }
    }

    &__recommended {
        @apply container py-10 lg:py-20;
        & h2 {
            @apply text-3xl lg:text-4xl font-semibold pb-5;
        }
    }
}
</style>
