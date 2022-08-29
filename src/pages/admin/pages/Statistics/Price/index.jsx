/**
 * external libs
 */
import React, {useEffect, useState, useMemo, useContext} from 'react'
import {Table, DatePicker, Button} from 'antd'
/**
 * service
 */
import UsersService from "../../../../../services/admin/users.service";
/**
 * context
 */
import {PriceContext} from "../../../../context/price.context";
import {AuthContext} from "../../../../context/auth.context";

const { RangePicker } = DatePicker;

export default function User(){
    const {prices} = useContext(PriceContext)
    const {user} = useContext(AuthContext)
    const [isReady, setIsReady] = useState(false);
    const [me, setMe] = useState(null);
    const [searchDate, setSearchDate] = useState(['', ''])

    const columns = useMemo(() => ([
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Countries',
            dataIndex: 'countries',
            key: 'countries',
            render: countries => `${countries} (${countries * prices.country}₴)`
        },
        {
            title: 'Cities',
            dataIndex: 'cities',
            key: 'cities',
            render: cities => `${cities} (${cities * prices.city}₴)`
        },
        {
            title: 'Sights',
            dataIndex: 'sights',
            key: 'sights',
            render: sights => `${sights} (${sights * prices.sight}₴)`
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            render: (total, user) => `${user.countries * prices.country + user.cities * prices.city + user.sights * prices.sight}₴`
        },
    ]), []);

    const getUser = async ( params = {} ) => {
        setIsReady(true)
        const newParams = {}
        const [start_date, end_date] = searchDate;

        if(start_date){
            newParams.start_date = start_date
        }
        if(end_date){
            newParams.end_date = end_date
        }

        setMe(await UsersService.get( user.id, {...params, ...newParams} ))
        setIsReady(false)
    }

    useEffect(() => {
        getUser()
    }, [])

    if(!me){
        return null
    }

    return (
        <>
            <div style={{marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <h3>Prices</h3>
                <div style={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
                    <RangePicker onChange={(_, date) => setSearchDate(date)}/>
                    <Button type="primary" onClick={() => getUser()}>
                        Filter
                    </Button>
                </div>
            </div>

            <Table
                columns={columns}
                pagination={false}
                dataSource={[me]}
                loading={isReady}
            />
        </>
    )
}
