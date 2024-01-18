const key = useRuntimeConfig().wpapi;

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const apiUrl = key

  interface WPData {
    data: {
      nodeByUri: string
    }
  }

  const uri = query.uri
  const data: WPData = await $fetch(apiUrl, {
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

})