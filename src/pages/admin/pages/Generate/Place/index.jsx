/**
 * external libs
 */
import React, {useContext, useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
/**
 * components
 */
import ManualContent from './components/ManualContent'
import CustomContent from './components/CustomContent'
import RadioGenerationType from './components/RadioGenerationType'
/**
 * enums
 */
import GenerationTypeEnums from "../../../../../enums/GenerationType";
import FoursquarePlaceTypeEnum from "../../../../../enums/FoursquarePlaceType";
/**
 * service
 */
import GenerationPlaceService from "../../../../../services/admin/generationPlace.service";
import SightService from "../../../../../services/admin/sight.service";
import CountryService from "../../../../../services/admin/country.service";
/**
 * utils
 */
import GoogleClient from "../../../../../utils/GoogleClient";
import FoursquareClient from "../../../../../utils/FoursquareClient";

export default function GeneratePlace() {
    const {countryId} = useParams();
    const [generationType, setGenerationType] = useState(GenerationTypeEnums.manual)
    const [country, setCountry] = useState(null)
    const [loading, setLoading] = useState(false)
    const mapBlockRef = useRef(null);
    const squareRef = useRef(null);
    const mapRef = useRef(null);

    console.log(country, "country")

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

    const generatePlacesByCity = async (city, placeTypes = [], limit) => {
        setLoading(true)
        console.log('HERE 2')
        if (!city.geometry || !placeTypes.length) {
            return {failed: false};
        }
        console.log('HERE 3')
        let currentI = 1;
        let currentJ = 1;

        const forLoop = async _ => {
            for (let i = 0; i < placeTypes.length; i++) {
                const currentType = placeTypes[i];

                //Берем колл-во квадратов по которым ходим. Есть значения захардкодженые, а есть с базы
                let countStep = 1;

                //Ширина и Высота квадрата по которому идем (сити геометрия)
                const placeHeightCoordinate = city.geometry.north - city.geometry.south;
                const placeWidthCoordinate = city.geometry.east - city.geometry.west;

                //Делим этот квадрат (сити геометрию) на колл-во шагов
                const stepHorizontal = placeWidthCoordinate / countStep;
                const stepVertical = placeHeightCoordinate / countStep;
                console.log('HERE 4')

                currentI = 1;
                for (currentI; currentI <= countStep; currentI++) {
                    currentJ = 1;
                    for (currentJ; currentJ <= countStep; currentJ++) {

                        await new Promise(resolve => setTimeout(resolve, 500))

                        //Берем один текузий квадрат
                        const {failed, message, type} = await getRectangle(
                            {
                                geometry: {
                                    north: city.geometry.south + (stepVertical * currentI),
                                    east: city.geometry.west + (stepHorizontal * currentJ),
                                    south: city.geometry.south + (stepVertical * (currentI - 1)),
                                    west: city.geometry.west + (stepHorizontal * (currentJ - 1)),
                                },
                                city: city,
                                type: currentType,
                                limit,
                            }
                        )

                        console.log('HERE 5')

                        if (failed) {
                            return {failed: true}
                        }
                    }
                }
            }
            console.log('HERE 6')

            if (squareRef.current) {
                squareRef.current.setMap(null)
            }

            return {failed: false}
        }

        try {
            return await forLoop()
        } catch (e) {
            if (squareRef.current) {
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
    const getRectangle = async ({geometry, city, type, limit, countStep}) => {
        try {
            //Получение геометрии квадрата, его отрисовка на UI
            console.log('HERE 7')

            const {north, south, east, west} = geometry;
            const bounds = GoogleClient.getBounds(north, south, east, west)

            if (squareRef.current) {
                squareRef.current.setMap(null)
            }

            squareRef.current = GoogleClient.getRectangle(
                mapRef.current,
                GoogleClient.parseBounds(bounds)
            );

            console.log('HERE 8')

            //После получения и отрисовски всех данных идем получать плейсы
            return await getPlaces(bounds, city, type, limit)
        } catch (e) {
            return {
                failed: true,
                message: e.message,
                type: null
            }
        }

    }
    const getPlaces = async (bounds, city, foursquareType, limit) => {
        let lastType = null;

        console.log('10')

        const forLoop = async () => {
            lastType = foursquareType
            console.log('11')

            const type = Object.keys(FoursquarePlaceTypeEnum.typeOriginIds).reduce((accum, type) => {
                const foursquareIdsForType = FoursquarePlaceTypeEnum.typeOriginIds[type]
                if (foursquareIdsForType.includes(foursquareType)) {
                    return type
                }

                return accum
            }, null)

            console.log('12')

            const geometry = GoogleClient.parseBounds(bounds)
            console.log('13')

            const isGenerate = await GenerationPlaceService.generatedSquare({
                json: {geometry},
                eq: {type: [foursquareType]}
            })
            console.log('14')

            if (isGenerate.data.length) {
                return {failed: false};
            }
            console.log('15')

            await new Promise(async (resolve, reject) => {
                console.log('16')

                let placesToDB = []
                const places = await FoursquareClient.getPlaces({
                    categories: foursquareType,
                    ne: `${geometry.north},${geometry.east}`,
                    sw: `${geometry.south},${geometry.west}`,
                    limit: limit
                })
                console.log('17')


                if (!places.length) {
                    await GenerationPlaceService.create({
                        country_id: countryId,
                        geometry,
                        type: `${foursquareType}`
                    });
                    resolve()
                }
                console.log('18')

                for (let i = 0; i < places.length; i++) {
                    try {
                        const place = places[i]

                        let placeToBd = {
                            city_id: city.id,
                            country_id: countryId,
                            translatable: {
                                name: place.name
                            },
                            original_name: place.name,
                            formatted_address: place.location.formatted_address,
                            foursquare_place_id: place.fsq_id,
                            check_coordinates: false,
                            place_type: [type],
                            latitude: place.geocodes.main.latitude,
                            longitude: place.geocodes.main.longitude,
                        }
                        console.log('19')

                        await new Promise(resolve => setTimeout(resolve, 200))

                        placeToBd.files_ids = await FoursquareClient.getPhotosId(placeToBd.foursquare_place_id)

                        const placeDetails = await FoursquareClient.getPlacesDetails(placeToBd.foursquare_place_id, ["tel", "website", "hours"])

                        if (placeDetails) {
                            placeToBd.website = placeDetails?.website || null;
                            placeToBd.international_phone_number = placeDetails?.tel || null;
                            placeToBd.opening_hours = placeDetails?.opening_hours || null;
                        }
                        console.log('20')

                        GoogleClient.getMarker(
                            mapRef.current,
                            {lat: placeToBd.latitude, lng: placeToBd.longitude},
                        )

                        placesToDB = [...placesToDB, placeToBd]
                    } catch (error) {
                        return reject({
                            message: error.message,
                        })
                    }
                }

                await SightService.createBatch({sights: placesToDB.filter(place => place.files_ids.length)})
                console.log('21')

                await GenerationPlaceService.create({
                    country_id: countryId,
                    geometry,
                    type: `${foursquareType}`
                })

                resolve()
            })
        }

        try {
            return await forLoop()
        } catch (error) {
            return {
                failed: true,
                message: error.message,
                type: lastType
            };
        }
    }

    const generationFinishCity = async (cityId, generationType, placeTypes) => {
        await GenerationPlaceService.finish({
            city_id: cityId,
            generation_type: generationType,
            types: placeTypes
        })
    }

    const getCountry = async () => {
        const country = await CountryService.show(countryId)
        setCountry(country)

        return country
    }

    useEffect(() => {
        getCountry()
    }, [])

    useEffect(() => {
        console.log(generationType, "generationType")
        console.log(country?.geometry, "country?.geometry")
        if (!generationType || !country?.geometry) {
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
                        {generationType === GenerationTypeEnums.manual && (
                            <ManualContent generationFinishCity={generationFinishCity}
                                           generatePlacesByCity={generatePlacesByCity}
                                           countryId={countryId}
                                           setLoading={setLoading}
                                           mapRef={mapRef}/>
                        )}
                        {generationType === GenerationTypeEnums.custom && (
                            <CustomContent countryId={countryId} getRectangle={getRectangle} mapRef={mapRef}/>
                        )}
                    </div>
                    {loading && (
                        <svg xmlns="http://www.w3.org/2000/svg"
                             version="1.0" width="64px" height="64px"
                             viewBox="0 0 128 128" >
                            <rect x="0" y="0" width="100%" height="100%" fill="#f0f2f5"/>
                            <g>
                                <path
                                    d="M64 128A64 64 0 0 1 18.34 19.16L21.16 22a60 60 0 1 0 52.8-17.17l.62-3.95A64 64 0 0 1 64 128z"
                                    fill="#000000"/>
                                <animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64"
                                                  dur="1400ms" repeatCount="indefinite"/>
                            </g>
                        </svg>
                    )}
                </div>
            </div>
        </div>
    )
}
