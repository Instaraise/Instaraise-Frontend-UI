import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

export default function VariableToolTip({ text }) {
    return (
        <div>
            <Tooltip title={text} placement='top-start'>
                <div className='cursor-help'>
                    <FaQuestionCircle />
                </div>
            </Tooltip>
        </div>
    );
}
