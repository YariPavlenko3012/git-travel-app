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
import ChangeWorkStatus from "./components/ChangeWorkStatus";
/**
 * constant
 */
import {
    ADMIN_MAKE_EDIT_CITY_URI,
    ADMIN_MAKE_SHOW_CITY_URI,
    ADMIN_MAKE_SHOW_COUNTRY_URI
} from "../../../../../constants/admin/uri.constant";
import PreviewFilesOriental from "../../../../../components/PreviewFilesOriental";
import FileOrientationEnums from "../../../../../enums/FileOrientation";

export default function CityTable({cityList, getCity}) {
    const history = useHistory();
    const columns = useMemo(() => ([
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Images',
            dataIndex: 'img',
            key: 'img',
            render: (_, city) => {
                return (
                    <div style={{display: "flex", gap: 10}}>
                        <PreviewFilesOriental oriental={FileOrientationEnums.landscape} image={city.landscape_image} height={40}/>
                        <PreviewFilesOriental oriental={FileOrientationEnums.portrait} image={city.portrait_image} height={40}/>
                    </div>
                )
            }
        },
        {
            title: 'City name',
            dataIndex: 'name',
            key: 'name',
            ...SearchInputForTable(),
            render: (_, row) => <Link to={ADMIN_MAKE_SHOW_CITY_URI(row.id)} style={{color: row.name ? "#0d6efd" : "red"}}>{row.name || "No name"}</Link>
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
            ...SearchInputForTable(),
            render: (_, city) => {
                return <Link to={ADMIN_MAKE_SHOW_COUNTRY_URI(city?.state?.country?.id)} style={{color: city?.state?.country?.name ? "#0d6efd" : "red"}}>{city?.state?.country?.name || "No name"}</Link>
            }
        },
        {
            title: 'Work Status',
            dataIndex: 'work_status',
            key: 'work_status',
            render: (_, city) => <ChangeWorkStatus cityId={city.id}/>
        },
        {
            title: 'Image count',
            dataIndex: 'images',
            key: 'images',
            render: images => <div style={{color: images.length ? "#0d6efd" : "red"}}>{images.length || 0}</div>,
        },
        {
            title: 'Taxi name',
            dataIndex: 'cab_name',
            key: 'cab_name',
            render: (_, row) => row.cabs.length ? row.cabs.map(({name}) => name || "-").join(",") : "-"
        },
        {
            title: 'Taxi phone',
            dataIndex: 'cab_phone_number',
            key: 'cab_phone_number',
            render: (_, row) => row.cabs.length ? row.cabs.map(({phone_number}) => phone_number || "-").join(",") : "-"
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, row) => (
              <Space size={10}>
                  <Tooltip title="Edit city">
                      <Button type="primary" onClick={() => history.push(ADMIN_MAKE_EDIT_CITY_URI(row.id))}
                              icon={<EditOutlined/>} size={20}/>
                  </Tooltip>
                  <Tooltip title="View city">
                      <Button type="primary" onClick={() => history.push(ADMIN_MAKE_SHOW_CITY_URI(row.id))}
                              icon={<EyeOutlined/>} size={20}/>
                  </Tooltip>
              </Space>
            )
        },
    ]), []);

    return (
      <Table data={cityList || []}
             columns={columns}
             fetchingData={getCity}
             loader={!cityList}
      />
    )
}
