/**
 * external libs
 */
import React, {useEffect, useRef, useState} from 'react';
/**
 * components
 */
import PlaceType from './components/Types'
/**
 * enums
 */
import PlaceTypeEnum from '../../../../enums/PlaceType'
/**
 * utils
 */
import PlaceTypeTranslate from "../../../../utils/PlaceTypeTranslate";

export default function GeneratePlace() {
    const [placeTypes, setPlaceTypes] = useState(PlaceTypeTranslate.getTranslateForType(PlaceTypeEnum.googleTypesList[0]))
    const mapBlockRef = useRef(null);
    const mapRef = useRef(null);
    const key = "AIzaSyCUEy_a1-0t-WP4yoHG6Y00wwa9j4pgp74";

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
            places.forEach(async ({place_id, ...rest}, index) => {
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

                // console.log(requestDetailPlace, "requestDetailPlace")
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
            restriction: {
                latLngBounds: {
                    north: 50.590798, //noth lat up
                    east: 30.825941, //noth lng right
                    south: 50.213273, //south lat down
                    west: 30.2394401, //south lng left
                },
                strictBounds: true
            },
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
                north: 50.590798, //noth lat
                south: 50.213273, //south lat
                east: 30.825941, //noth lng
                west: 30.2394401, //south lng
            },
        });

        new window.google.maps.Marker({
            position: {
                lat: 50.4662711,
                lng: 30.5134968
            },
            map: mapRef.current,
        })
    }

    const sqare = () => {
        const getRectangle = (north, east, south, west ) => {
            const bounds = new window.google.maps.LatLngBounds();

            bounds.extend(new window.google.maps.LatLng(north, east));
            bounds.extend(new window.google.maps.LatLng(south, west));

            new window.google.maps.Rectangle({
                strokeColor: "blue",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "blue",
                fillOpacity: 0.35,
                map: mapRef.current,
                bounds: {
                    north: bounds.getNorthEast().lat(), //noth lat
                    south: bounds.getSouthWest().lat(), //south lat
                    east: bounds.getNorthEast().lng(), //noth lng
                    west: bounds.getSouthWest().lng(), //south lng
                },
            });
        }

        const stepHorizontal = 0.0017073362242;
        const stepVertical = stepHorizontal / 2;

        const city = {
            north: 50.590798, //noth lat up
            east: 30.825941, //noth lng right
            south: 50.213273, //south lat down
            west: 30.2394401, //south lng left
        }

        const placeHeightCoordinate = city.north - city.south;
        const placeWidthCoordinate = city.east - city.west;

        const heightStep = placeHeightCoordinate / stepVertical;
        const widthStep = placeWidthCoordinate / stepHorizontal;

        const forLoop = async _ => {
            for (let i = 1; i <= Math.floor(heightStep); i++){
                for (let j = 1; j <= Math.floor(widthStep); j++){
                    console.log(`index: ${i}; jndex ${j}`)
                    console.log(`index: ${i}; jndex ${j}`)
                    await new Promise(resolve => setTimeout(resolve, 50))
                    console.log(`HERE`)
                    getRectangle(city.south + (stepVertical * i),  city.west + (stepHorizontal * j), city.south + (stepVertical * (i - 1)), city.west + (stepHorizontal * (j - 1)))
                }
            }
        }

        forLoop()
    }


    useEffect(() => {
        // getGeometryForCity()

        mapInit()
    }, [])

    return (
        <div>
            <div onClick={sqare}>
                Get place
            </div>
            <PlaceType setPlaceTypes={setPlaceTypes} placeTypes={placeTypes}/>
            <div ref={mapBlockRef} style={{width: "100%", height: 500}} />
        </div>
    )
}
