/**
 * external libs
 */
import React, {useMemo} from 'react';
import {Link, useHistory} from 'react-router-dom'
import {Button, Space, Tooltip} from 'antd'
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

export default function SightTable({sightList, getSight}) {
    const history = useHistory();
    const columns = useMemo(() => ([
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: name => <div style={{color: name ? "black" : "red"}}>{name || "No name"}</div>
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: description => <div style={{color: description ? "black" : "red"}}>{description || "No description"}</div>
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
            render: city => <Link to={ADMIN_MAKE_SHOW_CITY_URI(city.id)} style={{color: city.name ? "#0d6efd" : "red"}}>{city.name || "No name"}</Link>,
            ...SearchInputForTable()
        },
        {
            title: 'Latitude',
            dataIndex: 'latitude',
            key: 'latitude',
        },
        {
            title: 'Longitude',
            dataIndex: 'longitude',
            key: 'longitude',
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
    ]), []);

    return (
      <Table data={sightList || []}
             columns={columns}
             fetchingData={getSight}
             loader={!sightList}
      />
    )
}
