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


export default function ExcursionTable({ day, changePriority, isShowPage, deletePlace }){
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
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
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
