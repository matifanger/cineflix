<script lang="ts" setup></script>

<template>
    <div class="homepage">
        <div class="homepage__wrapper">
            <p class="homepage__title">
                <span>Unlimited movies, TV <br /></span>
                <span> shows and more. </span>
            </p>
            <p class="homepage__subtitle">Watch anywhere, for free.</p>

            <div class="homepage__btn">
                <NuxtLink to="/login"> Join now! </NuxtLink>
            </div>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.homepage {
    @apply px-4 text-center pt-52 lg:pt-0 lg:min-h-screen flex justify-center items-center bg-cover bg-center;
    &__wrapper {
        @apply space-y-7;
    }
    &__title {
        @apply text-white font-bold text-3xl lg:text-5xl flex flex-col items-center;
    }
    &__subtitle {
        @apply text-white font-semibold text-xl lg:text-3xl flex flex-col items-center;
    }

    &__btn {
        @apply flex flex-row items-center justify-center;
        & a {
            @apply text-xl border rounded-full px-8 py-2 bg-white text-black hover:text-white hover:bg-transparent transition-colors z-[200];
        }
    }
}
</style>
