/**
 * external libs
 */
import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom'
import {Button, Tabs} from 'antd'
/**
 * components
 */
import CitiesTable from '../../../components/Tables/Cities'
import StatesTable from "../../../components/Tables/States";
import PreviewFilesOriental from '../../../../../components/PreviewFilesOriental';
import SightsTable from "../../../components/Tables/Sights";
import CheckNormalImage from "../../../../../components/CheckNormalImage";
/**
 * services
 */
import CountryService from "../../../../../services/admin/country.service";
import SightService from "../../../../../services/admin/sight.service";
import FilesService from "../../../../../services/files.service";
/**
 * constants
 */
import {
    ADMIN_MAKE_CREATE_STATE_URI,
    ADMIN_MAKE_EDIT_COUNTRY_URI,
    ADMIN_MAKE_EXCURSION_CREATE,
    ADMIN_MAKE_GENERATE_CITY_URI,
    ADMIN_MAKE_GENERATE_PLACE_URI,
    ADMIN_MAKE_SHOW_CITY_URI,
    ADMIN_MAKE_SHOW_CURRENCY_URI
} from "../../../../../constants/admin/uri.constant";
/**
 * context
 */
import {DictionaryContext} from "../../../../context/dictionary.context";
/**
 * style
 */
import styles from '../../../styles/show.module.scss'
/**
 * enum
 */
import FileOrientationEnums from '../../../../../enums/FileOrientation';

