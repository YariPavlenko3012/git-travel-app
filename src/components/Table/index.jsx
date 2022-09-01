import {Table} from "antd";
import React, {useState, useEffect, useRef} from "react";

export default function TableUI({data, columns, fetchingData, ...props}) {
    const tableRef = useRef(null)
    const [pagination, setPagination] = useState({
        current: data.meta.current_page,
        pageSize: data.meta.per_page,
        total: data.meta.total
    });
    const [loading, setLoading] = useState(false);

    const handleTableChange = async (pagination, filters, sorter) => {
        setLoading(true);
        window.scrollTo(0, tableRef.current.offsetTop);

        await fetchingData({
            sort_column: sorter.field,
            sort_type: sorter.order === 'ascend' ? "asc" : "desc",
            page: pagination.current,
            per_page: pagination.pageSize,
            filters,
        });

        setLoading(false)
    };

    useEffect(() => {
        setPagination({
            current: data.meta.current_page,
            pageSize: data.meta.per_page,
            total: data.meta.total
        })
    }, [data]);

    const tableData = data.data || data;

    return (
        <Table
            ref={tableRef}
            columns={columns}
            dataSource={tableData.map( (item, index) => ({key: index, ...item}))}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
            {...props}
            scroll={{
                scrollToFirstRowOnChange: true,
            }}
        />
    )
}
