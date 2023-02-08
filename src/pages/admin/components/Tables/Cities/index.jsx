/**
 * external libs
 */
import React, {useEffect, useMemo, useContext, useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import {Button, Space, Tooltip, Popconfirm, Checkbox} from 'antd'
import {EditOutlined, EyeOutlined, DeleteOutlined, RollbackOutlined} from '@ant-design/icons'
/**
 * components
 */
import Table from '../../../../../components/Table'
import UserCan from '../../../../../components/UserCan'
import SearchInputForTable from '../../../../../components/Table/utils/search'
import ChangeWorkStatus from "./components/ChangeWorkStatus";
/**
 * services
 */
import CityService from "../../../../../services/admin/city.service";
/**
 * constant
 */
import {
    ADMIN_MAKE_EDIT_CITY_URI, ADMIN_MAKE_EXCURSION_CREATE,
    ADMIN_MAKE_SHOW_CITY_URI,
    ADMIN_MAKE_SHOW_COUNTRY_URI
} from "../../../../../constants/admin/uri.constant";
import PreviewFilesOriental from "../../../../../components/PreviewFilesOriental";
/**
 * enums
 */
import FileOrientationEnums from "../../../../../enums/FileOrientation";
import RolesEnum from "../../../../../enums/RolesEnum";
import TablesKeyEnum from "../../../../../enums/TablesKey";
/**
 * context
 */
import {AlertContext} from "../../../../context/alert.context";
import {SettingsContext} from "../../../../context/settings.context";
import {QueryString} from "../../../../../utils/Querystring";
import ImageGallery from "../../../../../components/ImageGallery";

export default function CityTable({ searchParams }) {
    const [cities, setCities] = useState(null);
    const {setAlertSuccess} = useContext(AlertContext)
    const {settings} = useContext(SettingsContext)
    const [isReady, setIsReady] = useState(false);
    const [withCoordination, setWithCoordination] = useState(true);
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
                            <ImageGallery images={[city.landscape_image, city.portrait_image]}
                                          renderItem={({file, setImage}) => {
                                              if(file.path === city.landscape_image?.path){
                                                 return <PreviewFilesOriental oriental={FileOrientationEnums.landscape} image={file.path} height={40} onClick={setImage}/>
                                              }

                                              return <PreviewFilesOriental oriental={FileOrientationEnums.portrait} image={file.path} height={40} onClick={setImage}/>

                                          }}>
                            </ImageGallery>
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
            render: (_, city) => <ChangeWorkStatus workStatus={city.work_status} cityId={city.id} getCity={getCityHandler}/>
        },
        {
            dataIndex: 'coordinate',
            key: 'coordinate',
            title: () => (
                <div style={{display: "flex", gap: 10}}>
                    Coordinate
                    <Checkbox checked={withCoordination} onChange={() => setWithCoordination(!withCoordination)} />
                </div>
            ),
            render: (_, city) => (
                <div>
                    {city.latitude || "-"}
                    {" / "}
                    {city.longitude || "-"}
                </div>
            )
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
                  <Tooltip title="View city">
                      <Button type="primary" onClick={() => history.push(ADMIN_MAKE_SHOW_CITY_URI(row.id))}
                              icon={<EyeOutlined/>} size={20}/>
                  </Tooltip>
                  <Tooltip title="Edit city">
                      <Button type="primary" onClick={() => history.push(ADMIN_MAKE_EDIT_CITY_URI(row.id))}
                              icon={<EditOutlined/>} size={20}/>
                  </Tooltip>
                  <Tooltip title="Create excursion">
                      <Button type="primary" onClick={() => history.push(ADMIN_MAKE_EXCURSION_CREATE(row.state.country.id, row.id))}
                              icon={<RollbackOutlined/>} size={20}/>
                  </Tooltip>
                  <UserCan checkRole={RolesEnum.super_admin}>
                      <Popconfirm
                          title="Are you sure to delete this city?"
                          onConfirm={() => deleteCity(row.id)}
                          okText="Yes"
                          cancelText="No"
                      >
                          <Tooltip title="Delete city">
                              <Button type="danger" icon={<DeleteOutlined />} size={20} />
                          </Tooltip>
                      </Popconfirm>
                  </UserCan>
              </Space>
            )
        },
    ]), [withCoordination]);

    const getCity = async (params = {}) => {
        const copyParams = JSON.parse(JSON.stringify(params));

        if (copyParams.filters) {
            if (copyParams.filters.country) {
                copyParams.country_name = copyParams.filters.country[0];
            }

            if (copyParams.filters.name) {
                copyParams.city_name = copyParams.filters.name[0];
            }
        }

        return await CityService.list(copyParams)
    };

    const deleteCity = async (cityId) => {
        await CityService.delete(cityId)
        await getCityHandler();
        setAlertSuccess("City successfully deleted")
    }

    const getCityHandler = async (params) => {
        setIsReady(false)
        setCities(await getCity({
            ...QueryString.parseQueryString("?" + (window.location.hash.split("?")[1] || "")),
            ...settings.table[TablesKeyEnum.city],
            ...(!withCoordination && {isNull: ['latitude', 'longitude']}),
            ...searchParams,
            ...params,
        }))
        setIsReady(true)
    }

    useEffect(() => {
        getCityHandler()
    }, [withCoordination])

    if(!cities){
        return <div>Loader...</div>
    }

    return (
      <Table data={cities}
             tableKey={TablesKeyEnum.city}
             columns={columns}
             fetchingData={getCityHandler}
             loader={!isReady}
      />
    )
}
