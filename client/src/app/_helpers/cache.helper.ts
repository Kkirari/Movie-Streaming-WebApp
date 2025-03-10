
const data = new Map()
type cacheOpt = 'members' | 'chat' | 'followers' | 'following'
// type cacheValue = Paginator<UserQueryPagination, User> | Paginator<QueryPagination, User>
export const cacheManager = {

    createKey: function <T extends { [key: string]: any }>(query: T) {
        return Object.values(query).join('-')
    },


    // load: function (key: string, opt: cacheOpt): cacheValue | undefined {
    //     const _data = data.get(opt + key)
    //     if (!_data)
    //         if (opt === 'chat')
    //             return _data as Paginator<QueryPagination, User>
    //         else
    //             return _data as Paginator<UserQueryPagination, User>
    //     return undefined
    // },


    save: function (key: string, opt: cacheOpt, value: any) {
        // if (opt === 'chat')
        value.items = value.items.map
        data.set(opt + key, value)
    },

    clear: function (opt: cacheOpt | 'all') {
        if (opt === 'all') {
            data.clear()
        } else {
            for (const key of data.keys()) {
                if (key.startsWith(opt)) {
                    data.delete(key)
                }
            }
        }
    },
}