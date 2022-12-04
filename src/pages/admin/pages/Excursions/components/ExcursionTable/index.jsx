/**
 * external libs
 */
import React from 'react';
import {Table} from "antd";

export default function ExcursionTable({ day }){
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
            dataIndex: 'place_priority',
            key: 'place_priority',
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
