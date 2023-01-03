/**
 * external libs
 */
import React, {useMemo, useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom'
import {Button, Space, Tooltip} from 'antd'
import {EditOutlined, EyeOutlined, RollbackOutlined} from '@ant-design/icons'
/**
 * components
 */
import Table from '../../../../../components/Table'
import SearchInputForTable from '../../../../../components/Table/utils/search'
/**
 * constant
 */
import {
    ADMIN_MAKE_EDIT_COUNTRY_URI, ADMIN_MAKE_EXCURSION_CREATE,
    ADMIN_MAKE_SHOW_CITY_URI,
    ADMIN_MAKE_SHOW_COUNTRY_URI,
    ADMIN_MAKE_SHOW_CURRENCY_URI,
    ADMIN_MAKE_SHOW_LANGUAGE_URI
} from "../../../../../constants/admin/uri.constant";
import CountryService from "../../../../../services/admin/country.service";
import {QueryString} from "../../../../../utils/Querystring";

export default function CountryTable({searchParams}) {
    const [countries, setCountries] = useState(null);
    const [isReady, setIsReady] = useState(false);
    const history = useHistory();
    const columns = useMemo(() => ([
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Country name',
            dataIndex: 'name',
            key: 'name',
            render: (name, row) => <Link to={ADMIN_MAKE_SHOW_COUNTRY_URI(row.id)}
                                         style={{color: name?.length ? "#0d6efd" : "red"}}>{name || "No name"}</Link>,
            ...SearchInputForTable()
        },
        {
            title: 'Country code',
            dataIndex: 'country_code_in_iso_3166_1_format',
            key: 'country_code_in_iso_3166_1_format',
        },
        {
            title: 'Capital',
            dataIndex: 'capital',
            key: 'capital',
            ...SearchInputForTable(),
            render: capital => {
                if(capital?.id) {
                    return (
                      <Link to={ADMIN_MAKE_SHOW_CITY_URI(capital.id)} style={{color: capital.name ? "#0d6efd" : "red"}}>
                          {capital.name || "No name"}
                      </Link>
                    )
                }

                return <div style={{color: "red"}}>N/A</div>
            },
        },
        {
            title: 'Image count',
            dataIndex: 'images',
            key: 'images',
            render: images => <div style={{color: images.length ? "#0d6efd" : "red"}}>{images.length || 0}</div>,
        },
        {
            title: 'Currency',
            dataIndex: 'currency',
            key: 'currency',
            render: currency => <Link to={ADMIN_MAKE_SHOW_CURRENCY_URI(currency.id)}>{currency.currency_code}</Link>,
        },
        {
            title: 'Official language',
            dataIndex: 'official_language',
            key: 'official_language',
            render: official_language => <Link
              to={ADMIN_MAKE_SHOW_LANGUAGE_URI(official_language.id)}>{official_language.name}</Link>,
        },
        {
            title: 'Population',
            dataIndex: 'population',
            key: 'population',
        },
        {
            title: 'Country area',
            dataIndex: 'country_area',
            key: 'country_area',
        },
        {
            title: 'Safety index',
            dataIndex: 'safety_index',
            key: 'safety_index',
        },
        {
            title: 'Happiness rating',
            dataIndex: 'happiness_rating',
            key: 'happiness_rating',
        },
        {
            title: 'Has seas',
            dataIndex: 'has_seas',
            key: 'has_seas',
            render: value => value.toString()
        },
        {
            title: 'Has mountains',
            dataIndex: 'has_mountains',
            key: 'has_mountains',
            render: value => value.toString()
        },
        {
            title: 'Highest point',
            dataIndex: 'highest_point',
            key: 'highest_point',
        },
        {
            title: 'Emergency number',
            dataIndex: 'ambulance_number',
            key: 'ambulance_number',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, row) => (
              <Space size={10}>
                  <Tooltip title="View country">
                      <Button type="primary" onClick={() => history.push(ADMIN_MAKE_SHOW_COUNTRY_URI(row.id))}
                              icon={<EyeOutlined/>} size={20}/>
                  </Tooltip>
                  <Tooltip title="Edit country">
                      <Button type="primary" onClick={() => history.push(ADMIN_MAKE_EDIT_COUNTRY_URI(row.id))}
                              icon={<EditOutlined/>} size={20}/>
                  </Tooltip>
                  <Tooltip title="Create excursion">
                      <Button type="primary" onClick={() => history.push(ADMIN_MAKE_EXCURSION_CREATE(row.id))}
                              icon={<RollbackOutlined/>} size={20}/>
                  </Tooltip>
              </Space>
            )
        },
    ]), []);

    const getCountry = async (params = {}) => {
        const copyParams = JSON.parse(JSON.stringify(params));

        if(copyParams.filters) {
            if(copyParams.filters.name) {
                copyParams.country_name = copyParams.filters.name[0];
            }

            if(copyParams.filters.capital) {
                copyParams.city_name = copyParams.filters.capital[0];
            }
        }

        return await CountryService.list(copyParams)
    };

    const getCountryHandler = async (params) => {
        setIsReady(false)
        setCountries(await getCountry({
            ...QueryString.parseQueryString("?" + (window.location.hash.split("?")[1] || "")),
            ...searchParams,
            ...params,
        }))
        setIsReady(true)
    }

    useEffect(() => {
        getCountryHandler()
    }, [])

    if(!countries){
        return <div>Loader...</div>
    }

    return (
      <Table data={countries}
             columns={columns}
             fetchingData={getCountryHandler}
             loader={!isReady}
      />
    )
}
