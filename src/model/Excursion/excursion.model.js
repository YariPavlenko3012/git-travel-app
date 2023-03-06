import RouteModel from "../route.model";
import ExcursionItemModel from "./excursionItem.model";

export default class ExcursionModel {
    constructor(data = {}) {
        this.description = data.translation?.description || "DIMA PERENESUT description";
        this.id = data.id;
        this.name = data.translation?.name || "DIMA PERENESUT NAME";
        this.user_id = data.user_id;
        this.user_type = data.user_type;
        this.isInFavorites = data.is_in_favorites;
        this.isInVisited = data.is_in_visited;
        this.items = data.items.reduce(( itemsResult, item) => {
            itemsResult[item.day - 1] = [
                ...(itemsResult[item.day - 1] || []),
                new ExcursionItemModel({
                    ...item,
                    routes: item.routes.reduce(( routesResult, route) => {
                        routesResult[route.route_type] = new RouteModel(route)

                        return routesResult
                    }, {})
                })
            ]

            return itemsResult
        }, [])
    }
}
