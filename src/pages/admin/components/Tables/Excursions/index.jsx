/**
 * external libs
 */
import React, {useMemo, useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom'
import {Button, Space, Tooltip, Table as TableAntd} from 'antd'
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
    ADMIN_MAKE_EXCURSION_SHOW,
    ADMIN_MAKE_EXCURSION_EDIT,
} from "../../../../../constants/admin/uri.constant";
/**
 * services
 */
import ExcursionService from "../../../../../services/admin/excursion.service";
import {QueryString} from "../../../../../utils/Querystring";

export default function ExcursionsTable({searchParams}) {
    const [excursions, setExcursions] = useState(null);
    const [isReady, setIsReady] = useState(false);
    const history = useHistory();
    const columns = useMemo(() => ([
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (name, row) => <Link to={ADMIN_MAKE_EXCURSION_SHOW(row.id)}
                                         style={{color: name?.length ? "#0d6efd" : "red"}}>{name || "No name"}</Link>,
            ...SearchInputForTable()
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
            render: (_, row) => (
              <Space size={10}>
                  <Tooltip title="View country">
                      <Button type="primary" onClick={() => history.push(ADMIN_MAKE_EXCURSION_SHOW(row.id))}
                              icon={<EyeOutlined/>} size={20}/>
                  </Tooltip>
                  <Tooltip title="Edit country">
                      <Button type="primary" onClick={() => history.push(ADMIN_MAKE_EXCURSION_EDIT(row.id))}
                              icon={<EditOutlined/>} size={20}/>
                  </Tooltip>
              </Space>
            )
        },
    ]), []);

    const expandedRowRender = ( excursion ) => {
        let columns = [
            { title: 'ID', dataIndex: 'id', key: 'id' },
            { title: 'Day', dataIndex: 'day', key: 'day' },
            { title: 'Priority', dataIndex: 'priority', key: 'priority' },
        ];

        const data = excursion.items.reduce( (items, item) => [...items, ...item], []);

        columns = [
            ...columns,
            ...Object.keys(data[0].routes).reduce((columns, key) => ([
                ...columns,
                {
                    title: key,
                    dataIndex: 'routes',
                    key: 'routes',
                    render: (currentRoutes) => (
                        <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                            <div>Distance: {currentRoutes[key].distance}m</div>
                            <div>Duration: {currentRoutes[key].duration}s</div>
                        </div>
                    )
                }
            ]), []),
            { title: 'Description', dataIndex: 'description', key: 'description' },
        ]

        return <TableAntd columns={columns} dataSource={data} pagination={false} />;
    };

    const getExcursions = async (params = {}) => {
        const copyParams = JSON.parse(JSON.stringify(params));

        if(copyParams.filters) {
            if(copyParams.filters.name) {
                copyParams.excursion_name = copyParams.filters.name[0];
            }
        }

        return await ExcursionService.list(copyParams)
    };

    const getExcursionsHandler = async (params) => {
        setIsReady(false)
        setExcursions(await getExcursions({
            ...QueryString.parseQueryString("?" + (window.location.hash.split("?")[1] || "")),
            ...searchParams,
            ...params,
        }))
        setIsReady(true)
    }

    useEffect(() => {
        getExcursionsHandler()
    }, [])

    if(!excursions){
        return <div>Loader...</div>
    }

    return (
      <Table data={excursions}
             expandedRowRender={expandedRowRender}
             columns={columns}
             fetchingData={getExcursionsHandler}
             loader={!isReady}
      />
    )
}
