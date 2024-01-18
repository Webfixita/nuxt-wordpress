<script setup>
    const route = useRoute();
    const uri = route.params.uri;
    const { data } = await useFetch('/api/page?uri='+uri);
</script>

<template>
    <div>
        <TheHeader :title="data.title"></TheHeader>
        <main class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <h1 class="text-4xl">{{ data.title }}</h1>
            <article class="mt-4 space-y-2" v-html="data.content"></article>
        </main>
    </div>
</template>
 