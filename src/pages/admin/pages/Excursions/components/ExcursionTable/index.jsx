/**
 * external libs
 */
import React from 'react';
import {Input, Table} from "antd";
/**
 * components
 */
import ChangePriorityInput from '../ChangePriorityInput'


export default function ExcursionTable({ day, changePriority }){
    const columns = [
        {
            title: 'Day',
            dataIndex: 'day',
            key: 'day',
        },
        {
            title: 'Place',
            dataIndex: 'place_id',
            key: 'place_id',
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
            render: (priority) => <ChangePriorityInput day={day} changePriority={changePriority} priority={priority}/>
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
    ]

    return (
        <Table dataSource={day} columns={columns} pagination={false} />
    )
}
