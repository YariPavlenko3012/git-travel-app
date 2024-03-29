/**
 * external libs
 */
import React, {useEffect, useContext, useMemo, useState, useRef} from 'react';
import {useParams} from "react-router-dom";
import {Button} from 'antd'
import { Radio } from 'antd';
/**
 * components
 */
import ExcursionForm from "../ExcursionForm";
import ExcursionItemForm from "../ExcursionItemForm";
import ExcursionTable from "../ExcursionTable";
import GeoSelectForm from "../GeoSelectForm";
/**
 * service
 */
import CountryService from "../../../../../../services/admin/country.service";
import ExcursionService from "../../../../../../services/admin/excursion.service";
import CityService from "../../../../../../services/admin/city.service";
import DictionaryService from "../../../../../../services/dictionary.service";
/**
 * utils
 */
import GoogleClient from "../../../../../../utils/GoogleClient";
/**
 * enums
 */
import ExcursionRouteTypeEnum from "../../../../../../enums/ExcursionRouteType";
import ExcursionPageTypeEnum from "../../../../../../enums/ExcursionPageType";
/**
 * context
 */
import {DictionaryContext} from "../../../../../context/dictionary.context";
import PlaceTypeEnum from "../../../../../../enums/PlaceType";
import RouteTypeInfo from "../RouteTypeInfo";
import {ExcursionUtils} from "../../../../../../utils/Excursion";


