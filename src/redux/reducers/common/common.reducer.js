import { STEPPER_DATA, STEPPER_STATE } from '../../actions/index.action';
export const KYC_PROCESS = (
    intialState = {
        isWhitelisted: false,
        hasStaked: false,
        isEnrolled: false,
        currentStep: 1,
    },
    action
) => {
    switch (action.type) {
        case STEPPER_STATE:
            return action.payload;
        default:
            return intialState;
    }
};
export const steps = [
    {
        id: 1,
        step: 1,
        visited: false,
    },
    {
        id: 2,
        step: 2,
        visited: false,
    },
    {
        id: 3,
        step: 3,
        visited: false,
    },
];
export const stepperData = (intialState = steps, action) => {
    switch (action.type) {
        case STEPPER_DATA:
            return action.payload;
        default:
            return intialState;
    }
};
