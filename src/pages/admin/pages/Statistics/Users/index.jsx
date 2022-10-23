/**
 * external libs
 */
import React, {useEffect, useState, useMemo, useContext} from 'react'
import {Button, DatePicker} from "antd";
import moment from 'moment';
/**
 * components
 */
import Table from "../../../../../components/Table";
/**
 * service
 */
import UsersService from "../../../../../services/admin/users.service";
/**
 * context
 */
import {PriceContext} from "../../../../context/price.context";
/**
 * utils
 */
import Calendar from "../../../../../utils/Calendar";
import DateTime from "../../../../../utils/DateTime";

const { RangePicker } = DatePicker;


export default function User(){
    const {prices} = useContext(PriceContext)
    const [users, setUsers] = useState(null);
    const [searchDate, setSearchDate] = useState(null)
    const [isReady, setIsReady] = useState(false);

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
            // render: cities =>  `${cities} (${cities * prices.city}₴)`
            render: cities => `0₴`
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
            // render: (total, user) => `${user.countries * prices.country + user.cities * prices.city + user.sights * prices.sight}₴`
            render: (total, user) => `${user.countries * prices.country  + user.sights * prices.sight}₴`
        },
    ]), []);

    const getUser = async ( params = {}, rangeDate = null ) => {
        setIsReady(true)
        const newParams = {}
        const [start_date, end_date] = searchDate || getSearchDate();

        if(start_date){
            newParams.start_date = start_date
        }
        if(end_date){
            newParams.end_date = end_date
        }

        setUsers(await UsersService.list( {...params, ...newParams} ))
        setIsReady(false)
    }

    const getSearchDate = () => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const rangeDate = [
            DateTime.dateToYmd(new Date(currentYear, currentMonth, 1)),
            DateTime.dateToYmd(new Date(currentYear, currentMonth, Calendar.daysInMonth(new Date())))
        ]

        setSearchDate(rangeDate)

        return rangeDate;
    }

    useEffect(() => {
        getUser()
    }, [])

    if(!users){
        return null
    }

    return (
        <>
            <div style={{marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <h3>Prices</h3>
                {console.log(searchDate, "searchDate")}
                <div style={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
                    <RangePicker defaultValue={[moment(searchDate[0], 'YYYY-MM-DD'), moment(searchDate[1], 'YYYY-MM-DD')]}
                                 allowClear={true}
                                 onChange={(_, date) => setSearchDate(date)}/>
                    <Button type="primary" onClick={() => getUser()}>
                        Filter
                    </Button>
                </div>
            </div>
            <Table data={users}
                   columns={columns}
                   fetchingData={getUser}
                   loader={isReady}
            />
        </>
    )
}
