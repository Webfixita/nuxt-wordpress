<script setup>
const { data } = await useFetch('/api/data?c=posts');
</script>

<template>
    <div>
        <TheHeader :title="'Home'"></TheHeader>
        <div class="grid gap-8 grid-cols-1 lg:grid-cols-3 p-6">
            <Post v-for="post in data" :key="post.uri" :post="post"></Post>
        </div>
    </div>
</template>