const key = useRuntimeConfig().wpapi;

export default defineCachedEventHandler(async () => {
  const apiUrl = key

  interface WPData {
    data: {
      pages: {
        nodes: {}[]
      }
    }
  }

  const data: WPData = await $fetch(apiUrl, {
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

}, {
  maxAge: 60 * 60,
  group: 'pages',
  name: 'pagesdata',
  getKey: () => 'all',
})