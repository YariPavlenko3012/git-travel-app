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
    const [placeList, setPlaceList] = useState([]);
    const [place, setPlace] = useState(null);
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
            north: sight.latitude + 0.025 / 2, //noth lat
            south: sight.latitude - 0.025 / 2, //south lat
            east: sight.longitude + 0.025, //noth lng = 0.05
            west: sight.longitude - 0.025, //south lng = 0.05
        };
        GoogleClient.getRectangle(
            mapRef.current,
            squareSize
        )
        const {north, south, east, west,} = squareSize

        const placesList = (await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${sight.original_name}&location=${sight.latitude},${sight.longitude}&inputtype=textquery&key=AIzaSyApPL4vfjbQ_iVFrfE-97KN-ncf8i1NDLU`)).json()


        // const placesList = (await fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${sight.original_name}&language=uk&fields=formatted_address,name,place_id,opening_hours,geometry&locationrestriction=rectangle:${south},${west}|${north},${east}&locationbias=rectangle:${south},${west}|${north},${east}&inputtype=textquery&key=${key}`)).json()
        const places = await placesList

        if (!places.results.length) {
            return setPlaceList([])
        }

        places.results.forEach( place => {
            const marker = GoogleClient.getMarker(
                mapRef.current,
                {lat: place.geometry.location.lat, lng: place.geometry.location.lng},
                GoogleClient.generateCustomMarker("red")
            )


            marker.addListener("click", () => {
                placeDetails(place, sight)
            });
        })

        setPlaceList(places.results)
    }
    const placeDetails = async (newPlace, place) => {
        const requestDetailPlace = {
            placeId: newPlace.place_id,
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

        const placeDetail = await GoogleClient.getPlaceDetails(requestDetailPlace.placeId, requestDetailPlace.fields)

        if (placeDetail?.failed) {
            return setCurrentSight({
                ...place,
                check_coordinates: true,
                formatted_address: place.formatted_address || place.formatted_address || null,
                google_place_id: place.place_id,
                latitude: place.geometry.location.lat,
                longitude: place.geometry.location.lng,
            })
        }
        setCurrentSight({
            ...place,
            check_coordinates: true,
            google_place_name: placeDetail.name,
            formatted_address: placeDetail.formatted_address || place.formatted_address || null,
            google_place_id: placeDetail.place_id,
            latitude: placeDetail.geometry.location.lat,
            longitude: placeDetail.geometry.location.lng,
            international_phone_number: placeDetail.international_phone_number || place.international_phone_number || null,
            website: placeDetail.website || place.website || null,
            opening_hours: GoogleClient.parseOpeningHours(placeDetail.opening_hours?.periods) || place.opening_hours || null,
            place_type: [...new Set([...place.place_type, ...placeDetail.types])]
                .filter( type => {
                    return dictionary.place_types.list
                        .map(({value}) => value)
                        .includes(type)
                }),
        })
    }

    const mapInit = async (lat, lng) => {
        const opt = {
            center: {lat, lng},
            zoom: 14,
            // restriction: {
            //     latLngBounds: {
            //         north: lat + 0.025 / 2, //noth lat
            //         south: lat - 0.025 / 2, //south lat
            //         east: lng + 0.025, //noth lng = 0.05
            //         west: lng - 0.025, //south lng = 0.05
            //     },
            //     strictBounds: true
            // },
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
            {lat, lng},
            GoogleClient.generateCustomMarker("black")
        )
    }

    const init = async () => {
        const sight = await SightService.show(sightId)
        await mapInit(sight.latitude, sight.longitude)
        await searchPlace(sight)
        setPlace(sight)
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <div>
            <div style={{display: "flex", gap: 20}}>
                <div ref={mapBlockRef} style={{width: "70%", height: 500}}/>
                <div style={{display: "flex", flexDirection: "column", gap: 10, paddingTop: 20, fontSize: 18}}>
                    {placeList.map( (currentPlace, index) => (
                        <div style={{cursor: "pointer", color: currentPlace.place_id === currentSight?.google_place_id ? "#0d6efd" : "black"}} onClick={() => placeDetails(currentPlace, place)}>
                            <div >
                                №: {index + 1}, {currentPlace.name}
                            </div>
                            <div>
                                Lat: {currentPlace.geometry.location.lat}, Lng: {currentPlace.geometry.location.lng}
                            </div>
                            <div>
                                Address: {currentPlace.formatted_address}
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
