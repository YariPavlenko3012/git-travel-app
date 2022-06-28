/**
 * external libs
 */
import React, {useCallback, useContext} from 'react';
import {Link} from 'react-router-dom'
import {Button, Row, Space} from 'antd'
import {LockOutlined, UserOutlined} from '@ant-design/icons';
/**
 * components
 */
import Form from '../../../../../components/Form'
import FieldCheckbox from '../../../../../components/Form/FieldCheckbox'
import FieldInput from '../../../../../components/Form/FieldInput'
/**
 * services
 */
import AuthService from '../../../../../services/auth.service';
import StorageService from "../../../../../services/storage.service";
/**
 * constants
 */
import {
    AUTH_PAGE_FORGOT_PASSWORD_URI,
    AUTH_PAGE_PAGE
} from '../../../../../constants/uri.constant';
/**
 * context
 */
import {AuthContext} from "../../../../context/auth.context";
import {ADMIN_COUNTRY_LIST_URI} from "../../../../../constants/admin/uri.constant";


export default function Login({history}) {
    const {getUser} = useContext(AuthContext);

    const onSubmit = useCallback(async (value) => {
        const {access_token} = await AuthService.login(value);
        StorageService.accessToken = access_token;

        await getUser();

        history.push(ADMIN_COUNTRY_LIST_URI)
    }, [history]);


    return (
        <Space size={10} direction="vertical" style={{width: "100%"}}>
            <Form onSubmit={onSubmit}
                  render={({handleSubmit, submitting}) => (
                      <form onSubmit={handleSubmit}>
                          <FieldInput name="login"
                                      placeholder="Enter login"
                                      input={{
                                          prefix: <UserOutlined/>
                                      }}/>
                          <FieldInput name="password"
                                      type="password"
                                      placeholder="Enter password"
                                      input={{
                                          prefix: <LockOutlined/>
                                      }}/>
                          <Space direction="vertical" style={{width: "100%"}} size={20}>
                              <Row justify="space-between" align="middle">
                                  <FieldCheckbox name="remember_me"
                                                 label="Remember me"/>
                                  <Link to={AUTH_PAGE_FORGOT_PASSWORD_URI}>Forgot password?</Link>
                              </Row>
                              <Button type="primary"
                                      htmlType="submit" disabled={submitting} size="large"
                                      style={{width: "100%"}}>
                                  Sign in
                              </Button>
                          </Space>
                      </form>
                  )}
            />
        </Space>
    );
};
