/**
 * external libs
 */
import React, {useMemo, useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import {Button, Checkbox, Space, Tooltip} from 'antd'
import {EditOutlined, EyeOutlined} from '@ant-design/icons'
/**
 * components
 */
import Table from '../../../../../components/Table'
import SearchInputForTable from '../../../../../components/Table/utils/search'
/**
 * constant
 */
import {
    ADMIN_MAKE_EDIT_SIGHT_URI,
    ADMIN_MAKE_SHOW_CITY_URI,
    ADMIN_MAKE_SHOW_SIGHT_URI
} from "../../../../../constants/admin/uri.constant";
import PlaceTypeTranslate from "../../../../../utils/PlaceTypeTranslate";

export default function SightTable({sightList, getSight}) {
    const [withPlaceType, setWithPlaceType] = useState(true);
    const history = useHistory();
    const columns = useMemo(() => ([
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, sight) => <Link to={ADMIN_MAKE_SHOW_SIGHT_URI(sight.id)}
                                        style={{color: sight.name ? "#0d6efd" : "red"}}>{sight.name || "No name"}</Link>,
            ...SearchInputForTable()
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: description => <div>{description || "N/A"}</div>
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
            render: city => {
                if(!city){
                    return null
                }
                return <Link to={ADMIN_MAKE_SHOW_CITY_URI(city.id)} style={{color: city.name ? "#0d6efd" : "red"}}>{city.name || "No name"}</Link>
            },
        },
        {
            title: "Coordinate",
            dataIndex: 'coordinate',
            key: 'coordinate',
            render: (_, sight) => (
                <div>
                    {sight.latitude || "-"}
                    {" / "}
                    {sight.longitude || "-"}
                </div>
            )
        },
        {
            title: () => (
                <div style={{display: "flex", gap: 10}}>
                    Place type
                    <Checkbox checked={withPlaceType} onChange={() => setWithPlaceType(!withPlaceType)} />
                </div>
            ),
            dataIndex: 'place_type',
            key: 'place_type',
            render: place_type => <div>{place_type.map( type => PlaceTypeTranslate.getTranslateForType(type)).join(", ")}</div>,
        },
        {
            title: 'Formatted address',
            dataIndex: 'formatted_address',
            key: 'formatted_address',
            render: formatted_address => <div>{formatted_address || "N/A"}</div>
        },
        {
            title: 'Website',
            dataIndex: 'website',
            key: 'website',
            render: website => <div>{website || "N/A"}</div>
        },
        {
            title: 'Phone number',
            dataIndex: 'international_phone_number',
            key: 'international_phone_number',
            render: international_phone_number => <div>{international_phone_number || "N/A"}</div>
        },
        {
            title: 'Image count',
            dataIndex: 'images',
            key: 'images',
            render: images => <div style={{color: images.length ? "#0d6efd" : "red"}}>{images.length || 0}</div>,
        },
        {
            title: 'Number of view',
            dataIndex: 'number_of_views',
            key: 'number_of_views',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, row) => (
              <Space size={10}>
                  <Tooltip title="Edit sight">
                      <Button type="primary" onClick={() => history.push(ADMIN_MAKE_EDIT_SIGHT_URI(row.id))}
                              icon={<EditOutlined/>} size={20}/>
                  </Tooltip>
                  <Tooltip title="View sight">
                      <Button type="primary" onClick={() => history.push(ADMIN_MAKE_SHOW_SIGHT_URI(row.id))}
                              icon={<EyeOutlined/>} size={20}/>
                  </Tooltip>
              </Space>
            )
        },
    ]), [withPlaceType]);

    const getSightHandler = async (params) => {
        await getSight({
            ...(!withPlaceType && {isNull: 'place_type'}),
            ...params,
        })
    }

    useEffect(() => {
        getSightHandler()
    }, [withPlaceType])

    return (
      <Table data={sightList || []}
             columns={columns}
             fetchingData={getSightHandler}
             loader={!sightList}
      />
    )
}
