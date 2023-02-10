import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

export default function VariableWidthToolTip({ text }) {
    return (
        <div>
            <Tooltip title={text} placement='top-start'>
                <div className='cursor-pointer '>
                    <FaInfoCircle />
                </div>
            </Tooltip>
        </div>
    );
}
