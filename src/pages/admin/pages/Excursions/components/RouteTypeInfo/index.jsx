/**
 * external libs
 */
import React, {useMemo} from 'react'
import ExcursionRouteTypeEnum from "../../../../../../enums/ExcursionRouteType";
import PlaceTypeEnum from "../../../../../../enums/PlaceType";
import PlaceTypeDurationEnum from "../../../../../../enums/PlaceTypeDuration";
import DateTime from "../../../../../../utils/DateTime";

const emptyRouteInfo = {
    [ExcursionRouteTypeEnum.walking]: {
        duration: 0,
        distance: 0,
    },
    [ExcursionRouteTypeEnum.driving]: {
        duration: 0,
        distance: 0,
    }
}

export default function RouteTypeInfo({day, activeRouteType}){
    const info = useMemo(() => {
        return day.reduce((info, item) => {
            let currentPlace = item.place.place_type[0];
            if(item.place.place_type[0] === PlaceTypeEnum.tourist_attraction && item.place.place_type.length > 1){
                currentPlace = item.place.place_type[1]
            }

            const placeTime = PlaceTypeDurationEnum[currentPlace];

            info[ExcursionRouteTypeEnum.walking].distance += +item.routes[ExcursionRouteTypeEnum.walking].distance;
            info[ExcursionRouteTypeEnum.walking].duration += +item.routes[ExcursionRouteTypeEnum.walking].duration + placeTime;
            info[ExcursionRouteTypeEnum.driving].distance += +item.routes[ExcursionRouteTypeEnum.driving].distance;
            info[ExcursionRouteTypeEnum.driving].duration += +item.routes[ExcursionRouteTypeEnum.driving].duration + placeTime;

            return info
        }, JSON.parse(JSON.stringify(emptyRouteInfo)))


    }, [day, activeRouteType])


    return (
        <div>
            {(info[activeRouteType].distance / 1000).toFixed(1)}km ({DateTime.secondsToH(info[activeRouteType].duration)}h)
        </div>
    )

}
