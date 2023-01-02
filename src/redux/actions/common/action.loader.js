import { STEPPER_DATA } from '../index.action';
export const STEPPER_DATA_ACTION = (data) => {
    return {
        type: STEPPER_DATA,
        payload: data,
    };
};
