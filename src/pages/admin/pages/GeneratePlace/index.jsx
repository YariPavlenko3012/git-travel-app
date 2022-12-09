/**
 * external libs
 */
import React, {useEffect, useRef, useState} from 'react';
import {io} from 'socket.io-client';
import {useParams} from "react-router-dom";
/**
 * components
 */
import AutomaticContent from './components/AutomaticContent'
import ManualContent from './components/ManualContent'
import CustomContent from './components/CustomContent'
import RadioGenerationType from './components/RadioGenerationType'
/**
 * enums
 */
import PlaceTypeEnum from '../../../../enums/PlaceType'
import GenerationTypeEnums from "../../../../enums/GenerationType";
/**
 * utils
 */
import PlaceTypeTranslate from "../../../../utils/PlaceTypeTranslate";
/**
 * service
 */
import GenerationPlaceService from "../../../../services/admin/generationPlace.service";
import SightService from "../../../../services/admin/sight.service";
import CountryService from "../../../../services/admin/country.service";
import SightWorkStatusEnum from "../../../../enums/SightWorkStatus";
import PlaceTypeSquareEnum from "../../../../enums/PlaceTypeSquare";

// const socket = io('http://localhost:3002', {
//     extraHeaders: {
//         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY2OTY2MDk4OX0.HNw9gf9X8nhVH5UUfQEyujpXMPb5YJpzAi5fYUz-UD0`
//     }
// });


