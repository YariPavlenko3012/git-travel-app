/**
 * external libs
 */
import React, {useMemo, useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom'
import {Button, Space, Tooltip} from 'antd'
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
    ADMIN_MAKE_EDIT_STATE_URI, ADMIN_MAKE_SHOW_COUNTRY_URI,
    ADMIN_MAKE_SHOW_STATE_URI,
} from "../../../../../constants/admin/uri.constant";
import StateService from "../../../../../services/admin/state.service";
import {QueryString} from "../../../../../utils/Querystring";

export default function StatesTable({searchParams}) {
    const [states, setStates] = useState(null);
    const [isReady, setIsReady] = useState(false);
    const history = useHistory();
    const columns = useMemo(() => ([
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, state) => {
                return <Link to={ADMIN_MAKE_SHOW_STATE_URI(state.id)} style={{color: state.name ? "#0d6efd" : "red"}}>{state.name || "No name"}</Link>
            }
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
            render: (_, state) => {
                return <Link to={ADMIN_MAKE_SHOW_COUNTRY_URI(state.country.id)} style={{color: state.country.name ? "#0d6efd" : "red"}}>{state.country.name || "No name"}</Link>
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, row) => (
              <Space size={10}>
                  <Tooltip title="View state">
                      <Button type="primary" onClick={() => history.push(ADMIN_MAKE_SHOW_STATE_URI(row.id))}
                              icon={<EyeOutlined/>} size={20}/>
                  </Tooltip>
                  <Tooltip title="Edit state">
                      <Button type="primary" onClick={() => history.push(ADMIN_MAKE_EDIT_STATE_URI(row.id))}
                              icon={<EditOutlined/>} size={20}/>
                  </Tooltip>
              </Space>
            )
        },
    ]), []);

    const getState = async (params = {}) => {
        setStates(await StateService.list(params))
    };

    const getStateHandler = async (params) => {
        setIsReady(false)
        await getState(await getState({
            ...QueryString.parseQueryString("?" + (window.location.hash.split("?")[1] || "")),
            ...searchParams,
            ...params,
        }))
        setIsReady(true)
    }

    useEffect(() => {
        getStateHandler()
    }, [])

    if(!states){
        return <div>Loading...</div>
    }

    return (
      <Table data={states}
             columns={columns}
             fetchingData={getState}
             loader={!isReady}
      />
    )
}
