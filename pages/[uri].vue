<template>
    <div>
      <TheHeader></TheHeader>
        <main class="bg-gray-100 container mx-auto mt-6 p-6 rounded-lg">
            <h1 class="text-4xl">{{ data.title }}</h1>
            <article class="mt-4 space-y-2" v-html="data.content"></article>
        </main>
    </div>
 </template>
 
 <script setup>
 
 const route = useRoute();
 const uri = route.params.uri;
 const config = useRuntimeConfig();
 const {data, pending, refresh, error} = await useFetch(config.public.apiBase, {
    method: 'get',
    query: {
        query: `
        query NewQuery($uri: String!) {
            nodeByUri(uri: $uri) {
                ... on Page {
                    id
                    title
                    content
                }
            }
        }
        `,
        variables: {
            uri: uri
        }
    },
    transform(data){
        return data.data.nodeByUri
    }
 })
 
 
 useHead({
    title: data.value.title
 })
 </script>
 