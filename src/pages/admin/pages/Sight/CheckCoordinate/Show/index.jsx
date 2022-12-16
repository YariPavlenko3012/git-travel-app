/**
 * external libs
 */
import React, {useContext, useRef, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
/**
 * components
 */
import SightUpdateForm from "../../components/Form/SightUpdate";
/**
 * context
 */
import {DictionaryContext} from "../../../../../context/dictionary.context";
/**
 * services
 */
import SightService from "../../../../../../services/admin/sight.service";
import GoogleClient from "../../../../../../utils/GoogleClient";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default function CheckCoordinate() {
    const {sightId} = useParams();
    const mapBlockRef = useRef(null);
    const mapRef = useRef(null);
    const {dictionary} = useContext(DictionaryContext)
    const [sights, setSights] = useState(null);
    const [currentSight, setCurrentSight] = useState(null);
    const key = "AIzaSyApPL4vfjbQ_iVFrfE-97KN-ncf8i1NDLU";

    const generateMarker = (color = "#000") => {
        const pinSVGFilled = "M 12,2 C 8.1340068,2 5,5.1340068 5,9 c 0,5.25 7,13 7,13 0,0 7,-7.75 7,-13 0,-3.8659932 -3.134007,-7 -7,-7 z";
        const labelOriginFilled = new window.google.maps.Point(12, 9);


        return {  // https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerLabel
            path: pinSVGFilled,
            anchor: new window.google.maps.Point(12, 17),
            fillOpacity: 1,
            fillColor: color,
            strokeWeight: 2,
            strokeColor: "white",
            scale: 2,
            labelOrigin: labelOriginFilled
        };
    }
    const searchPlace = async (sight) => {
        const squareSize = {
            north: sight.latitude + 0.03 / 2, //noth lat
            south: sight.latitude - 0.03 / 2, //south lat
            east: sight.longitude + 0.03, //noth lng = 0.05
            west: sight.longitude - 0.03, //south lng = 0.05
        };

        const {north, south, east, west,} = squareSize

        const placesList = (await fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${sight.original_name}&fields=formatted_address,name,place_id,opening_hours,geometry&locationbias=rectangle:${south},${west}|${north},${east}&inputtype=textquery&key=${key}`)).json()
        const places = await placesList

        if (!places.candidates.length) {
            return null
        }

        return places.candidates
    }
    const placeDetails = async (placeId) => {
        const requestDetailPlace = {
            placeId: placeId,
            fields: [
                'international_phone_number',
                'opening_hours',
                'website',
                'geometry',
                'type',
                'photo',
                'formatted_address',
                'name',
                'place_id',
            ]
        };
        const placeDetailRes = (await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${requestDetailPlace.placeId}&fields=${requestDetailPlace.fields.join(",")}&key=${key}`)).json()
        const result = await placeDetailRes


        if(result.status === "OK"){
            let placeDetails = {
                ...result.result,
                opening_hours: result.result.opening_hours?.periods || null
            }

            console.log(placeDetails, "placeDetails")

            if(placeDetails.opening_hours){
                if(placeDetails.opening_hours.length === 1 && placeDetails.opening_hours[0].close === undefined){
                    placeDetails.opening_hours = days.reduce((result, day ) => ({
                        ...result,
                        [day]: {
                            open: "00:00",
                            close: "00:00"
                        }
                    }), {})
                }
                else{
                    placeDetails.opening_hours = placeDetails.opening_hours.reduce( (result, openHour) => ({
                        ...result,
                        [days[openHour.open.day]]: {
                            open: `${openHour.open.time.slice(0, 2)}:${openHour.open.time.slice(2, 4)}`,
                            close: `${openHour.close.time.slice(0, 2)}:${openHour.close.time.slice(2, 4)}`,
                        }
                    }), {})
                }
            }

            return placeDetails
        }

        return null
    }

    const mapInit = async (lat, lng) => {
        const opt = {
            center: {lat, lng},
            zoom: 11,
            restriction: {
                latLngBounds: {
                    north: lat + 0.03 / 2, //noth lat
                    south: lat - 0.03 / 2, //south lat
                    east: lng + 0.03, //noth lng = 0.05
                    west: lng - 0.03, //south lng = 0.05
                },
                strictBounds: true
            },
            // styles: [
            //     {
            //         "featureType": "administrative",
            //         "elementType": "all",
            //         "stylers": [
            //             {
            //                 "visibility": "simplified"
            //             }
            //         ]
            //     },
            //     {
            //         "featureType": "poi",
            //         "elementType": "all",
            //         "stylers": [
            //             {
            //                 "visibility": "off"
            //             }
            //         ]
            //     },
            //
            // ]
        }

        mapRef.current = new window.google.maps.Map(mapBlockRef.current, opt)

        GoogleClient.getMarker(
            mapRef.current,

        )
        GoogleClient.getMarker(
            mapRef.current,
            {lat, lng},
            GoogleClient.generateCustomMarker()
        )
    }

    const init = async () => {
        const sight = await SightService.show(sightId)
        const place = await searchPlace(sight)
        await mapInit(sight.latitude, sight.longitude)

        if (place) {
            let placesList = []


            for (let i = 0; i < place.length; i++) {
                const currentPlace = place[i];
                const placeDetail = await placeDetails(currentPlace.place_id)

                console.log(placeDetail)

                if (placeDetail) {

                    placesList = [...placesList, {
                        ...sight,
                        google_place_name: placeDetail.name,
                        formatted_address: placeDetail.formatted_address || sight.formatted_address || null,
                        google_place_id: placeDetail.place_id,
                        latitude: placeDetail.geometry.location.lat,
                        longitude: placeDetail.geometry.location.lng,
                        international_phone_number: placeDetail.international_phone_number || sight.international_phone_number || null,
                        website: placeDetail.website || sight.website || null,
                        opening_hours: placeDetail.opening_hours || sight.opening_hours || null,
                        place_type: [...new Set([...sight.place_type, ...placeDetail.types])]
                            .filter( type => {
                                return dictionary.place_types.list
                                    .map(({value}) => value)
                                    .includes(type)
                            }),
                    }]

                    continue
                }

                placesList = [...placesList, {
                    ...sight,
                    google_place_name: currentPlace.name,
                    formatted_address: currentPlace.formatted_address || sight.formatted_address || null,
                    google_place_id: currentPlace.place_id,
                    latitude: currentPlace.geometry.location.lat,
                    longitude: currentPlace.geometry.location.lng,
                }]
            }

            placesList.forEach( place => {
                const marker = GoogleClient.getMarker(
                    mapRef.current,
                    {lat: place.latitude, lng: place.longitude},
                    generateMarker("red")
                )

                marker.addListener("click", () => {
                    setCurrentSight(place)
                });
            })

            setSights(placesList)
            return;
        }

        setSights([])
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <div>
            <div style={{display: "flex", gap: 20}}>
                <div ref={mapBlockRef} style={{width: "70%", height: 500}}/>
                <div style={{display: "flex", flexDirection: "column", gap: 10, paddingTop: 20, fontSize: 18}}>
                    {sights && sights.map( (sight, index) => (
                        <div style={{cursor: "pointer", color: sight.google_place_id === currentSight?.google_place_id ? "#0d6efd" : "black"}} onClick={() => setCurrentSight(sight)}>
                            <div >
                                №: {index + 1}, {sight.google_place_name}
                            </div>
                            <div>
                                Lat: {sight.latitude}, Lng: {sight.longitude}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {currentSight && (
                <SightUpdateForm sight={currentSight} sightId={currentSight.id} getSight={null}/>
            )}
        </div>
    )
}
