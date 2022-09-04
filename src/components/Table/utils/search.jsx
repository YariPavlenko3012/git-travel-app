import {Button, Input, Space} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import React, {useRef} from 'react';

export default function SearchInputForTable( ) {
    const getColumnSearchProps = () => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
              <Input
                placeholder="Search..."
                value={selectedKeys[0]}
                onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={confirm}
                style={{ marginBottom: 8, display: 'block' }}
              />
              <Space>
                  <Button
                    type="primary"
                    onClick={() => {
                        confirm({ closeDropdown: true });
                    }}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90 }}
                  >
                      Search
                  </Button>
                  <Button onClick={() => {
                      clearFilters();
                      confirm({ closeDropdown: true });
                  }} size="small" style={{ width: 90 }}>
                      Reset
                  </Button>
              </Space>
          </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    });

    return getColumnSearchProps();
}
