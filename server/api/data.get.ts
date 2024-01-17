export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const apiUrl = "https://demo.conti.photos/graphql"

    interface WPData{
      data: {
        posts: {
            nodes: {}[]
        }
        pages: {
            nodes: {}[]
        },
        nodeByUri: string
      }
    }
    
    let data:WPData

    if(query.c == 'posts') {
        data = await $fetch(apiUrl, {
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

    } else if(query.c == 'pages') {
        data = await $fetch(apiUrl, {
            query: {
                query: `
                query NewQuery {
                    pages {
                      nodes {
                        title
                        uri
                      }
                    }
                  }`
            }
        })

        return data.data.pages.nodes as Array<Record<'title' | 'uri', string>>;
    
    } else if(query.page_uri) {
      const uri = query.page_uri
      data = await $fetch(apiUrl, {
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
            }`,
            variables: {
                uri: uri
            }
          }
      })

      return data.data.nodeByUri

    } else if(query.post_uri) {
      const uri = query.post_uri
      data = await $fetch(apiUrl, {
          query: {
              query: `
              query MyQuery3($uri: String!) {
                nodeByUri(uri: $uri) {
                    ... on Post {
                        id
                        title
                        date
                        content
                    }
                }
            }`,
            variables: {
                uri: uri
            }
          }
      })

      return data.data.nodeByUri
    }

    return null
})