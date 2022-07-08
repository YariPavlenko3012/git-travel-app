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
import LanguageService from "../../../../../services/admin/language.service";
/**
 * constant
 */
import {
    ADMIN_CREATE_LANGUAGE_URI,
    ADMIN_MAKE_EDIT_LANGUAGE_URI,
    ADMIN_MAKE_SHOW_COUNTRY_URI
} from "../../../../../constants/admin/uri.constant";
import styles from "../../../styles/show.module.scss";

export default function LanguageList({ history }) {
    const [language, setLanguage] = useState(null);

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
        },
        {
            title: 'Language code',
            dataIndex: 'lang_code',
            key: 'lang_code',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, row) => (
              <Space size={10}>
                  <Tooltip title="Edit language">
                      <Button type="primary" onClick={() => history.push(ADMIN_MAKE_EDIT_LANGUAGE_URI(row.id))}
                              icon={<EditOutlined/>} size={20}/>
                  </Tooltip>
              </Space>
            )
        },
    ]), []);

    const getLanguage = async (params = {}) => {
        const languageList = await LanguageService.list(params);
        setLanguage({
            data: languageList,
            meta: {
                current_page: 1,
                per_page: 1000000000,
                total: languageList.length,
            }
        })
    };

    useEffect(() => {
        getLanguage();
    }, []);

    if(!language) {
        return <div>Loader...</div>
    }

    return (
      <div>
          <h3 style={{marginBottom: 20, display: "flex", justifyContent: "space-between"}}>
              Language
              <Link to={ADMIN_CREATE_LANGUAGE_URI}>
                  <Button type="primary" className={styles.show__btn}>
                      Create Language
                  </Button>
              </Link>
          </h3>
          <Table data={language}
                 columns={columns}
                 fetchingData={getLanguage}/>
      </div>
    )
}