export default function CountryShow() {
    const [country, setCountry] = useState(null);
    const {countryId} = useParams();
    const {dictionary} = useContext(DictionaryContext)

    const getCountry = async () => {
        setCountry(await CountryService.show(countryId))
    };

    const deleteAllSights = async () => {
        const {data} = await SightService.list({country_id: countryId, per_page: 500})

        for (let i = 0; i < data.length; i++) {
            const sight = data[i];

            if (+sight.city.state.country.id === +countryId) {
                const imagesId = sight.images.map(({id}) => id)
                if (imagesId.length) {
                    await FilesService.delete({files_ids: imagesId})
                }

                await SightService.delete(sight.id)
            }


            if (i % 50 === 0) {
                console.log(i)
            }
        }
    }

    useEffect(() => {
        getCountry();
    }, []);

    if (!country) {
        return <div>Loader...</div>
    }

    return (
        <div>
            <h3 style={{marginBottom: 20, display: "flex", justifyContent: "space-between"}}>
                <div>
                    {country.name}
                </div>
                <div style={{display: "flex", alignItems: "center", gap: 10}}>
                    {/*<Link to={ADMIN_MAKE_GENERATE_CITY_URI(countryId)}>*/}
                    {/*    <Button type="primary" className={styles.show__btn}>*/}
                    {/*        Generate City*/}
                    {/*    </Button>*/}
                    {/*</Link>*/}
                    <Link to={ADMIN_MAKE_GENERATE_PLACE_URI(countryId)}>
                        <Button type="primary" className={styles.show__btn}>
                            Generate Sight
                        </Button>
                    </Link>
                    <Link to={ADMIN_MAKE_EXCURSION_CREATE(countryId)}>
                        <Button type="primary" className={styles.show__btn}>
                            Create Excursions
                        </Button>
                    </Link>
                    <Link to={ADMIN_MAKE_EDIT_COUNTRY_URI(countryId)}>
                        <Button type="primary" className={styles.show__btn}>
                            Edit Country
                        </Button>
                    </Link>
                </div>
            </h3>
            <div className={styles.show}>
                <div className={styles.show__wrapper}>
                    <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          ID:
                      </span> {country.id}
                    </p>
                    <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Country name:
                      </span>
                        <span style={{color: country?.name ? "black" : "red"}}>
                          {country.name || "No name"}
                      </span>
                    </p>
                    <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Country code:
                      </span> {country.country_code_in_iso_3166_1_format}
                    </p>
                    <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Capital:
                      </span>
                        {country.capital &&
                            <Link to={ADMIN_MAKE_SHOW_CITY_URI(country.capital.id)}
                                  style={{color: country.capital.name ? "#0d6efd" : "red"}}>
                                {country.capital.name || "No name"}
                            </Link>
                        }
                        {!country.capital &&
                            <span style={{color: "red"}}>
                            N/A
                        </span>
                        }
                    </p>
                    <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Currency:
                      </span>
                        <Link to={ADMIN_MAKE_SHOW_CURRENCY_URI(country.currency.id)}>
                            {country.currency.currency_code}
                        </Link>
                    </p>
                    <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Official language:
                      </span>
                        <Link to={ADMIN_MAKE_SHOW_CURRENCY_URI(country.official_language.id)}>
                            {country.official_language.name}
                        </Link>
                    </p>
                    <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Population:
                      </span>
                        {country.population}
                    </p>
                    <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Country area:
                      </span>
                        {country.country_area}
                    </p>
                    <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Safety index:
                      </span>
                        {country.safety_index}
                    </p>
                    <p className={styles.show__item}>
                     <span className={styles.show__item_key}>
                          Happiness rating:
                     </span>
                        {country.happiness_rating}
                    </p>
                    <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Has seas:
                      </span>
                        {country.has_seas ? "Yes" : "No"}
                    </p>
                    <p className={styles.show__item}>
                     <span className={styles.show__item_key}>
                          Has mountains:
                     </span>
                        {country.has_mountains ? "Yes" : "No"}
                    </p>
                    <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Highest point:
                      </span>
                        {country.highest_point}
                    </p>
                    <p className={styles.show__item}>
                      <span className={styles.show__item_key}>
                          Emergency number:
                      </span> {country.ambulance_number}
                    </p>
                </div>
                <div style={{display: "flex", gap: 10, marginBottom: 10}}>
                    <CheckNormalImage url={country.landscape_image?.path}>
                        <PreviewFilesOriental oriental={FileOrientationEnums.landscape}
                                              image={country.landscape_image?.path}
                                              height={100}/>
                    </CheckNormalImage>
                    <CheckNormalImage url={country.portrait_image?.path}>
                        <PreviewFilesOriental oriental={FileOrientationEnums.portrait}
                                              image={country.portrait_image?.path}
                                              height={100}/>
                    </CheckNormalImage>
                </div>
            </div>

            <Tabs type="card">
                <Tabs.TabPane tab="State" key="1">
                    <h3 style={{marginBottom: 20, display: "flex", justifyContent: "space-between"}}>
                        State of {country.name}
                        <Link to={ADMIN_MAKE_CREATE_STATE_URI(countryId)}>
                            <Button type="primary" className={styles.show__btn}>
                                Create state
                            </Button>
                        </Link>
                    </h3>
                    <StatesTable searchParams={{country_id: countryId}}/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="City" key="2">
                    <h3 style={{marginBottom: 20, display: "flex", justifyContent: "space-between"}}>
                        City of {country.name}
                    </h3>
                    <Tabs type="card">
                        {dictionary.work_statuses.city.map(({label, value}) => (
                            <Tabs.TabPane tab={label} key={value}>
                                <CitiesTable searchParams={{country_id: countryId, work_status: value}}/>
                            </Tabs.TabPane>
                        ))}
                    </Tabs>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Sight" key="3">
                    <h3 style={{marginBottom: 20, display: "flex", justifyContent: "space-between"}}>
                        Sights of {country.name}
                    </h3>
                    <Tabs type="card">
                        {dictionary.work_statuses.sight.map(({label, value}) => (
                            <Tabs.TabPane tab={label} key={value}>
                                <SightsTable searchParams={{country_id: countryId, eq: {work_status: [value]}}}/>
                            </Tabs.TabPane>
                        ))}
                    </Tabs>
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}

//
// const getData = async (countryCode) => {
//     for (let i = 0; ; i++) {
//         const {data: states} = await (await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${countryCode}/regions?limit=1&offset=${i}`, {
//             headers: {
//                 'X-RapidAPI-Key': '9b6599ddebmsh70080c0c4b276c4p172c5ajsn58e3d1228228',
//                 'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
//             }
//         })).json()
//         const [state] = states
//         console.log(state, "state")
//
//         if (i === 2) {
//             break
//         }
//     }
// }
// const getData = async (countryCode) => {
//     fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${countryCode}/regions?limit=3&offset=0`, {
//         headers: {
//             'X-RapidAPI-Key': '9b6599ddebmsh70080c0c4b276c4p172c5ajsn58e3d1228228',
//             'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
//         }
//     })
//         .then(res => res.json())
//         .then(res => console.log(res))
// }

// fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/countries/${countryCode}/regions?limit=1&offset=0`)
//     .then(res => res.json())
//     .then(res => {
//         Promise.all(new Array(Math.ceil(res.metadata.totalCount / 5)).fill(1).map((_, index) => {
//             return fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/countries/${countryCode}/regions?limit=5&offset=${index * 5}`)
//                 .then(res => res.json())
//                 .then(res => res)
//         }))
//             .then(res => {
//                 const states = res.reduce((acc, state) => {
//                     return [...acc, ...state.data]
//                 }, [])
//
//                 Promise.all(states.map( ({isoCode}) => {
//
//                     return fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/countries/${countryCode}/regions/${isoCode}/cities?minPopulation=40000&hateoasMode=false&limit=1&offset=0`)
//                         .then(res => res.json())
//                         .then(res => res)
//                 }))
//                     .then(res => {
//                         Promise.all(states.map(({isoCode, name}, index) => {
//                             return Promise.all(new Array(Math.ceil(res[index].metadata.totalCount / 10)).fill(1).map(({metadata}, index) => {
//                                 return fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/countries/${countryCode}/regions/${isoCode}/cities?minPopulation=40000&hateoasMode=false&limit=10&offset=${index * 10}`)
//                                     .then(res => res.json())
//                                     .then(res => res.data.filter(city => city.type === "CITY").map(city => ({
//                                         ...city,
//                                         latitude: city.latitude,
//                                         longitude: city.longitude,
//                                         cityName: city.name.split(" County")[0],
//                                         stateName: name
//                                     })))
//                             }))
//
//                         }))
//                             .then(cities => {
//                                 const results = states.reduce((acc, state) => {
//                                     acc[state.name] = []
//                                     return acc
//                                 }, {})
//
//                                 cities.forEach((currentCitiesList) => {
//                                     currentCitiesList.forEach(currentCities => {
//                                         currentCities.forEach((city) => {
//                                             const {stateName, ...rest} = city;
//                                             results[stateName] = [...results[stateName], rest]
//                                         })
//                                     })
//                                 })
//
//                                 console.log(results)
//                             })
//                     })
//             })
// })


const getData = async (countryCode = "PL", minPopulation = 100000) => {
    const isDemo = false;
    const url = isDemo ? "http://geodb-free-service.wirefreethought.com" : "https://wft-geo-db.p.rapidapi.com"
    const LIMIT_RATE = isDemo ? 10 : 100;

    const headers = {
        'X-RapidAPI-Key': '9b6599ddebmsh70080c0c4b276c4p172c5ajsn58e3d1228228',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
    }
    let states = [];

    for (let i = 0; ; i++) {
        const resultState = await ((await fetch(`${url}/v1/geo/countries/${countryCode}/regions?limit=${LIMIT_RATE}&offset=${LIMIT_RATE * i}`, {
            headers: {
                "Content-Type": "application/json",
                ...headers
            }
        })).json())
        states = [...states, ...resultState.data]

        const totalUploadState = LIMIT_RATE * (i + 1);
        if (totalUploadState >= resultState.metadata.totalCount) {
            break;
        }
    }

    const cities = []

    for (let i = 0; i < states.length; i++) {
        const stateIso = states[i].isoCode;
        for (let j = 0; ; j++) {
            const resultCity = await ((await fetch(`${url}/v1/geo/countries/${countryCode}/regions/${stateIso}/cities?minPopulation=${minPopulation}&hateoasMode=false&limit=${LIMIT_RATE}&offset=${LIMIT_RATE * j}`, {
                headers: {
                    "Content-Type": "application/json",
                    ...headers
                }
            })).json())
            cities[i] = [...(cities[i] || []), ...resultCity.data
                .filter(city => city.type === "CITY")
                .filter(city => !["Białołęka", "Bemowo", "Żoliborz", "Włochy", "Ochota", "Ursus", "Wawer", "Mokotów", "Ursynów", "Wilanów"].includes(city.name))
                .map(city => ({
                    ...city,
                    latitude: city.latitude,
                    longitude: city.longitude,
                    cityName: city.name.split(" County")[0],
                    stateName: states[i].name
                }))]

            const totalUploadState = LIMIT_RATE * (j + 1);
            if (totalUploadState >= resultCity.metadata.totalCount) {
                break;
            }
        }
    }

    const list = states.reduce((acc, state) => {
        acc[state.name] = []
        return acc
    }, {})

    for (let i = 0; i < states.length; i++) {
        const state = states[i];

        list[state.name] = cities[i].map((city) => ({
            latitude: city.latitude,
            longitude: city.longitude,
            name: city.name,
        }))
    }

    console.log("States: ", states)
    console.log("Cities: ", cities.reduce((accum, cities) => [...accum, ...cities], []))
    console.log("List: ", list)
}


