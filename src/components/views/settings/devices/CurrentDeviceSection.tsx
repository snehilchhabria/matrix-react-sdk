/*
Copyright 2022 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React, { useState } from 'react';

import { _t } from '../../../../languageHandler';
import Spinner from '../../elements/Spinner';
import SettingsSubsection from '../shared/SettingsSubsection';
import DeviceDetails from './DeviceDetails';
import DeviceExpandDetailsButton from './DeviceExpandDetailsButton';
import DeviceTile from './DeviceTile';
import { DeviceVerificationStatusCard } from './DeviceVerificationStatusCard';
import { DeviceWithVerification } from './types';

interface Props {
    device?: DeviceWithVerification;
    isLoading: boolean;
    isSigningOut: boolean;
    onVerifyCurrentDevice: () => void;
    onSignOutCurrentDevice: () => void;
    saveDeviceName: (deviceName: string) => Promise<void>;
}

const CurrentDeviceSection: React.FC<Props> = ({
    device,
    isLoading,
    isSigningOut,
    onVerifyCurrentDevice,
    onSignOutCurrentDevice,
    saveDeviceName,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return <SettingsSubsection
        heading={_t('Current session')}
        data-testid='current-session-section'
    >
        { /* only show big spinner on first load */ }
        { isLoading && !device && <Spinner /> }
        { !!device && <>
            <DeviceTile
                device={device}
            >
                <DeviceExpandDetailsButton
                    data-testid='current-session-toggle-details'
                    isExpanded={isExpanded}
                    onClick={() => setIsExpanded(!isExpanded)}
                />
            </DeviceTile>
            { isExpanded &&
                <DeviceDetails
                    device={device}
                    isSigningOut={isSigningOut}
                    onVerifyDevice={onVerifyCurrentDevice}
                    onSignOutDevice={onSignOutCurrentDevice}
                    saveDeviceName={saveDeviceName}
                    // Current device can not have a pusher as Web does not use them
                    pusher={null}
                />
            }
            <br />
            <DeviceVerificationStatusCard device={device} onVerifyDevice={onVerifyCurrentDevice} />
        </>
        }
    </SettingsSubsection>;
};

export default CurrentDeviceSection;
