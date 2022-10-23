/**
 * external libs
 */
import React, {useEffect, useRef, useState} from 'react';
/**
 * components
 */
import PlaceType from './components/Types'
/**
 * styles
 */
import styles from "./index.module.scss";
/**
 * enums
 */
import PlaceTypeEnum from '../../../../enums/PlaceType'

export default function Park() {
    const [placeTypes, setPlaceTypes] = useState(PlaceTypeEnum.googleTypesList[0])
    const mapBlockRef = useRef(null);
    const mapRef = useRef(null);
    const key = "AIzaSyCUEy_a1-0t-WP4yoHG6Y00wwa9j4pgp74";

    const getGeometryForCity = async () => {
        fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=49.7732943,25.9947081&key=AIzaSyCUEy_a1-0t-WP4yoHG6Y00wwa9j4pgp74')
            .then(res => res.json())
            .then(city => {
                console.log(city)
                if (city.results[0]) {
                    const request = {
                        geometry: {
                            bounds: city.results[0].geometry.viewport,
                            viewport: city.results[0].geometry.viewport
                        },
                    }
                    console.log(request)
                }
            })
    }

    const getPhotos = async (photo_ref) => {
        const proxyUrl = "https://cors-anywhere.herokuapp.com/";

        const imageURLQuery = await fetch(proxyUrl + `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&sensor=false&maxheight=400&photo_reference=${photo_ref}&key=${key}`)
            .then(r => r.blob())
            .catch(console.error);

        const image = URL.createObjectURL(imageURLQuery); //declared earlier

        const response = await fetch(image);
        // here image is url/location of image
        const blob = await response.blob();
        const file = new File([blob], 'image.jpg', {type: blob.type});
    }
    const getPlaceHandler = () => {
        const service = new window.google.maps.places.PlacesService(mapRef.current);

        const requestNearbySearch = {
            bounds: mapRef.current.getBounds(),
            types: [placeTypes]
        };

        service.nearbySearch(requestNearbySearch, (places, status) => {
            places.forEach(async ({place_id}, index) => {
                const requestDetailPlace = {
                    placeId: place_id,
                    fields: [
                        'international_phone_number',
                        'opening_hours',
                        'website',
                        'geometry',
                        'type',
                        'photo',
                        'formatted_address',
                        'address_components',
                        'geometry',
                        'name',
                        'place_id',
                        'vicinity',
                    ]
                };

                console.log(requestDetailPlace, "requestDetailPlace")
                service.getDetails(requestDetailPlace, (place, status) => {
                    console.log(place, "place")
                    return {
                        photos: place.photos?.filter((_, index) => index < 5).map(photo => photo.getUrl()) || null,
                        website: place.website || null,
                        international_phone_number: place.international_phone_number || null,
                        name: place.name,
                        geometry: {
                            location: {
                                latitude: place.geometry.location.lat(),
                                longitude: place.geometry.location.lng(),
                            },
                            viewport: {
                                northeast: {
                                    latitude: place.geometry.viewport.getNorthEast().lat(),
                                    longitude: place.geometry.viewport.getNorthEast().lng()
                                },
                                southwest: {
                                    latitude: place.geometry.viewport.getSouthWest().lat(),
                                    longitude: place.geometry.viewport.getSouthWest().lng()
                                },
                            }
                        },
                        vicinity: place.vicinity,
                        opening_hours: place.opening_hours?.periods || null,
                        formatted_address: place.formatted_address,
                        description: place.editorial_summary?.overview || "",
                        google_place_id: place.place_id,
                    }
                });
            })
        });
    }

    const mapInit = () => {
        const opt = {
            center: {lat: 51.514316, lng: -0.129761},
            zoom: 4,
            // restriction: {
            //     latLngBounds: {
            //         east: 10.49234,
            //         north: 47.808455,
            //         south: 45.81792,
            //         west: 5.95608
            //     },
            //     strictBounds: true
            // },
        }

        mapRef.current = new window.google.maps.Map(mapBlockRef.current, opt)

        new window.google.maps.Rectangle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            map: mapRef.current,
            bounds: {
                north: 52.3793713, //noth lat
                south: 44.2924, //south lat
                east: 40.2204802, //noth lng
                west: 22.137159, //south lng
            },
        });

        new window.google.maps.Marker({
            position: {
                lat: 51.513416,
                lng: -0.129761
            },
            map: mapRef.current,
        })
    }


    useEffect(() => {
        getGeometryForCity()

        mapInit()
    }, [])

    return (
        <div>
            <div onClick={getPlaceHandler}>
                Get place
            </div>
            <PlaceType setPlaceTypes={setPlaceTypes} placeTypes={placeTypes}/>
            <div ref={mapBlockRef} style={{width: "100%", height: 500}} />
        </div>
    )
}
