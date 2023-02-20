/**
 * external libs
 */
import React, { useState } from 'react';
import { Radio } from 'antd';
/**
 * enums
 */
import GenerationTypeEnums from "../../../../../../../enums/GenerationType";

export default function RadioGenerationType({generationType, setGenerationType}){
    return (
        <Radio.Group onChange={e => setGenerationType(e.target.value)} defaultValue={generationType}>
            <Radio value={GenerationTypeEnums.manual}>Manual</Radio>
            <Radio value={GenerationTypeEnums.custom}>Custom</Radio>
        </Radio.Group>
    )
}
