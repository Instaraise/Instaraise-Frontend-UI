import { BeaconWallet } from '@taquito/beacon-wallet';
import axios from 'axios';

import { DATA_URL, NAME } from '../../../config/config';
import { IDO_CONFIG } from '../../../config/Launchpad/Ido/IdoConfig';
export const kycProcessAPI = async (args) => {
    try {
        const { projectName } = args;
        const options = {
            name: NAME,
        };
        const wallet = new BeaconWallet(options);
        let account = await wallet.client.getActiveAccount();

        const response = await axios.get(
            `${DATA_URL}/v1/launchpad?userAddress=${account.address}&projectName=${projectName}`
        );

        if (response.data.success) {
            let isWhitelisted = response.data.IS_KYC_DONE;
            let hasStaked = response.data.INSTA_STAKE.status;
            let isErolled = response.data.INSTA_ENROLL.enrolled;

            let currentStep = 1;
            if (IDO_CONFIG[0].TIER_SYSTEM) {
                if (isWhitelisted && !hasStaked && !isErolled) {
                    currentStep = 2;
                }
                if (isWhitelisted && hasStaked) {
                    currentStep = 3;
                }
                if (isWhitelisted && hasStaked && isErolled) {
                    currentStep = 4;
                }
            }

            return {
                success: true,
                data: {
                    isWhitelisted: isWhitelisted,
                    hasStaked: hasStaked,
                    isEnrolled: isErolled,
                    currentStep: currentStep,
                },
            };
        } else {
            return {
                success: false,
                data: {
                    isWhitelisted: false,
                    hasStaked: false,
                    isEnrolled: false,
                    currentStep: 1,
                },
            };
        }
    } catch (error) {
        return {
            success: false,
            data: {
                isWhitelisted: false,
                hasStaked: false,
                isEnrolled: false,
                currentStep: 1,
            },
        };
    }
};
