const key = useRuntimeConfig().wpapi;

export default defineCachedEventHandler(async () => {

    const apiUrl = key

    interface WPData {
        data: {
            menuItems: {
                nodes: {}[]
            }
        }
    }

    const data: WPData = await $fetch(apiUrl, {
        query: {
            query: `
                query NewQuery {
                    menuItems {
                        nodes {
                            label
                            uri
                        }
                    }
                  }`
        }
    })

    return data.data.menuItems.nodes as Array<Record<'label' | 'uri', string>>;

}, {
    maxAge: 60 * 60
})