export default function ExcursionsPage({pageType, handler}) {
    const {dictionary} = useContext(DictionaryContext)
    const {countryId, cityId, excursionId} = useParams();
    const [excursionFormData, setExcursionFormData] = useState({
        name: "",
        description: "",
        items: [
            [],
        ]
    })
    const [activeRouteType, setActiveRouteType] = useState(ExcursionRouteTypeEnum.walking)
    const [country, setCountry] = useState(null)
    const [city, setCity] = useState(null)
    const [places, setPlaces] = useState([])
    const [createActiveDay, setCreateActiveDay] = useState(null)
    const [currentActiveDay, setCurrentActiveDay] = useState(null)
    const markerListRef = useRef([]);
    const mapBlockRef = useRef(null);
    const polylineRef = useRef(null);
    const mapRef = useRef(null);
    const isShowPage = useMemo(() => pageType === ExcursionPageTypeEnum.show, [pageType])

    const getExcursion = async (excursionId) => {
        const excursion = await ExcursionService.show(excursionId)
        setExcursionFormData(excursion)
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
    }
    const getCountry = async (countryId) => {
        const country = await CountryService.show(countryId)
        setCountry(country)

        return country;
    }
    const getPlaces = async (countryId, cityId) => {
        setPlaces(await DictionaryService.sights({
            city_id: cityId,
            country_id: countryId
        }))
    }
    const getCity = async (cityId) => {
        const city = await CityService.show(cityId)
        setCity(city)

        await getPlaces(country?.id, city?.id)

        return city;
    }

    const finishDay = () => {
        setExcursionFormData({
            ...excursionFormData,
            items: [
                ...excursionFormData.items,
                []
            ]
        })
    }

    const drowOnMap = () => {
        markerListRef.current.forEach(marker => marker.setMap(null));
        if (polylineRef.current) {
            polylineRef.current.setMap(null)
        }

        markerListRef.current = currentActiveDay.map(({place}) => {
            const {longitude, latitude} = place

            return GoogleClient.getMarker(
                mapRef.current,
                {
                    lat: latitude,
                    lng: longitude
                },
            )
        })

        const polylinePath = currentActiveDay
            .reduce((polylineResult, excursionItem) => {
                const path = excursionItem.routes[ExcursionRouteTypeEnum.walking].path || []

                return [
                    ...polylineResult,
                    ...(path.length > 1 ? path : [])
                ]
            }, [])
            .map(coordinate => {
                const [lat, lng] = coordinate.split(" ")
                return new window.google.maps.LatLng(lat, lng);
            }, [])

        polylineRef.current = GoogleClient.getPolyline(
            mapRef.current,
            polylinePath
        )
    }

    const generateRoutesByGoogle = async (currentExcursionFormData, currentDayIndex, startIndexPlace = 0) => {
        const currentDay = currentExcursionFormData.items[currentDayIndex]
        const travelMode = dictionary.excursion_route_type.map(({value}) => value);
        for (let i = startIndexPlace; i < currentDay.length; i++) {
            const currentPlace = currentDay[i];
            const prevPlace = currentDay[i - 1]

            if (i === 0) {
                travelMode.forEach((travelMode) => {
                    currentPlace.routes[travelMode] = {
                        path: [],
                        distance: 0,
                        duration: 0
                    }
                })
                continue;
            }

            for (let j = 0; j < travelMode.length; j++) {
                const currentTravelMode = travelMode[j];

                const params = {
                    destination: `${currentPlace.place.latitude},${currentPlace.place.longitude}`,
                    origin: `${prevPlace.place.latitude},${prevPlace.place.longitude}`,
                    mode: currentTravelMode
                }

                const route = await GoogleClient.getDirection(params)

                currentPlace.routes[currentTravelMode] = {
                    path: route.routes[0].legs[0].steps.reduce((polylineResult, {polyline}) => {
                        const polylinePoints = window.google.maps.geometry.encoding.decodePath(polyline.points);
                        const polylineCoordinates = polylinePoints.map(polyline => `${polyline.lat()} ${polyline.lng()}`);

                        const resultPath = [
                            ...polylineResult,
                            ...polylineCoordinates,
                        ]

                        return resultPath.length > 1 ? resultPath : []
                    }, []),
                    duration: route.routes[0].legs[0].duration.value,
                    distance: route.routes[0].legs[0].distance.value
                }
            }
        }

        markerListRef.current.forEach(marker => marker.setMap(null));
        if (polylineRef.current) {
            polylineRef.current.setMap(null)
        }

        markerListRef.current = currentDay.map(({place}) => {
            const {longitude, latitude} = place

            return GoogleClient.getMarker(
                mapRef.current,
                {
                    lat: latitude,
                    lng: longitude
                }
            )
        })

        const polylinePath = currentDay
            .reduce((polylineResult, excursionItem) => {
                const path = excursionItem.routes[ExcursionRouteTypeEnum.walking].path || [];

                return [
                    ...polylineResult,
                    ...(path.length > 1 ? path : [])
                ]
            }, [])
            .map(coordinate => {
                const [lat, lng] = coordinate.split(" ")
                return new window.google.maps.LatLng(lat, lng);
            }, []);


        polylineRef.current = GoogleClient.getPolyline(
            mapRef.current,
            polylinePath
        )

        setExcursionFormData(currentExcursionFormData)
    }

    const changePriority = async (day, oldPriority, newPriority) => {
        let copyExcursionFormData = JSON.parse(JSON.stringify(excursionFormData));
        const currentDay = copyExcursionFormData.items[day - 1];

        [currentDay[oldPriority - 1], currentDay[newPriority - 1]] = [currentDay[newPriority - 1], currentDay[oldPriority - 1]]

        currentDay.forEach((day, index) => {
            currentDay[index].priority = index + 1
        })

        await generateRoutesByGoogle(copyExcursionFormData, day - 1)
    }

    const deletePlace = async (currentDay, placeId) => {
        const newExcursionFormData = {...excursionFormData}

        newExcursionFormData.items[currentDay - 1] = newExcursionFormData.items[currentDay - 1]
            .filter(({place_id}) => place_id !== placeId)
            .map((place, index) => ({
                ...place,
                priority: index + 1
            }))

        await generateRoutesByGoogle(newExcursionFormData, currentDay - 1)
    }

    const handlerAction = async () => {
        let excursionData = JSON.parse(JSON.stringify(excursionFormData))

        const requestExcursionFormData = ExcursionUtils.toBackendFormat(excursionData)

        await handler(requestExcursionFormData)
    }

    const init = async () => {
        let country = null;
        let city = null;

        if (countryId) {
            country = await getCountry(countryId);
        }

        if (cityId) {
            city = await getCity(cityId);
        }

        if (!cityId) {
            await getPlaces(country?.id, city?.id)
        }

        if (excursionId) {
            await getExcursion(excursionId);
        }

        await mapInit(country?.geometry);
    }


    useEffect(() => {
        init()
    }, [])

    useEffect(() => {
        if (!currentActiveDay) {
            return;
        }

        drowOnMap()
    }, [currentActiveDay])

    return (
        <div>
            <GeoSelectForm countryId={country?.id}
                           cityId={city?.id}
                           getCity={getCity}
                           getCountry={getCountry}/>
            <div ref={mapBlockRef} style={{width: "100%", height: 500}}/>
            <div style={{display: "flex", alignItems: "center", marginBottom: 30}}>
                <Radio.Group onChange={e => setActiveRouteType(e.target.value)} value={activeRouteType}>
                    <Radio value={ExcursionRouteTypeEnum.walking}>Walking</Radio>
                    <Radio value={ExcursionRouteTypeEnum.driving}>Driving</Radio>
                </Radio.Group>
            </div>
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
            {excursionFormData.name && excursionFormData.items.map((day, index) => (
                <div key={index} style={{marginBottom: 20}}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 10,
                        alignItems: "center"
                    }}>
                        <div onClick={() => setCurrentActiveDay(day)} style={{cursor: "pointer", display: "flex", alignItems: "center", gap: 7}}>
                            <div>
                                Day №{index + 1}
                            </div>
                            <RouteTypeInfo day={day} activeRouteType={activeRouteType}/>
                        </div>
                        {!isShowPage && (
                            <Button onClick={() => setCreateActiveDay(index)}>Create place for {index + 1} day</Button>
                        )}
                    </div>
                    {createActiveDay !== null && (
                        <ExcursionItemForm excursionFormData={excursionFormData}
                                           setExcursionFormData={setExcursionFormData}
                                           createActiveDay={createActiveDay}
                                           generateRoutesByGoogle={generateRoutesByGoogle}
                                           setCreateActiveDay={setCreateActiveDay}
                                           countryId={country?.id}
                                           places={places}
                                           cityId={city?.id}
                        />
                    )}
                    <ExcursionTable day={day}
                                    activeRouteType={activeRouteType}
                                    changePriority={changePriority}
                                    isShowPage={isShowPage}
                                    deletePlace={deletePlace}/>
                </div>
            ))}
            {!isShowPage && (
                <div>
                    {excursionFormData.name && !!excursionFormData.items.length && !!excursionFormData.items[excursionFormData.items.length - 1].length && (
                        <Button onClick={finishDay}>Finish day</Button>
                    )}
                    {excursionFormData.name && !!excursionFormData.items.length && !!excursionFormData.items[0].length && !excursionFormData.items[excursionFormData.items.length - 1].length && (
                        <Button onClick={handlerAction}>{pageType === ExcursionPageTypeEnum.edit ? "EDIT" : "CREATE"} EXCURSION</Button>
                    )}
                </div>
            )}
        </div>
    )
}
