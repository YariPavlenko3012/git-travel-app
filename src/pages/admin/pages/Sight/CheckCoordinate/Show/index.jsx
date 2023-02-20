/**
 * external libs
 */
import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
/**
 * components
 */
import SightUpdateForm from "../../components/Form/SightUpdate";
/**
 * context
 */
/**
 * services
 */
import SightService from "../../../../../../services/admin/sight.service";
import GoogleClient from "../../../../../../utils/GoogleClient";
import FoursquareClient from "../../../../../../utils/FoursquareClient";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default function CheckCoordinate() {
    const {sightId} = useParams();
    const mapBlockRef = useRef(null);
    const mapRef = useRef(null);
    const [placeList, setPlaceList] = useState([]);
    const [place, setPlace] = useState(null);
    const [currentSight, setCurrentSight] = useState(null);

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
        const {north, south, east, west} = squareSize

        const placesList = await FoursquareClient.getPlaces({
            query: sight.original_name,
            ll: `${sight.latitude},${sight.longitude}`,
            radius: 1500,
            limit: 3
        })
        // const placesList = (await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${sight.original_name}&location=${sight.latitude},${sight.longitude}&inputtype=textquery&key=AIzaSyApPL4vfjbQ_iVFrfE-97KN-ncf8i1NDLU`)).json()
        // const placesList = (await fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${sight.original_name}&language=uk&fields=formatted_address,name,place_id,opening_hours,geometry&locationrestriction=rectangle:${south},${west}|${north},${east}&locationbias=rectangle:${south},${west}|${north},${east}&inputtype=textquery&key=${key}`)).json()
        // const places = await placesList

        if (!placesList.length) {
            return setPlaceList([])
        }

        placesList.forEach( place => {
            console.log(place, "place")
            const marker = GoogleClient.getMarker(
                mapRef.current,
                {lat: place.geocodes.main.latitude, lng: place.geocodes.main.longitude},
                GoogleClient.generateCustomMarker("red")
            )


            marker.addListener("click", () => {
                placeDetails(place, sight)
            });
        })

        setPlaceList(placesList)
    }
    const placeDetails = async (newPlace, place) => {
        console.log(newPlace)
        const placeDetail = await FoursquareClient.getPlacesDetails(newPlace.fsq_id, ["tel","website","hours"])
        console.log(placeDetail, "111")

        if (!placeDetail) {
            return setCurrentSight({
                ...place,
                formatted_address: newPlace.location.formatted_address || place.formatted_address || null,
                foursquare_place_id: newPlace.fsq_id,
                latitude: newPlace.main.latitude,
                longitude: newPlace.main.longitude,
            })
        }

        setCurrentSight({
            ...place,
            formatted_address: newPlace.location.formatted_address || place.formatted_address || null,
            foursquare_place_id: newPlace.fsq_id,
            latitude: newPlace.geocodes.main.latitude,
            longitude: newPlace.geocodes.main.longitude,
            international_phone_number: placeDetail.tel || place.international_phone_number || null,
            website: placeDetail.website || place.website || null,
            opening_hours: placeDetail?.opening_hours || null,
            place_type: null
        })
    }

    const mapInit = async (lat, lng) => {
        const opt = {
            center: {lat, lng},
            zoom: 14,
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
                                Lat: {currentPlace.geocodes.main.latitude}, Lng: {currentPlace.geocodes.main.longitude}
                            </div>
                            <div>
                                Address: {currentPlace.location.formatted_address}
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
