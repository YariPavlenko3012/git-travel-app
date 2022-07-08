/**
 * external libs
 */
import {
    HomeOutlined,
    PictureOutlined,
    DollarCircleOutlined,
    SortAscendingOutlined,
    LogoutOutlined,
    BankOutlined,
    UserOutlined,
    BarChartOutlined,
} from '@ant-design/icons';
import {Breadcrumb, Layout, Menu} from 'antd';
import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
/**
 * constants
 */
import {
    ADMIN_CITY_LIST_URI,
    ADMIN_COUNTRY_LIST_URI, ADMIN_CURRENCY_LIST_URI, ADMIN_LANGUAGE_LIST_URI,
    ADMIN_SIGHT_LIST_URI, ADMIN_USERS_CREATE
} from "../../../../constants/admin/uri.constant";
/**
 * styles
 */
import styles from './index.module.scss'
import {AUTH_PAGE_LOGOUT_URI} from "../../../../constants/uri.constant";

const {Header, Content, Footer, Sider} = Layout;

function getItem(label, key, Icon, link, children) {
    return {
        key,
        children,
        icon: Icon ? <Icon style={{fontSize: 20}}/> : null,
        label: !!link ? (
            <NavLink className={isActive => `${styles.link} ${isActive && styles.active}`} to={link}>
                {Icon && <Icon style={{fontSize: 20}}/>}
                <span className={styles.icon}>{label}</span>
            </NavLink>
        ) : (
            <div>{label}</div>
        ),
    };
}

function getItemChild(label, key, link) {
    return {
        key,
        label: (
            <NavLink className={isActive => `${styles.link} ${styles.child} ${isActive && styles.active}`} to={link}>
                <span className={styles.icon}>{label}</span>
            </NavLink>
        )
    };
}

const items = [
    getItem('Country', '1', BankOutlined, ADMIN_COUNTRY_LIST_URI),
    getItem('City', '2', HomeOutlined, ADMIN_CITY_LIST_URI),
    getItem('Sight', '3', PictureOutlined, ADMIN_SIGHT_LIST_URI),
    getItem('Currency', '4', DollarCircleOutlined, ADMIN_CURRENCY_LIST_URI),
    getItem('Language', '5', SortAscendingOutlined, ADMIN_LANGUAGE_LIST_URI),
    getItem('User', 'sub1', UserOutlined, null, [
        getItemChild('List', 'sub1_1', ADMIN_USERS_CREATE),
        getItemChild('Create', 'sub1_2',  ADMIN_USERS_CREATE),
        getItemChild('Roles', 'sub1_3', ADMIN_USERS_CREATE ),
    ]),
    getItem('Statistics', 'sub2', BarChartOutlined, null, [
        getItemChild('Users', 'sub2_1', ADMIN_USERS_CREATE ),
    ]),
    getItem('Logout', '6', LogoutOutlined, AUTH_PAGE_LOGOUT_URI)
];

export default function LayoutUI({children}) {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
            </Sider>
            <Layout className="site-layout">
                <Content
                    style={{margin: '0 16px', padding: '10px 0'}}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};
