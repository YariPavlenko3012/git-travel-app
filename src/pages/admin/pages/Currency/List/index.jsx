/**
 * external libs
 */
import React, {useEffect, useMemo, useState} from 'react';
import {Link} from "react-router-dom";
import {Button, Space, Tooltip} from 'antd'
import {EditOutlined} from '@ant-design/icons'
/**
 * components
 */
import Table from '../../../../../components/Table'
/**
 * services
 */
import CurrencyService from "../../../../../services/admin/currency.service";
/**
 * constant
 */
import {
    ADMIN_CREATE_CURRENCY_URI,
    ADMIN_MAKE_EDIT_CURRENCY_URI,
    ADMIN_MAKE_SHOW_COUNTRY_URI
} from "../../../../../constants/admin/uri.constant";
/**
 * styles
 */
import styles from "../../../styles/show.module.scss";

export default function CurrencyList({ history }) {
    const [currency, setCurrency] = useState(null);

    const columns = useMemo(() => ([
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Currency code',
            dataIndex: 'currency_code',
            key: 'currency_code',
            render: (_, row) => <Link to={ADMIN_MAKE_SHOW_COUNTRY_URI(row.id)}>{row.currency_code}</Link>
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, row) => (
              <Space size={10}>
                  <Tooltip title="Edit currency">
                      <Button type="primary" onClick={() => history.push(ADMIN_MAKE_EDIT_CURRENCY_URI(row.id))}
                              icon={<EditOutlined/>} size={20}/>
                  </Tooltip>
              </Space>
            )
        },
    ]), []);

    const getCurrency = async (params = {}) => {
        const currencyList = await CurrencyService.list(params);
        setCurrency({
            data: currencyList,
            meta: {
                current_page: 1,
                per_page: 1000000000,
                total: currencyList.length,
            }
        })
    };

    useEffect(() => {
        getCurrency();
    }, []);

    if(!currency) {
        return <div>Loader...</div>
    }

    return (
      <div>
          <h3 style={{marginBottom: 20, display: "flex", justifyContent: "space-between"}}>
              Currency
              <Link to={ADMIN_CREATE_CURRENCY_URI}>
                  <Button type="primary" className={styles.show__btn}>
                      Create Currency
                  </Button>
              </Link>
          </h3>
          <Table data={currency}
                 columns={columns}
                 fetchingData={getCurrency}/>
      </div>
    )
}
