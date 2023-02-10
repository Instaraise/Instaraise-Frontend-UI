import React from 'react';

import Application from './Application';
import Congratulations from './Congratulations';
import Enrolled from './Enrolled';
import Staking from './Staking';

export default function RenderAction(props) {
    const { isWhitelisted, hasStaked, isEnrolled } = props;
    if (isWhitelisted && hasStaked && isEnrolled) {
        return <Congratulations {...props} />;
    } else {
        if (props.currentStep === 1) {
            return <Application {...props} />;
        } else if (props.currentStep === 2) {
            return <Staking {...props} />;
        } else if (props.currentStep === 3) {
            return <Enrolled {...props} />;
        } else if (props.currentStep === 4) {
            return <Congratulations {...props} />;
        } else {
            return null;
        }
    }
}
