/**
 * external libs
 */
import React, {useEffect, useRef, useState} from 'react'
import ExcursionService from "../../../../../services/admin/excursion.service";
import PlaceTypeEnum from "../../../../../enums/PlaceType";
import ExcursionRouteTypeEnum from "../../../../../enums/ExcursionRouteType";

export default function ShowExcursion(){
    const mapBlockRef = useRef(null);
    const mapRef = useRef(null);
    const [isReady, setIsReady] = useState(false);
    const [excursions, setExcursions] = useState(null);
    const test = async () => {
        const sights = await ExcursionService.nearRoadsPlace(4,12, {
            item_id: 12,
            place_type: [PlaceTypeEnum.restaurant]
        })

        console.log(sights, "sights")

        sights.forEach( ({longitude, latitude}) => {

            new window.google.maps.Marker({
                position: {
                    lat: latitude,
                    lng: longitude
                },
                map: mapRef.current,
            })
        })
    }

    const getExcursion = async () => {
        const excursions = await ExcursionService.list();

        excursions.data = excursions.data.map( excursions => {
            excursions.items = excursions.items.reduce(( itemsResult, day) => {
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


            return excursions
        })

        setExcursions(excursions)
    }

    const mapInit = async (geometry = {}) => {
        const opt = {
            center: {lat: 51.514316, lng: -0.129761},
            zoom: 4,
            restriction: {
                latLngBounds: {
                    ...geometry
                },
                strictBounds: true
            },
        }

        mapRef.current = new window.google.maps.Map(mapBlockRef.current, opt)

        setIsReady(true)
        // test()
    }

    const drawExcursion = () => {
        const currentExcursion = excursions.data[2]

        const currentDay = currentExcursion.items[0];

        new window.google.maps.Polyline({
            path: currentDay
                .reduce((polylineResult, excursionItem) => {
                    if(!excursionItem.routes[ExcursionRouteTypeEnum.walking].path){
                        return polylineResult
                    }
                    return [
                        ...polylineResult,
                        ...excursionItem.routes[ExcursionRouteTypeEnum.walking].path
                    ]
                }, [])
                .map(coordinate => {
                    const [lat, lng] = coordinate.split(" ")
                    return new window.google.maps.LatLng(lat, lng);
                }, []),
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 3,
            geodesic: true,
            map: mapRef.current
        })

        test()
    }

    useEffect(() => {
        if(isReady){
            getExcursion()
        }
    }, [isReady])

    useEffect(() => {
        if(excursions){
            drawExcursion()
        }
    }, [excursions])

    useEffect(() => {
        mapInit()
    }, [])

    return (
        <div>
            <div ref={mapBlockRef} style={{width: "100%", height: 500}}/>
            Show Exc
        </div>
    )
}
