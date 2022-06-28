import {Form} from "antd";
import React from "react";

export default function FormItem({ label, name, children, hidden, ...props }) {
    return (
        <Form.Item label={label || ""}
                   name={name}
                   validateStatus={(props.meta.error || props.meta.submitError) && props.meta.touched ? "error" : false}
                   help={(props.meta.error || props.meta.submitError) && props.meta.touched ? props.meta.error || props.meta.submitError : false}
                   hidden={hidden}>
            {children}
        </Form.Item>
    )
}
