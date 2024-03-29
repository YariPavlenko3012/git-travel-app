/**
 * external libs
 */
import React, {useMemo, useEffect, useContext, useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import {Button, Checkbox, Popconfirm, Space, Tooltip} from 'antd'
import {DeleteOutlined, EditOutlined, ShrinkOutlined, EyeOutlined} from '@ant-design/icons'
/**
 * components
 */
import Table from '../../../../../components/Table'
import SearchInputForTable from '../../../../../components/Table/utils/search'
import UserCan from "../../../../../components/UserCan";
import ChangeWorkStatus from "../../../components/Tables/Sights/components/ChangeWorkStatus";

/**
 * service
 */
import SightService from "../../../../../services/admin/sight.service";
/**
 * constant
 */
import {
    ADMIN_MAKE_EDIT_SIGHT_URI,
    ADMIN_MAKE_SHOW_CITY_URI,
    ADMIN_MAKE_SIGHT_CHECK_COORDINATE_URI,
    ADMIN_MAKE_SHOW_SIGHT_URI
} from "../../../../../constants/admin/uri.constant";
/**
 * utils
 */
import PlaceTypeTranslate from "../../../../../utils/PlaceTypeTranslate";
import {QueryString} from "../../../../../utils/Querystring";
/**
 * enums
 */
import RolesEnum from "../../../../../enums/RolesEnum";
import TablesKeyEnum from "../../../../../enums/TablesKey";
/**
 * context
 */
import {AlertContext} from "../../../../context/alert.context";
import {SettingsContext} from "../../../../context/settings.context";
import ImageGallery from "../../../../../components/ImageGallery";

export default function SightTable({searchParams}) {
    const [sights, setSights] = useState(null);
    const [isReady, setIsReady] = useState(false);
    const {setAlertSuccess} = useContext(AlertContext)
    const {settings} = useContext(SettingsContext)
    const [withPlaceType, setWithPlaceType] = useState(true);
    const columns = useMemo(() => ([
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        // {
        //     title: 'Images',
        //     dataIndex: 'images',
        //     key: 'images',
        //     render: (images, sight) => (
        //         <div style={{display: "flex", alignItems: "center", flexDirection: "column", gap: 5, minWidth: "max-content"}}>
        //             <ImageGallery images={images}
        //                           renderItem={({file, setImage}) => (
        //                               <img src={file.path} loading="lazy" style={{height: 70, minWidth: "max-content"}} alt="photo" onClick={setImage}/>
        //                           )} />
        //         </div>
        //
        //     ),
        // },
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
            title: 'Work Status',
            dataIndex: 'work_status',
            key: 'work_status',
            render: (_, sight) => <ChangeWorkStatus workStatus={sight.work_status} sightId={sight.id} getSight={getSightHandler}/>
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
            render: city => {
                if (!city) {
                    return null
                }
                return <Link to={ADMIN_MAKE_SHOW_CITY_URI(city.id)}
                             style={{color: city.name ? "#0d6efd" : "red"}}>{city.name || "No name"}</Link>
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
                    <Checkbox checked={withPlaceType} onChange={() => setWithPlaceType(!withPlaceType)}/>
                </div>
            ),
            dataIndex: 'place_type',
            key: 'place_type',
            render: place_type =>
                <div>{place_type.map(type => PlaceTypeTranslate.getTranslateForType(type)).join(", ")}</div>,
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
                    <Tooltip title="View sight">
                        <Link to={ADMIN_MAKE_SHOW_SIGHT_URI(row.id)} >
                            <Button type="primary"
                                    icon={<EyeOutlined/>} size={20}/>
                        </Link>
                    </Tooltip>
                    <Tooltip title="Edit sight">
                        <Link to={ADMIN_MAKE_EDIT_SIGHT_URI(row.id)} target="_blank" rel="noopener noreferrer">
                            <Button type="primary"
                                    icon={<EditOutlined/>} size={20}/>
                        </Link>
                    </Tooltip>
                    {!row.check_coordinates && (
                        <Tooltip title="Check coordinate">
                            <Link to={ADMIN_MAKE_SIGHT_CHECK_COORDINATE_URI(row.id)} target="_blank" rel="noopener noreferrer" >
                                <Button type="primary"
                                        icon={<ShrinkOutlined />}
                                        size={20}/>
                            </Link>
                        </Tooltip>
                    )}
                    <UserCan checkRole={RolesEnum.super_admin}>
                        <Popconfirm
                            title="Are you sure to delete this sight?"
                            onConfirm={() => deleteSight(row.id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Tooltip title="Delete sight">
                                <Button type="danger" icon={<DeleteOutlined/>} size={20}/>
                            </Tooltip>
                        </Popconfirm>
                    </UserCan>
                </Space>
            )
        },
    ]), [withPlaceType]);

    const getSight = async (params = {}) => {
        const copyParams = JSON.parse(JSON.stringify(params));
        copyParams.match = {}

        if(copyParams.filters) {
            if(copyParams.filters.name) {
                copyParams.match = {
                    ...copyParams.match,
                    name: {
                        query: copyParams.filters.name[0],
                    }
                }
            }
        }

        delete copyParams.filters

        return await SightService.list(copyParams)
    };

    const deleteSight = async (sightId) => {
        await SightService.delete(sightId)
        await getSightHandler();
        setAlertSuccess("Sight successfully deleted")
    }

    const getSightHandler = async (params) => {
        setIsReady(false);
        setSights(await getSight({
            ...QueryString.parseQueryString("?" + (window.location.hash.split("?")[1] || "")),
            ...settings.table[TablesKeyEnum.sight],
            ...(!withPlaceType && {isNull: ['place_type']}),
            ...searchParams,
            ...params,
        }))

        setIsReady(true);
    }

    useEffect(() => {
        getSightHandler()
    }, [withPlaceType])

    if(!sights){
        return <div>Loading...</div>
    }


    return (
        <Table data={sights}
               columns={columns}
               tableKey={TablesKeyEnum.sight}
               fetchingData={getSightHandler}
               loader={!isReady}
        />
    )
}
