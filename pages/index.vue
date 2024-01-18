<script setup>
const { data } = await useFetch('/api/posts');
</script>

<template>
    <div>
        <TheHeader :title="'Home'"></TheHeader>
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <Post v-for="post in data" :key="post.uri" :post="post"></Post>
        </div>
    </div>
</template>