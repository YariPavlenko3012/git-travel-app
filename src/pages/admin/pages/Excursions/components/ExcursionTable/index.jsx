/**
 * external libs
 */
import React from 'react';
import {Button, Table, Tooltip} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
/**
 * components
 */
import ChangePriorityInput from '../ChangePriorityInput'
import PlaceTypeDurationEnum from "../../../../../../enums/PlaceTypeDuration";
import PlaceTypeEnum from "../../../../../../enums/PlaceType";
import DateTime from "../../../../../../utils/DateTime";


export default function ExcursionTable({ day, changePriority, isShowPage, activeRouteType, deletePlace }){
    const columns = [
        {
            title: 'Day',
            dataIndex: 'day',
            key: 'day',
        },
        {
            title: 'Place',
            dataIndex: 'place',
            key: 'place',
            render: (place) => (
                <div>
                    {place.original_name}
                </div>
            )
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
            render: (priority) => {
                if(isShowPage){
                    return <div>{priority}</div>
                }

                return (
                    <ChangePriorityInput day={day} changePriority={changePriority} priority={priority}/>
                )
            }
        },
        {
            title: 'Place time',
            dataIndex: 'place_time',
            key: 'place_time',
            render: (_, {place}) => {
                let currentPlace = place.place_type[0];
                if(place.place_type[0] === PlaceTypeEnum.tourist_attraction && place.place_type.length > 1){
                    currentPlace = place.place_type[1]
                }

                return `${DateTime.secondsToH(PlaceTypeDurationEnum[currentPlace])}h`
            }
        },
        {
            title: 'Route time',
            dataIndex: 'route_time',
            key: 'route_time',
            render: (_, excursion) => `${DateTime.secondsToH(excursion.routes[activeRouteType].duration)}h`
        },
        {
            title: 'Route distance',
            dataIndex: 'route_distance',
            key: 'route_distance',
            render: (_, excursion) => `${(excursion.routes[activeRouteType].distance / 1000).toFixed(1)}km`
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, row) => {
                if(isShowPage){
                   return null
                }

                return (
                    <Tooltip title="Delete city">
                        <Button type="danger" onClick={() => deletePlace(row.day, row.place_id)} icon={<DeleteOutlined />} size={20} />
                    </Tooltip>
                )
            }
        },
    ]

    return (
        <Table dataSource={day} columns={columns} pagination={false} />
    )
}
