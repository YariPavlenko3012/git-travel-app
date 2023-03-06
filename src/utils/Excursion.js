import PlaceTypeEnum from "../enums/PlaceType";
import PlaceTypeDurationEnum from "../enums/PlaceTypeDuration";
import ExcursionRouteTypeEnum from "../enums/ExcursionRouteType";

export class ExcursionUtils {
    static copy(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    static placeCount(excursionItems) {
        return excursionItems.reduce((count, placesOfDay) => count + placesOfDay.length, 0)
    }

    static daysCount(excursionItems) {
        return excursionItems.length
    }

    static time(excursionItems, routeType) {
        return excursionItems.reduce((count, itemOfDay) => {
            let addTime = 0;
            itemOfDay.forEach((item) => {
                addTime += +item.routes[routeType].duration;
                const place = item.place;
                let currentPlace = place.place_type[0];
                if (place.place_type[0] === PlaceTypeEnum.tourist_attraction && place.place_type.length > 1) {
                    currentPlace = place.place_type[1]
                }

                addTime += +PlaceTypeDurationEnum[currentPlace]
            })

            return count + addTime;
        }, [])
    }

    static images(excursionItems) {
        const defaultImage = "https://imageio.forbes.com/specials-images/dam/imageserve/1171238184/960x0.jpg?format=jpg&width=960"

        const firstDay = excursionItems[0]
        const lastDay = excursionItems[excursionItems.length - 1]
        const firstItemInFirstDay = firstDay[0];
        const lastItemInLastDay = lastDay[lastDay.length - 1];

        const firstPlace = firstItemInFirstDay.place;
        const lastPlace = lastItemInLastDay.place;

        const firstImage = firstPlace?.images?.[0]?.path || defaultImage;
        const lastImage = lastPlace?.images?.[0]?.path || defaultImage;

        return {
            firstImage,
            lastImage,
        }
    }

    static withoutEmptyDay(excursionItems) {
        return excursionItems.reduce((newItems, item) => {
            if(!item.length){
                return newItems
            }

            return [
                ...newItems,
                item
            ]
        }, [])
    }

    static imagesIds(excursionItems) {
        const firstDay = excursionItems[0]
        const lastDay = excursionItems[excursionItems.length - 1]
        const firstItemInFirstDay = firstDay[0];
        const lastItemInLastDay = lastDay[lastDay.length - 1];

        const firstPlace = firstItemInFirstDay.place;
        const lastPlace = lastItemInLastDay.place;

        const firstImage = firstPlace?.images?.[0]?.id || null;
        const lastImage = lastPlace?.images?.[0]?.id || null;

        return {
            firstImage,
            lastImage,
        }
    }

    static toBackendFormat(excursion){
        let newExcursionDataFormat = JSON.parse(JSON.stringify(excursion))
        newExcursionDataFormat.items = ExcursionUtils.withoutEmptyDay(newExcursionDataFormat.items)

        newExcursionDataFormat = {
            ...newExcursionDataFormat,
            time: ExcursionUtils.time(newExcursionDataFormat.items, ExcursionRouteTypeEnum.walking),
            count_of_places: ExcursionUtils.placeCount(newExcursionDataFormat.items),
            count_of_days: ExcursionUtils.daysCount(newExcursionDataFormat.items),
            images: ExcursionUtils.imagesIds(newExcursionDataFormat.items)
        }

        newExcursionDataFormat.items = newExcursionDataFormat.items.reduce((itemResult, day) => ([
            ...itemResult,
            ...day.reduce((day, item) => {
                return [
                    ...day,
                    {
                        ...item,
                        routes: Object.keys(item.routes).map( key => ({...item.routes[key], route_type: key}))
                    }
                ]
            }, []),
        ]), [])

        return newExcursionDataFormat
    }
}
