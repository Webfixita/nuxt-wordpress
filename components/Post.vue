<script setup lang="ts">
    const props = defineProps<{
        post: Record<'title' | 'date' | 'excerpt' | 'uri', string>
    }>();
</script>

<template>
    <NuxtLink :to='"/posts" + post.uri'>
        <div class="flex
        items-center
        py-8">
            <div>
                <h2 class="font-semibold text-2xl">{{ post.title }}</h2>
                <p>{{ new Date(post.date).toLocaleDateString() }}</p>
            </div>
        </div>
    </NuxtLink>
</template>