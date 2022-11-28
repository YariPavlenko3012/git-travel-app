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
import FilesService from "../../../../services/files.service";

export default function GeneratePlace() {
    const [placeTypes, setPlaceTypes] = useState(PlaceTypeTranslate.getTranslateForType(PlaceTypeEnum.googleTypesList[0]))
    const mapBlockRef = useRef(null);
    const mapRef = useRef(null);
    const key = "AIzaSyApPL4vfjbQ_iVFrfE-97KN-ncf8i1NDLU";

    const mapInit = () => {
        const opt = {
            center: {lat: 51.514316, lng: -0.129761},
            zoom: 4,
            restriction: {
                // latLngBounds: {
                //     north: 50.590798, //noth lat up
                //     east: 30.825941, //noth lng right
                //     south: 50.213273, //south lat down
                //     west: 30.2394401, //south lng left
                // },
                strictBounds: true
            },
        }

        mapRef.current = new window.google.maps.Map(mapBlockRef.current, opt)


        //KIYV
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


        //LVIV
        new window.google.maps.Rectangle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            map: mapRef.current,
            bounds: {
                north: 49.897471, //noth lat
                south: 49.7679071, //south lat
                east: 24.118191, //noth lng
                west: 23.9062801, //south lng
            },
        });


        const marker = new window.google.maps.Marker({
            position: {
                lat: 51.4662711,
                lng: 30.5134968
            },
            map: mapRef.current,
        })
    }


    const getPhotos = async (photo_ref) => {
        const proxyUrl = "https://cors-anywhere.herokuapp.com/";
        await new Promise(resolve => setTimeout(resolve, 700))
        const imageURLQuery = await fetch(proxyUrl + `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&sensor=false&maxheight=800&photo_reference=${photo_ref}&key=${key}`)
            .then(r => r.blob())
            .catch(console.error);

        const image = URL.createObjectURL(imageURLQuery); //declared earlier

        const response = await fetch(image);
        // here image is url/location of image
        const blob = await response.blob();
        const formData = new FormData;
        formData.append("files[]", new File([blob], 'image.jpg', {type: blob.type}));

        const [file] = await FilesService.upload(formData)

        return file.id
    }

    const getPlaces = async (bounds) => {
        const service = new window.google.maps.places.PlacesService(mapRef.current);

        const forLoop = async _ => {
            for (let i = 0; i < PlaceTypeEnum.googleTypesList.length; i++) {
                if(i !== 0){
                    return;
                }
                console.log(i)
                // const type = PlaceTypeEnum.googleTypesList[i]; // amusement_park
                const type = PlaceTypeEnum.restaurant; // amusement_park

                const requestNearbySearch = {
                    bounds,
                    types: [type],
                };

                let placesToDB = [];
                await new Promise(resolve => setTimeout(() => resolve(), 500))
                await new Promise((resolve, reject) => {
                    service.nearbySearch(requestNearbySearch, async (places, status, pagination) => {
                        if(!places.length || status === "OVER_QUERY_LIMIT"){
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
                                        'geometry',
                                        'name',
                                        'place_id',
                                        'vicinity',
                                    ]
                                };
                                const placeDetailRes = (await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${requestDetailPlace.placeId}&fields=${requestDetailPlace.fields.join(",")}&key=${key}`)).json()
                                const placeDetail = await placeDetailRes
                                const place = placeDetail ? placeDetail.result : currentPlace;

                                if (!place) {
                                    return null
                                }

                                let placeToBd = {
                                    website: place.website || null,
                                    international_phone_number: place.international_phone_number || null,
                                    name: place.name,
                                    vicinity: place.vicinity,
                                    opening_hours: place.opening_hours?.periods || null,
                                    formatted_address: place.formatted_address,
                                    google_place_id: place.place_id,
                                    types: place.types,
                                }

                                if (placeDetail) {
                                    const photosList = place.photos?.filter((_, index) => index < 3) || [];
                                    placeToBd = {
                                        ...placeToBd,
                                        latitude: place.geometry.location.lat,
                                        longitude: place.geometry.location.lng,
                                        photos: [],
                                    }

                                    if (photosList.length) {
                                        for (let i = 0; i < photosList.length; i++) {
                                            const photoReference = photosList[i].photo_reference;
                                            placeToBd.photos = [...placeToBd.photos, await getPhotos(photoReference)]
                                        }
                                    }
                                }

                                if (!placeDetail) {
                                    placeToBd = {
                                        ...placeToBd,
                                        latitude: place.geometry.location.lat(),
                                        longitude: place.geometry.location.lng(),
                                        photos: [],
                                    }
                                }

                                new window.google.maps.Marker({
                                    position: {
                                        lat: placeToBd.latitude,
                                        lng: placeToBd.longitude
                                    },
                                    label: placeToBd.name,
                                    map: mapRef.current,
                                })

                                placesToDB = [...placesToDB, placeToBd]

                                if (i + 1 === places.length) {
                                    if (pagination && pagination.hasNextPage) {
                                        console.log("paginatoopn")
                                        pagination.nextPage()
                                        return ;
                                    }

                                    console.log(placesToDB, "placesToDB")
                                    placesToDB.forEach((_place, index) => {
                                        console.log(`#${index}   Name: ${_place.name}   Types: ${JSON.stringify(_place.types)}`)
                                    })
                                    resolve()
                                }


                                // service.getDetails(requestDetailPlace, (placeDetails, status) => {
                                //     const place = placeDetails || currentPlace;
                                //
                                //     if(!place){
                                //         return null
                                //     }
                                //
                                //     console.log(place)
                                //
                                //     placesToDB = [...placesToDB, {
                                //         photos: place.photos?.filter((_, index) => index < 5).map(photo => photo.getUrl()) || null,
                                //         website: place.website || null,
                                //         international_phone_number: place.international_phone_number || null,
                                //         name: place.name,
                                //         geometry: {
                                //             location: {
                                //                 latitude: place.geometry.location.lat(),
                                //                 longitude: place.geometry.location.lng(),
                                //             },
                                //             viewport: {
                                //                 northeast: {
                                //                     latitude: place.geometry.viewport.getNorthEast().lat(),
                                //                     longitude: place.geometry.viewport.getNorthEast().lng()
                                //                 },
                                //                 southwest: {
                                //                     latitude: place.geometry.viewport.getSouthWest().lat(),
                                //                     longitude: place.geometry.viewport.getSouthWest().lng()
                                //                 },
                                //             }
                                //         },
                                //         vicinity: place.vicinity,
                                //         opening_hours: place.opening_hours?.periods || null,
                                //         formatted_address: place.formatted_address,
                                //         description: place.editorial_summary?.overview || "",
                                //         google_place_id: place.place_id,
                                //     }]
                                //     // if (pagination && pagination.hasNextPage) {
                                //     //     pagination.nextPage()
                                //     // }
                                //     console.log(index, "index")
                                //     if(index + 1 === places.length){
                                //         console.log(placesToDB, "placesToDB")
                                //     }
                                // });
                            }
                            catch (e){
                                return reject("reject")
                            }
                        }
                    });
                })
            }
        }

        await forLoop()
    }
    const getRectangle = async (north, east, south, west) => {
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

        // await getPlaces(bounds)
        await getPlaces(bounds)
    }
    const generatePlacesByCity = (north, east, south, west) => {
        const countStep = 2;

        const city = {
            north, //noth lat up
            east, //noth lng right
            south, //south lat down
            west, //south lng left
        }

        const placeHeightCoordinate = city.north - city.south;
        const placeWidthCoordinate = city.east - city.west;

        const stepHorizontal = placeWidthCoordinate / countStep;
        const stepVertical = placeHeightCoordinate / countStep;

        const forLoop = async _ => {
            let currentI = 1;
            let currentJ = 1;
            try {
                for (currentI; currentI <= countStep; currentI++) {
                    currentJ = 1;
                    for (currentJ; currentJ <= countStep; currentJ++) {
                        console.log(`index: ${currentI}; jndex ${currentJ}`)
                        await new Promise(resolve => setTimeout(resolve, 50))
                        await getRectangle(city.south + (stepVertical * currentI), city.west + (stepHorizontal * currentJ), city.south + (stepVertical * (currentI - 1)), city.west + (stepHorizontal * (currentJ - 1)))
                    }
                }
            }
            catch (e){
                console.log("loop")
                console.log(e, "1234")
            }
        }

        forLoop()
    }


    useEffect(() => {
        // getGeometryForCity()
        mapInit()
        // generatePlacesByCityTEST(49.897471, 24.118191, 49.7679071, 23.9062801)
        // getRectangle(49.897471 ,24.118191, 49.7679071, 23.9062801)
        // getPlaceHandler2();
    }, [])

    return (
        <div>
            <div onClick={generatePlacesByCity}>
                Get place
            </div>
            <PlaceType setPlaceTypes={setPlaceTypes} placeTypes={placeTypes}/>
            <div ref={mapBlockRef} style={{width: "100%", height: 500}}/>
        </div>
    )
}
