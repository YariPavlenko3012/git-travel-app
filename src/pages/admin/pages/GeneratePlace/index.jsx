/**
 * external libs
 */
import React, {useEffect, useRef, useContext, useState} from 'react';
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
import PlaceTypeSquareEnum from "../../../../enums/PlaceTypeSquare";
/**
 * service
 */
import GenerationPlaceService from "../../../../services/admin/generationPlace.service";
import SightService from "../../../../services/admin/sight.service";
import CountryService from "../../../../services/admin/country.service";
/**
 * context
 */
import {DictionaryContext} from "../../../context/dictionary.context";
import GoogleClient from "../../../../utils/GoogleClient";


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

export default function GeneratePlace() {
    const {dictionary} = useContext(DictionaryContext)
    const {countryId} = useParams();
    const [generationType, setGenerationType] = useState(GenerationTypeEnums.automatic)
    const [country, setCountry] = useState(null)
    const mapBlockRef = useRef(null);
    const squareRef = useRef(null);
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

    const generatePlacesByCity = async (city, placeTypes = []) => {
        if (!city.geometry || !placeTypes.length) {
            return {failed: false};
        }

        let currentI = 1;
        let currentJ = 1;

        const forLoop = async _ => {
            for (let i = 0; i < placeTypes.length; i++) {
                const currentType = placeTypes[i];

                //Берем колл-во квадратов по которым ходим. Есть значения захардкодженые, а есть с базы
                const countStep = PlaceTypeSquareEnum[currentType] || city.generation_count_of_squares;

                //Ширина и Высота квадрата по которому идем (сити геометрия)
                const placeHeightCoordinate = city.geometry.north - city.geometry.south;
                const placeWidthCoordinate = city.geometry.east - city.geometry.west;

                //Делим этот квадрат (сити геометрию) на колл-во шагов
                const stepHorizontal = placeWidthCoordinate / countStep;
                const stepVertical = placeHeightCoordinate / countStep;

                currentI = 1;
                for (currentI; currentI <= countStep; currentI++) {
                    currentJ = 1;
                    for (currentJ; currentJ <= countStep; currentJ++) {
                        console.log(`index: ${currentI}; jndex ${currentJ}`)

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
                                cityId: city.id,
                                type: currentType,
                            }
                        )

                        if (failed) {
                            return {failed: true}
                        }
                    }
                }
            }

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
    const getRectangle = async ({geometry, cityId, type}) => {
        try {
            //Получение геометрии квадрата, его отрисовка на UI
            const {north, south, east, west} = geometry;
            const bounds = GoogleClient.getBounds(north, south, east, west)

            if (squareRef.current) {
                squareRef.current.setMap(null)
            }

            squareRef.current = GoogleClient.getRectangle(
                mapRef.current,
                GoogleClient.parseBounds(bounds)
            );

            //После получения и отрисовски всех данных идем получать плейсы
            return await getPlaces(bounds, cityId, type)
        } catch (e) {
            return {
                failed: true,
                message: e.message,
                type: null
            }
        }

    }
    const getPlaces = async (bounds, cityId, type) => {
        //Инициализация гугл сервиса по получению плейсов
        const service = new window.google.maps.places.PlacesService(mapRef.current);
        let lastType = null;

        const forLoop = async () => {
            let placesToDB = [];
            const geometry = GoogleClient.parseBounds(bounds)
            lastType = type;

            const requestNearbySearch = {bounds, types: [type]}
            await new Promise(resolve => setTimeout(() => resolve(), 1000))

            //Проверяем был ли сгинерирован квадрат ранее (чтобы не создавать дубликаты)
            const isGenerate = await GenerationPlaceService.generatedSquare({
                json: {geometry},
                eq: {type}
            })

            if (isGenerate.data.length) {
                return {failed: false};
            }

            await new Promise((resolve, reject) => {
                //Получения плейсов в текущем квадрате с которым работаем
                service.nearbySearch(requestNearbySearch, async (places, status, pagination) => {
                    if (!["ZERO_RESULTS", "OK"].includes(status)) {
                        reject({
                            message: `Google status error: ${status}`,
                        })
                    }

                    if (!places.length) {
                        //Запись в базу о том, в каком квадрате, какой тип плейсов мы достали
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

                            //Получения детайльной информации по плейсу
                            const placeDetail = await GoogleClient.getPlaceDetails(currentPlace.place_id)

                            if (placeDetail?.failed) {
                                return reject({
                                    message: placeDetail.message,
                                })
                            }

                            //Мы можем найти плейс, но по нему не выдадут детальной информации поэтому записываем в плейс
                            //в приоритете  детальный, если его не нашли записываем ту инфу что дали нам ранее
                            const place = placeDetail || currentPlace;

                            if (!place) {
                                continue
                            }

                            //Общая информация у обычного плейса и у детального
                            let placeToBd = {
                                city_id: cityId,
                                country_id: countryId,
                                website: place.website && place.website.length < 255 ? place.website : null,
                                international_phone_number: place.international_phone_number || null,
                                sight_name: place.name,
                                original_name: place.name,
                                formatted_address: place.formatted_address,
                                google_place_id: place.place_id,
                                files_ids: [],
                                place_type: place.types.filter(type => {
                                    return dictionary.place_types.list
                                        .map(({value}) => value)
                                        .includes(type)
                                }),
                                opening_hours: GoogleClient.parseOpeningHours(place.opening_hours?.periods),
                            }


                            //Доп инфа в зависимости от того работаем с детальным плейсом или нет
                            if (placeDetail) {
                                placeToBd = {
                                    ...placeToBd,
                                    latitude: place.geometry.location.lat,
                                    longitude: place.geometry.location.lng,
                                    files_ids: await GoogleClient.getPhotosId(place.photos),
                                }
                            }

                            //Доп инфа в зависимости от того работаем с детальным плейсом или нет
                            if (!placeDetail) {
                                placeToBd = {
                                    ...placeToBd,
                                    latitude: place.geometry.location.lat(),
                                    longitude: place.geometry.location.lng(),
                                }
                            }


                            //Получаем цвета для маркеров (для понятной отрисовки на UI)
                            const formattedTypeColor = {
                                ...typeColor[GenerationTypeEnums.automatic],
                                ...typeColor[GenerationTypeEnums.manual],
                            }

                            //Генерируем маркер на UI
                            GoogleClient.getMarker(
                                mapRef.current,
                                {lat: placeToBd.latitude, lng: placeToBd.longitude},
                                GoogleClient.generateCustomMarker(formattedTypeColor[type])
                            )

                            console.log(placeToBd)

                            placesToDB = [...placesToDB, placeToBd]

                            if (i + 1 === places.length) {
                                //Если есть пагинация продолжаем брать плейсы дальше
                                if (pagination && pagination.hasNextPage) {
                                    pagination.nextPage()
                                    return;
                                }

                                //Запись всех плейсов в базу
                                await SightService.createBatch(placesToDB)

                                //Запись в базу о том, в каком квадрате, какой тип плейсов мы достали
                                await GenerationPlaceService.create({
                                    country_id: countryId,
                                    geometry,
                                    type
                                })

                                console.log(placesToDB, "placesToDB")

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
            "city_id": cityId,
            "generation_type": generationType,
            "types": placeTypes
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
                        {generationType === GenerationTypeEnums.automatic && (
                            <AutomaticContent typeColor={typeColor[GenerationTypeEnums.automatic]}
                                              generationFinishCity={generationFinishCity}
                                              generatePlacesByCity={generatePlacesByCity} countryId={countryId}/>
                        )}
                        {generationType === GenerationTypeEnums.manual && (
                            <ManualContent typeColor={typeColor[GenerationTypeEnums.manual]}
                                           generationFinishCity={generationFinishCity}
                                           generatePlacesByCity={generatePlacesByCity} countryId={countryId}
                                           mapRef={mapRef}/>
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
