// Copyright (c) 2023-2024 FlyByWire Simulations
// SPDX-License-Identifier: GPL-3.0

import React from 'react';

import { render } from '@instruments/common/index';
import { AircraftContext, EfbWrapper, syncSettingsFromPersistentStorage } from '@flybywiresim/flypad';
import { A320FailureDefinitions } from '@failures';
import { A330343LandingCalculator } from '@shared/performance/a333x_landing';
import { A330343TakeoffPerformanceCalculator } from '@shared/performance/a333x_takeoff';
import { AutomaticCallOutsPage } from './Pages/AutomaticCallOutsPage';
import { a32nxSyncedSettings } from 'instruments/src/EFB/settingsSync';

function aircraftEfbSetup(): void {
  syncSettingsFromPersistentStorage(a32nxSyncedSettings);
}

// TODO: Hoist failures context provider up to here
// This context provider will be replaced by a PluginBinder for fpadv4
render(
  <AircraftContext.Provider
    value={{
      performanceCalculators: {
        takeoff: new A330343TakeoffPerformanceCalculator(),
        landing: new A330343LandingCalculator(),
      },
      settingsPages: {
        autoCalloutsPage: AutomaticCallOutsPage,
      },
    }}
  >
    <EfbWrapper failures={A320FailureDefinitions} aircraftSetup={aircraftEfbSetup} />
  </AircraftContext.Provider>,
  true,
  true,
);
