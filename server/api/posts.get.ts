const key = useRuntimeConfig().wpapi;

export default defineCachedEventHandler(async () => {
  const apiUrl = key

  interface WPData {
    data: {
      posts: {
        nodes: {}[]
      }
    }
  }

  const data: WPData = await $fetch(apiUrl, {
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
    }
  })

  return data.data.posts.nodes as Array<Record<'title' | 'date' | 'excerpt' | 'uri', string>>;

}, {
  maxAge: 60 * 60,
  group: 'posts',
  name: 'postsdata',
  getKey: () => 'all',
})