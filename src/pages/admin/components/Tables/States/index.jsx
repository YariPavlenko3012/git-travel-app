/**
 * external libs
 */
import React, {useMemo} from 'react';
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

export default function StatesTable({stateList, getState}) {
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
                  <Tooltip title="Edit state">
                      <Button type="primary" onClick={() => history.push(ADMIN_MAKE_EDIT_STATE_URI(row.id))}
                              icon={<EditOutlined/>} size={20}/>
                  </Tooltip>
                  <Tooltip title="View state">
                      <Button type="primary" onClick={() => history.push(ADMIN_MAKE_SHOW_STATE_URI(row.id))}
                              icon={<EyeOutlined/>} size={20}/>
                  </Tooltip>
              </Space>
            )
        },
    ]), []);

    return (
      <Table data={stateList || []}
             columns={columns}
             fetchingData={getState}
             loader={!stateList}
      />
    )
}
