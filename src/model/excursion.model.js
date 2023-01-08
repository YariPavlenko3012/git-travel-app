export default class ExcursionModel {
    constructor(data = {}) {
        this.description = data.description
        this.id = data.id
        this.name = data.name
        this.user_id = data.user_id
        this.user_type = data.user_type
        this.items = data.items.reduce(( itemsResult, day) => {
            itemsResult[day.day - 1] = [
                ...(itemsResult[day.day - 1] || []),
                {
                    ...day,
                    routes: day.routes.reduce(( routesResult, item) => {
                        routesResult[item.route_type] = item

                        return routesResult
                    }, {})
                }
            ]


            return itemsResult
        }, [])
    }
}