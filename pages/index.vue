<script setup>
const config = useRuntimeConfig();
const { data } = await useFetch(config.public.apiBase, {
    method: 'get',
    query: {
        query: `
     query NewQuery {
       posts(first:10){
         nodes {
           title
           date
           excerpt
           uri
         }
       }
     }`
    }, transform(data) {
        let temp = []
        data.data.posts.nodes.map( el => temp.push({'title': el.title,'date': el.date,'excerpt': el.excerpt,'uri': el.uri}))
        return temp
    }
});
</script>

<template>
    <div>
        <TheHeader></TheHeader>
        <div class="grid gap-8 grid-cols-1 lg:grid-cols-3 p-6">
            <Post v-for="post in data" :key="post.uri" :post="post"></Post>
        </div>
    </div>
</template>