const typeColor = {
    [GenerationTypeEnums.automatic]: {
        [PlaceTypeEnum.campground]: "red",
        [PlaceTypeEnum.embassy]: "#650abf",
        [PlaceTypeEnum.art_gallery]: "green",
        [PlaceTypeEnum.museum]: "#ff8600",
    },
    [GenerationTypeEnums.manual]: {
        [PlaceTypeEnum.amusement_park]: "green",
        [PlaceTypeEnum.aquarium]: "red",
        [PlaceTypeEnum.tourist_attraction]: "gray",
        [PlaceTypeEnum.zoo]: "black",
        [PlaceTypeEnum.restaurant]: "blue",
    }
}

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default function GeneratePlace() {
    const {countryId} = useParams();
    const [generationType, setGenerationType] = useState(GenerationTypeEnums.automatic)
    const [country, setCountry] = useState(null)
    const mapBlockRef = useRef(null);
    const squareRef = useRef(null);
    const mapRef = useRef(null);
    const key = "AIzaSyApPL4vfjbQ_iVFrfE-97KN-ncf8i1NDLU";

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

    const generateMarker = (color = "#ffffff") => {
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

    const getPhotos = async (photo_ref) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 400))
            const [file] = await GenerationPlaceService.downloadImage(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&sensor=false&maxheight=800&photo_reference=${photo_ref}&key=${key}`)
            console.log(file?.id, "file")
            return file?.id || null
        } catch (e) {
            return null
        }
    }
    const getPlaces = async (bounds, cityId, type) => {
        const service = new window.google.maps.places.PlacesService(mapRef.current);
        let lastType = null;

        const forLoop = async _ => {
            const geometry = {
                north: bounds.getNorthEast().lat(), //noth lat
                south: bounds.getSouthWest().lat(), //south lat
                east: bounds.getNorthEast().lng(), //noth lng
                west: bounds.getSouthWest().lng(), //south lng
            }
            lastType = type;

            const requestNearbySearch = {
                bounds,
                types: [type],
            }
            let placesToDB = [];
            await new Promise(resolve => setTimeout(() => resolve(), 1000))

            const isGenerate = await GenerationPlaceService.generatedSquare({
                json: { geometry },
                eq: { type }
            })

            if(isGenerate.data.length){
                return {failed: false};
            }

            await new Promise((resolve, reject) => {
                service.nearbySearch(requestNearbySearch, async (places, status, pagination) => {
                    if (!["ZERO_RESULTS", "OK"].includes(status)) {
                        reject({
                            message: `Google status error: ${status}`,
                        })
                    }

                    if(!places.length){
                        await GenerationPlaceService.create({
                            country_id: countryId,
                            geometry,
                            type
                        });
                        resolve()
                    }

                    for (let i = 0; i < places.length; i++) {
                        try {
                            const currentPlace = places[i];
                            const requestDetailPlace = {
                                placeId: currentPlace.place_id,
                                fields: [
                                    'international_phone_number',
                                    'opening_hours',
                                    'website',
                                    'geometry',
                                    'type',
                                    'photo',
                                    'formatted_address',
                                    'address_components',
                                    'name',
                                    'place_id',
                                ]
                            };
                            const placeDetailRes = (await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${requestDetailPlace.placeId}&fields=${requestDetailPlace.fields.join(",")}&key=${key}`)).json()
                            const placeDetail = await placeDetailRes
                            const place = placeDetail ? placeDetail.result : currentPlace;

                            if (!place) {
                                continue
                            }

                            let placeToBd = {
                                city_id: cityId,
                                country_id: countryId,
                                website: place.website && place.website.length < 255 ?  place.website : null,
                                international_phone_number: place.international_phone_number || null,
                                sight_name: place.name,
                                original_name: place.name,
                                formatted_address: place.formatted_address,
                                google_place_id: place.place_id,
                                place_type: place.types.filter( type => PlaceTypeEnum.list.includes(type)),
                                opening_hours: place.opening_hours?.periods || null,
                            }

                            if(placeToBd.opening_hours){
                                if(placeToBd.opening_hours.length === 1 && placeToBd.opening_hours[0].close === undefined){
                                    placeToBd.opening_hours = days.reduce((result, day ) => ({
                                        ...result,
                                        [day]: {
                                            open: "00:00",
                                            close: "00:00"
                                        }
                                    }), {})
                                }
                                else{
                                    placeToBd.opening_hours = placeToBd.opening_hours.reduce( (result, openHour) => ({
                                        ...result,
                                        [days[openHour.open.day]]: {
                                            open: `${openHour.open.time.slice(0, 2)}:${openHour.open.time.slice(2, 4)}`,
                                            close: `${openHour.close.time.slice(0, 2)}:${openHour.close.time.slice(2, 4)}`,
                                        }
                                    }), {})
                                }
                            }

                            if (placeDetail) {
                                const photosList = place.photos?.filter((_, index) => index < 3) || [];
                                placeToBd = {
                                    ...placeToBd,
                                    latitude: place.geometry.location.lat,
                                    longitude: place.geometry.location.lng,
                                    files_ids: [],
                                }

                                if (photosList.length) {
                                    for (let i = 0; i < photosList.length; i++) {
                                        const photoReference = photosList[i].photo_reference;
                                        const id = await getPhotos(photoReference)
                                        if (id) {
                                            placeToBd.files_ids = [...placeToBd.files_ids, id]
                                        }
                                    }
                                }
                            }

                            if (!placeDetail) {
                                placeToBd = {
                                    ...placeToBd,
                                    latitude: place.geometry.location.lat(),
                                    longitude: place.geometry.location.lng(),
                                    files_ids: [],
                                }
                            }


                            const formattedTypeColor = {
                                ...typeColor[GenerationTypeEnums.automatic],
                                ...typeColor[GenerationTypeEnums.manual],
                            }

                            new window.google.maps.Marker({
                                position: {
                                    lat: placeToBd.latitude,
                                    lng: placeToBd.longitude
                                },
                                icon: generateMarker(formattedTypeColor[type]),
                                map: mapRef.current,
                            })

                            console.log(placeToBd)

                            placesToDB = [...placesToDB, placeToBd]

                            if (i + 1 === places.length) {
                                if (pagination && pagination.hasNextPage) {
                                    pagination.nextPage()
                                    return;
                                }

                                await SightService.createBatch(placesToDB)

                                await GenerationPlaceService.create({
                                    country_id: countryId,
                                    geometry,
                                    type
                                })

                                //WRITE TO BS ALL PLACE []
                                console.log(placesToDB, "placesToDB")

                                // socket.emit('pushLog', {
                                //     success: true,
                                //     cityId: cityId,
                                //     sights: placesToDB,
                                //     geometry_square: {
                                //         north: bounds.getNorthEast().lat(), //noth lat
                                //         south: bounds.getSouthWest().lat(), //south lat
                                //         east: bounds.getNorthEast().lng(), //noth lng
                                //         west: bounds.getSouthWest().lng(), //south lng
                                //     },
                                //     type,
                                // });

                                resolve()
                            }
                        } catch (error) {
                            return reject({
                                message: error.message,
                            })
                        }
                    }
                });
            })

            return {failed: false};
        }

        try {
            return await forLoop()
        }
        catch (error) {
            return {
                failed: true,
                message: error.message,
                type: lastType
            };
        }
    }
    const getRectangle = async ({geometry, cityId, type}) => {
        try {
            const {north, south, east, west} = geometry;
            const bounds = new window.google.maps.LatLngBounds();

            bounds.extend(new window.google.maps.LatLng(north, east));
            bounds.extend(new window.google.maps.LatLng(south, west));

            //
            // console.log({
            //     north: bounds.getNorthEast().lat(), //noth lat
            //     south: bounds.getSouthWest().lat(), //south lat
            //     east: bounds.getNorthEast().lng(), //noth lng
            //     west: bounds.getSouthWest().lng(), //south lng
            // })

            if(squareRef.current){
                squareRef.current.setMap(null)
            }

            squareRef.current =  new window.google.maps.Rectangle({
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

            return await getPlaces(bounds, cityId, type)
        } catch (e) {
            // socket.emit('pushLog', {
            //     success: false,
            //     cityId: cityId,
            //     geometry_square: {
            //         north: geometry.north, //noth lat
            //         south: geometry.south, //south lat
            //         east: geometry.east, //noth lng
            //         west: geometry.west, //south lng
            //     },
            //     message: e.message,
            //     type: null,
            // });
            return {
                failed: true,
                message: e.message,
                type: null
            }
        }

    }
    const generatePlacesByCity = async (city, placeTypes = []) => {
        if (!city.geometry || !placeTypes.length) {
            return {failed: false};
        }

        let currentI = 1;
        let currentJ = 1;

        const forLoop = async _ => {
            for(let i = 0; i < placeTypes.length; i++){
                const currentType = placeTypes[i];

                const countStep = PlaceTypeSquareEnum[currentType] || city.generation_count_of_squares;

                const placeHeightCoordinate = city.geometry.north - city.geometry.south;
                const placeWidthCoordinate = city.geometry.east - city.geometry.west;

                const stepHorizontal = placeWidthCoordinate / countStep;
                const stepVertical = placeHeightCoordinate / countStep;

                currentI = 1;
                for (currentI; currentI <= countStep; currentI++) {
                    currentJ = 1;
                    for (currentJ; currentJ <= countStep; currentJ++) {
                        console.log(`index: ${currentI}; jndex ${currentJ}`)
                        await new Promise(resolve => setTimeout(resolve, 500))
                        const {failed, message, type} = await getRectangle(
                            {
                                geometry: {
                                    north: city.geometry.south + (stepVertical * currentI),
                                    east: city.geometry.west + (stepHorizontal * currentJ),
                                    south: city.geometry.south + (stepVertical * (currentI - 1)),
                                    west: city.geometry.west + (stepHorizontal * (currentJ - 1)),
                                },
                                cityId: city.id,
                                type: currentType,
                            }
                        )

                        if (failed) {
                            // socket.emit('pushLog', {
                            //     success: false,
                            //     cityId: city.id,
                            //     geometry_square: {
                            //         north: city.geometry.north, //noth lat
                            //         south: city.geometry.south, //south lat
                            //         east: city.geometry.east, //noth lng
                            //         west: city.geometry.west, //south lng
                            //     },
                            //     indexI: currentI,
                            //     indexJ: currentJ,
                            //     message,
                            //     type,
                            // });

                            return {failed: true}
                        }
                    }
                }
            }

            if(squareRef.current){
                squareRef.current.setMap(null)
            }

            return {failed: false}
        }

        try {
            return await forLoop()
        } catch (e) {
            // socket.emit('pushLog', {
            //     success: false,
            //     cityId: city.id,
            //     geometry_square: {
            //         north: city.geometry.north, //noth lat
            //         south: city.geometry.south, //south lat
            //         east: city.geometry.east, //noth lng
            //         west: city.geometry.west, //south lng
            //     },
            //     message: e.message,
            //     type: null,
            //     indexI: currentI,
            //     indexJ: currentJ,
            // });
            if(squareRef.current){
                squareRef.current.setMap(null)
            }

            return {
                failed: true,
                city_id: city.id,
                message: e.message,
                type: null,
                indexI: currentI,
                indexJ: currentJ,
            };
        }
    }

    const generationFinishCity = async (cityId, generationType, placeTypes) => {
        await GenerationPlaceService.finish({
            "city_id": cityId,
            "generation_type": generationType,
            "types": placeTypes
        })
    }

    const getCountry = async () => {
        const country = await CountryService.show(countryId)
        setCountry(country)
    }

    useEffect(() => {
        getCountry()
    }, [])

    // useEffect(() => {
    //     socket.on('connect', () => {
    //         console.log(socket, "socket")
    //         socket.on('logs', console.log)
    //     });
    // }, [])

    useEffect(() => {
        if(!generationType || !country?.geometry){
            return;
        }

        mapInit(country.geometry)
    }, [generationType, country?.geometry])

    return (
        <div>

            <div style={{display: "flex", gap: 50}}>
                <div ref={mapBlockRef} style={{width: "70%", height: 500}}/>
                <div style={{width: "30%"}}>
                    <RadioGenerationType generationType={generationType}
                                         setGenerationType={setGenerationType}/>
                        <div style={{paddingTop: 20}}>
                            {generationType === GenerationTypeEnums.automatic && (
                                <AutomaticContent typeColor={typeColor[GenerationTypeEnums.automatic]} generationFinishCity={generationFinishCity} generatePlacesByCity={generatePlacesByCity} countryId={countryId}/>
                            )}
                            {generationType === GenerationTypeEnums.manual && (
                                <ManualContent typeColor={typeColor[GenerationTypeEnums.manual]} generationFinishCity={generationFinishCity} generatePlacesByCity={generatePlacesByCity} countryId={countryId} mapRef={mapRef}/>
                            )}
                            {generationType === GenerationTypeEnums.custom && (
                                <CustomContent countryId={countryId} getRectangle={getRectangle} mapRef={mapRef}/>
                            )}
                        </div>
                </div>
            </div>
        </div>
    )
}
