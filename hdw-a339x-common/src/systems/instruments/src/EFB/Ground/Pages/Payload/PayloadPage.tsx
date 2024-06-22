// Copyright (c) 2023-2024 FlyByWire Simulations
// SPDX-License-Identifier: GPL-3.0

/* eslint-disable max-len */
import React, { useState } from 'react';
import { AirframeInfo, AirframeType, CabinInfo, FlypadInfo, Units, usePersistentProperty, useSimVar } from '@flybywiresim/fbw-sdk';
import { useAppSelector, isSimbriefDataLoaded, getMaxPax, getMaxCargo } from '@flybywiresim/flypad';
import { A339Payload } from './WideBody/A339Payload';
import { ACJ339Payload } from './WideBody/ACJ339Payload';

export interface PayloadProps {
    airframeInfo: AirframeInfo,
    flypadInfo: FlypadInfo,
    cabinInfo: CabinInfo,
    maxPax: number,
    maxCargo: number,
    simbriefUnits: string,
    simbriefBagWeight: number,
    simbriefPaxWeight: number,
    simbriefPax: number,
    simbriefBag: number,
    simbriefFreight: number,
    simbriefDataLoaded: boolean,
    payloadImported: boolean,
    massUnitForDisplay: string,
    isOnGround: boolean,
    boardingStarted: boolean,
    boardingRate: string,
    setBoardingStarted: (boardingStarted: any) => void,
    setBoardingRate: (boardingRate: any) => void,
}

export const PayloadPage = () => {
    const simbriefUnits = useAppSelector((state) => state.simbrief.data.units);
    const simbriefBagWeight = parseInt(useAppSelector((state) => state.simbrief.data.weights.bagWeight));
    const simbriefPaxWeight = parseInt(useAppSelector((state) => state.simbrief.data.weights.passengerWeight));
    const simbriefPax = parseInt(useAppSelector((state) => state.simbrief.data.weights.passengerCount));
    const simbriefBag = parseInt(useAppSelector((state) => state.simbrief.data.weights.bagCount));
    const simbriefFreight = parseInt(useAppSelector((state) => state.simbrief.data.weights.freight));

    const [isOnGround] = useSimVar('SIM ON GROUND', 'Bool', 8_059);
    const [boardingStarted, setBoardingStarted] = useSimVar('L:A32NX_BOARDING_STARTED_BY_USR', 'Bool', 509);
    const [boardingRate, setBoardingRate] = usePersistentProperty('CONFIG_BOARDING_RATE', 'REAL');
    const payloadImported = useAppSelector((state) => state.simbrief.payloadImported);

    const simbriefDataLoaded = isSimbriefDataLoaded();

    const [massUnitForDisplay] = useState(Units.usingMetric ? 'KGS' : 'LBS');

    const flypadInfo = useAppSelector((state) => state.config.flypadInfo);
    const airframeInfo = useAppSelector((state) => state.config.airframeInfo);
    const cabinInfo = useAppSelector((state) => state.config.cabinInfo);

    switch (airframeInfo.variant) {
    case AirframeType.SU100_95:
    case AirframeType.A330_343:
    case AirframeType.A330_941:
    default:
        return (
            <A339Payload
                airframeInfo={airframeInfo}
                flypadInfo={flypadInfo}
                cabinInfo={cabinInfo}
                maxPax={getMaxPax()}
                maxCargo={getMaxCargo()}
                simbriefUnits={simbriefUnits}
                simbriefBagWeight={simbriefBagWeight}
                simbriefPaxWeight={simbriefPaxWeight}
                simbriefPax={simbriefPax}
                simbriefBag={simbriefBag}
                simbriefFreight={simbriefFreight}
                simbriefDataLoaded={simbriefDataLoaded}
                payloadImported={payloadImported}
                massUnitForDisplay={massUnitForDisplay}
                isOnGround={isOnGround}
                boardingStarted={boardingStarted}
                boardingRate={boardingRate}
                setBoardingStarted={setBoardingStarted}
                setBoardingRate={setBoardingRate}
            />
        );
    }
};
