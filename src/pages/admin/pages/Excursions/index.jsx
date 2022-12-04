/**
 * external libs
 */
import React, {useEffect, useMemo, useState, useRef} from 'react';
import {useParams} from "react-router-dom";
import {Button} from 'antd'
/**
 * components
 */
import ExcursionForm from "./components/ExcursionForm";
import ExcursionItemForm from "./components/ExcursionItemForm";
import ExcursionTable from "./components/ExcursionTable";
/**
 * service
 */
import CountryService from "../../../../services/admin/country.service";
import PlaceService from "../../../../services/admin/sight.service";


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
    }

    const getCountry = async () => {
        const country = await CountryService.show(countryId)
        setCountry(country)
    }

    const createEmptyRouteDay = () => {
        setExcursionFormData({
            ...excursionFormData,
            routes: [
                ...excursionFormData.routes,
                []
            ]
        })
    }

    const getPlace = async () => {
        setPlaces((await PlaceService.list({country_id: countryId, per_page: 1000000})).data)
    }

    const drowOnMap = () => {
        markerListRef.current.forEach( marker => marker.setMap(null));
        markerListRef.current = currentActiveDay.map(({ place }) => {
            const {longitude, latitude} = place

            return new window.google.maps.Marker({
                position: {
                    lat: latitude,
                    lng: longitude
                },
                map: mapRef.current,
            })
        })
    }

    useEffect(() => {
        getPlace()
    }, [])

    useEffect(() => {
        if(!places){
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

    if(!places){
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
                    <div style={{display: "flex", justifyContent: "space-between", marginBottom: 10, alignItems: "center"}}>
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
                                           createActiveDay={createActiveDay}
                                           setCreateActiveDay={setCreateActiveDay}/>
                    )}
                    <ExcursionTable day={day}/>
                </div>
            ))}
            {excursionFormData.name && !!excursionFormData.routes.length && !!excursionFormData.routes[excursionFormData.routes.length - 1].length && (
                <Button onClick={createEmptyRouteDay}>Finish day</Button>
            )}

        </div>
    )
}
