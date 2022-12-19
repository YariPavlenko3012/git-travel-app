
/**
 * external libs
 */import {Table} from "antd";
import React, {useState, useEffect, useRef, useContext} from "react";
/**
 * services
 */
import StorageService from "../../services/storage.service";
/**
 * context
 */
import {SettingsContext} from "../../pages/context/settings.context";
/**
 * utils
 */
import {QueryString} from "../../utils/Querystring";

export default function TableUI({data, columns, fetchingData, loader = false, tableKey, ...props}) {
    const {settings} = useContext(SettingsContext);
    const tableRef = useRef(null)
    const [pagination, setPagination] = useState({
        current: data.meta.current_page,
        pageSize: data.meta.per_page,
        total: data.meta.total
    });
    const [isReady, setIsReady] = useState(loader);

    const handleTableChange = async (pagination, filters, sorter) => {
        setIsReady(true);
        window.scrollTo(0, tableRef.current.offsetTop);

        if(tableKey){
            const newSettings = {...settings}

            newSettings.table[tableKey].per_page = pagination.pageSize
            newSettings.table[tableKey].page = pagination.current

            StorageService.settings = newSettings
        }

        await fetchingData({
            sort_column: sorter.field,
            sort_type: sorter.order === 'ascend' ? "asc" : "desc",
            page: pagination.current,
            per_page: pagination.pageSize,
            filters,
        });

        setIsReady(false)
    };

    useEffect(() => {
        setPagination({
            current: data.meta.current_page,
            pageSize: data.meta.per_page,
            total: data.meta.total
        })
    }, [data]);

    useEffect(() => {
        setIsReady(loader)
    }, [loader]);

    const tableData = data.data || data;

    return (
        <Table
            ref={tableRef}
            columns={columns}
            dataSource={tableData.map( (item, index) => ({key: index, ...item}))}
            pagination={pagination}
            loading={isReady}
            onChange={handleTableChange}
            {...props}
            scroll={{
                scrollToFirstRowOnChange: true,
            }}
        />
    )
}
