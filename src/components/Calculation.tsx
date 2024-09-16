import React, { useMemo } from 'react';

import config from '../config/index.json';
import {
  burnCyclesPerDay,
  charcoalPerDay,
  estimationWoodUsedPerBurnWet,
  estimationWoodUsedPerHopperPerBurnDry,
  timeInHoursPerBurn,
  wetWoodNeededPerOvenPerFullDayWetCharcoalWood,
} from '../helpers/calculations';

const volumeOfOvenM3 = 5.2;
const areaOfOvenM2 = 16.8;
const numberOfBurnsPerDay = 2.93;
const airBetweenLogs = 0.4425;
const dryWoodToCharcoalConversionRatio = 3.7;
const dryFireBoxWoodNeededperBurnForOneOven = 800;

function Calculation() {
  const { calculation } = config;
  const { title } = calculation;

  const [woodMoisture, setWoodMoisture] = React.useState(0);
  const [woodDensity, setWoodDensity] = React.useState(0);

  const hoursPerBurn = useMemo(() => {
    return timeInHoursPerBurn(
      volumeOfOvenM3,
      areaOfOvenM2,
      numberOfBurnsPerDay,
      woodMoisture
    );
  }, [woodMoisture]);

  const estWoodPerHopperPerBurnDry = useMemo(() => {
    return estimationWoodUsedPerHopperPerBurnDry(
      woodDensity,
      volumeOfOvenM3,
      airBetweenLogs
    );
  }, [woodDensity]);

  const estWoodUsedPerBurnWet = useMemo(() => {
    return estimationWoodUsedPerBurnWet(
      estWoodPerHopperPerBurnDry,
      woodMoisture
    );
  }, [estWoodPerHopperPerBurnDry, woodMoisture]);

  const burnPerDayCycles = useMemo(() => {
    return burnCyclesPerDay(hoursPerBurn);
  }, [hoursPerBurn]);

  return (
    <section id="test">
      <div className={`container mx-auto px-2 pt-4 pb-12 text-primary`}>
        <h1
          className={`w-full my-2 text-5xl font-bold leading-tight text-center text-primary`}
        >
          {title}
        </h1>

        <input
          placeholder="Wood Moisture"
          type="number"
          onChange={(e) => setWoodMoisture(Number(e.target.value))}
          className="border border-primary rounded-md"
        />
        <p className="font-bold">Wood Moisture: {woodMoisture}</p>

        <input
          placeholder="Wood Density"
          type="number"
          onChange={(e) => setWoodDensity(Number(e.target.value))}
          className="border border-primary rounded-md"
        />
        <p className="font-bold">Wood Density: {woodDensity}</p>

        <p>Time In Hours Per Burn {hoursPerBurn}</p>
        <p>Burn Cycles Per Day: {burnPerDayCycles}</p>
        <p>
          Estimation Wood Used per Hopper per Burn: {estWoodPerHopperPerBurnDry}
        </p>
        <p>Estimation Wood Used per Burn: {estWoodUsedPerBurnWet}</p>
        <p>
          Wet Wood Needed per Oven per 24 Hours Wet Charcoal Wood:{' '}
          {wetWoodNeededPerOvenPerFullDayWetCharcoalWood(
            burnPerDayCycles,
            estWoodUsedPerBurnWet
          )}
        </p>
        <p>
          Charcoal Per Day:{' '}
          {charcoalPerDay(
            dryFireBoxWoodNeededperBurnForOneOven,
            estWoodPerHopperPerBurnDry,
            burnPerDayCycles,
            dryWoodToCharcoalConversionRatio
          )}
        </p>
      </div>
    </section>
  );
}

export default Calculation;
