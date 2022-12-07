/**
 * external libs
 */
import React, {useEffect, useMemo, useState, useRef} from 'react';
import {useParams} from "react-router-dom";
import {Button} from 'antd'
/**
 * components
 */
import ExcursionForm from "../components/ExcursionForm";
import ExcursionItemForm from "../components/ExcursionItemForm";
import ExcursionTable from "../components/ExcursionTable";
/**
 * service
 */
import CountryService from "../../../../../services/admin/country.service";
import PlaceService from "../../../../../services/admin/sight.service";
import ExcursionService from "../../../../../services/admin/excursion.service";
/**
 * utils
 */
import {QueryString} from "../../../../../utils/Querystring";
/**
 * enums
 */
import ExcursionRouteTypeEnum from "../../../../../enums/ExcursionRouteType";
import PlaceTypeEnum from "../../../../../enums/PlaceType";


export default function Excursions() {
    const {countryId} = useParams();
    const [excursionFormData, setExcursionFormData] = useState({
        name: "",
        description: "",
        routes: [
            [],
        ]
    })
    const [places, setPlaces] = useState(null)
    const [country, setCountry] = useState(null)
    const [createActiveDay, setCreateActiveDay] = useState(null)
    const [currentActiveDay, setCurrentActiveDay] = useState(null)
    const markerListRef = useRef([]);
    const mapBlockRef = useRef(null);
    const polylineRef = useRef(null);
    const mapRef = useRef(null);

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


        // const params = {
        //     key: "AIzaSyApPL4vfjbQ_iVFrfE-97KN-ncf8i1NDLU",
        //     destination: "50.4346375,30.5550671",
        //     origin: "50.450555,30.5210808",
        // }
        //
        // const url = `https://maps.googleapis.com/maps/api/directions/json?${QueryString.stringify(params)}`
        // fetch(url)
        //    .then(res => res.json())
        //    .then(res => {
        //        console.log(res)
        //        const polylineToBd = res.routes[0].legs[0].steps.reduce((polylineResult, {polyline}) => {
        //            const polylinePoints = window.google.maps.geometry.encoding.decodePath(polyline.points);
        //            const polylineCoordinates = polylinePoints.map(polyline => `${polyline.lat()},${polyline.lng()}`);
        //
        //            return [
        //                ...polylineResult,
        //                ...polylineCoordinates,
        //            ]
        //        }, [])
        //        let polylineList = polylineToBd.map( coordinate => {
        //            const [lat, lng] = coordinate.split(",")
        //            return new window.google.maps.LatLng(lat,lng);
        //        }, [])
        //
        //        const line = new window.google.maps.Polyline({
        //            path: polylineList,
        //            strokeColor: "#FF0000",
        //            strokeOpacity: 1.0,
        //            strokeWeight: 3,
        //            geodesic: true,
        //            map: mapRef.current
        //        });
        //    })
    }

    const getCountry = async () => {
        const country = await CountryService.show(countryId)
        setCountry(country)
    }

    const finishDay = () => {
        console.log(excursionFormData, "excursionFormData")
        setExcursionFormData({
            ...excursionFormData,
            routes: [
                ...excursionFormData.routes,
                []
            ]
        })
    }

    const getPlace = async () => {
        setPlaces((await PlaceService.list({country_id: countryId, city_id: 340, per_page: 1000000})).data)
    }

    const drowOnMap = () => {
        markerListRef.current.forEach(marker => marker.setMap(null));
        if (polylineRef.current) {
            polylineRef.current.setMap(null)
        }

        markerListRef.current = currentActiveDay.map(({place}) => {
            const {longitude, latitude} = place

            return new window.google.maps.Marker({
                position: {
                    lat: latitude,
                    lng: longitude
                },
                map: mapRef.current,
            })
        })

        polylineRef.current = new window.google.maps.Polyline({
            path: currentActiveDay
                .reduce((polylineResult, excursionItem) => ([
                    ...polylineResult,
                    ...excursionItem.routes[ExcursionRouteTypeEnum.walking].path
                ]), [])
                .map(coordinate => {
                    const [lat, lng] = coordinate.split(" ")
                    return new window.google.maps.LatLng(lat, lng);
                }, []),
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 3,
            geodesic: true,
            map: mapRef.current
        });
    }

    const changePriority = async (day, oldPriority, newPriority) => {
        console.log(day, oldPriority, newPriority)
        let copyExcursionFormData = JSON.parse(JSON.stringify(excursionFormData));
        const currentDay = copyExcursionFormData.routes[day - 1];


        [currentDay[oldPriority - 1], currentDay[newPriority - 1]] = [currentDay[newPriority - 1], currentDay[oldPriority - 1]]
        console.log(2)

        currentDay.forEach((day, index) => {
            currentDay[index].priority = index + 1
        })
        console.log(3)

        const travelMode = ["driving", "walking"];
        for(let i = 0; i < currentDay.length; i++){
            const currentPlace = currentDay[i];
            const prevPlace = currentDay[i - 1]

            if(i === 0){
                travelMode.forEach((travelMode) => {
                    currentPlace.routes[travelMode] = {
                        path: [],
                        distance: 0,
                        duration: 0
                    }
                })
                continue;
            }

            for (let j = 0; j < travelMode.length; j++){
                const currentTravelMode = travelMode[j];

                const params = {
                    key: "AIzaSyApPL4vfjbQ_iVFrfE-97KN-ncf8i1NDLU",
                    destination: `${currentPlace.place.latitude},${currentPlace.place.longitude}`,
                    origin: `${prevPlace.place.latitude},${prevPlace.place.longitude}`,
                    travelMode: window.google.maps.TravelMode[currentTravelMode.toUpperCase()]
                }
                const url = `https://maps.googleapis.com/maps/api/directions/json?${QueryString.stringify(params)}`

                const route = await (await fetch(url)).json()

                currentPlace.routes[currentTravelMode] = {
                    path: route.routes[0].legs[0].steps.reduce((polylineResult, {polyline}) => {
                        const polylinePoints = window.google.maps.geometry.encoding.decodePath(polyline.points);
                        const polylineCoordinates = polylinePoints.map(polyline => `${polyline.lat()} ${polyline.lng()}`);

                        return [
                            ...polylineResult,
                            ...polylineCoordinates,
                        ]
                    }, []),
                    duration: route.routes[0].legs[0].duration.value,
                    distance: route.routes[0].legs[0].distance.value
                }
            }
        }
        console.log(4)


        markerListRef.current.forEach(marker => marker.setMap(null));
        if (polylineRef.current) {
            polylineRef.current.setMap(null)
        }

        markerListRef.current = currentDay.map(({place}) => {
            const {longitude, latitude} = place

            return new window.google.maps.Marker({
                position: {
                    lat: latitude,
                    lng: longitude
                },
                map: mapRef.current,
            })
        })

        polylineRef.current = new window.google.maps.Polyline({
            path: currentDay
                .reduce((polylineResult, excursionItem) => ([
                    ...polylineResult,
                    ...excursionItem.routes[ExcursionRouteTypeEnum.walking].path
                ]), [])
                .map(coordinate => {
                    const [lat, lng] = coordinate.split(" ")
                    return new window.google.maps.LatLng(lat, lng);
                }, []),
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 3,
            geodesic: true,
            map: mapRef.current
        });

        console.log(copyExcursionFormData, "copyExcursionFormData")
        console.log(excursionFormData, "excursionFormData")

        setExcursionFormData(copyExcursionFormData)
    }

    const createExcursion = async () => {
        const requestExcursionFormData = JSON.parse(JSON.stringify(excursionFormData))

        requestExcursionFormData.items = excursionFormData.routes.reduce((itemResult, day) => ([
            ...itemResult,
            ...day,
        ]), [])


        await ExcursionService.create(requestExcursionFormData)
    }



    useEffect(() => {
        getPlace()
    }, [])

    useEffect(() => {
        if (!places) {
            return;
        }

        getCountry()
    }, [places])

    useEffect(() => {
        if (!country?.geometry) {
            return;
        }

        mapInit(country.geometry)
    }, [country?.geometry])

    useEffect(() => {
        if (!currentActiveDay) {
            return;
        }

        drowOnMap()
    }, [currentActiveDay])

    if (!places) {
        return <div>Loader...</div>
    }

    return (
        <div>
            <div ref={mapBlockRef} style={{width: "100%", height: 500}}/>
            {!excursionFormData.name && (
                <ExcursionForm excursionFormData={excursionFormData}
                               setExcursionFormData={setExcursionFormData}/>
            )}
            <div style={{marginTop: 30, marginBottom: 10}}>
                <div style={{fontSize: 20}}>
                    {excursionFormData.name}
                </div>
                <div style={{fontSize: 18}}>
                    {excursionFormData.description}
                </div>
            </div>
            {excursionFormData.name && excursionFormData.routes.map((day, index) => (
                <div key={index} style={{marginBottom: 20}}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 10,
                        alignItems: "center"
                    }}>
                        <div onClick={() => setCurrentActiveDay(day)} style={{cursor: "pointer"}}>
                            Day #{index + 1}
                        </div>
                        <Button onClick={() => setCreateActiveDay(index)}>Create place for {index + 1} day</Button>
                    </div>
                    {createActiveDay !== null && (
                        <ExcursionItemForm excursionFormData={excursionFormData}
                                           setExcursionFormData={setExcursionFormData}
                                           countryId={countryId}
                                           places={places}
                                           mapRef={mapRef}
                                           markerListRef={markerListRef}
                                           polylineRef={polylineRef}
                                           createActiveDay={createActiveDay}
                                           setCreateActiveDay={setCreateActiveDay}/>
                    )}
                    <ExcursionTable day={day} changePriority={changePriority}/>
                </div>
            ))}
            {excursionFormData.name && !!excursionFormData.routes.length && !!excursionFormData.routes[excursionFormData.routes.length - 1].length && (
                <Button onClick={finishDay}>Finish day</Button>
            )}
            {excursionFormData.name && !!excursionFormData.routes.length && !!excursionFormData.routes[0].length && !excursionFormData.routes[excursionFormData.routes.length - 1].length && (
                <Button onClick={createExcursion}>CREATE EXCURSION</Button>
            )}

        </div>
    )
}
