const timeInHoursPerBurn = (
  volOvenM3: number,
  areaOvenM2: number,
  burnPerDay: number,
  woodMoisture: number
) => {
  return (
    (((volOvenM3 / areaOvenM2) * 100 * 60) / burnPerDay +
      woodMoisture * 100 * 2.5) /
    60
  );
};

const burnCyclesPerDay = (hoursPerBurnTime: number) => {
  return 24 / hoursPerBurnTime;
};

// Dry Charcoal Wood
const estimationWoodUsedPerHopperPerBurnDry = (
  woodDensity: number,
  volOvenM3: number,
  airBetweenLogs: number
) => {
  return woodDensity * volOvenM3 * airBetweenLogs;
};

// Wet Charcoal Wood
const estimationWoodUsedPerBurnWet = (
  estWoodPerHopperPerBurnDry: number,
  woodMoisture: number
) => {
  return estWoodPerHopperPerBurnDry * (1 / (1 - woodMoisture));
};

const wetWoodNeededPerOvenPerFullDayWetCharcoalWood = (
  burnPerDayCycles: number,
  estWoodUsedPerBurnWet: number
) => {
  return burnPerDayCycles * estWoodUsedPerBurnWet * 2;
};

const charcoalPerDay = (
  dryFireBoxWoodNeededPerBurnForOneOven: number,
  estWoodPerHopperPerBurnDry: number,
  burnPerDayCycles: number,
  dryWoodToCharcoalConversionRatio: number
) => {
  return (
    ((dryFireBoxWoodNeededPerBurnForOneOven / 2 + estWoodPerHopperPerBurnDry) *
      2 *
      burnPerDayCycles) /
    dryWoodToCharcoalConversionRatio
  );
};

export {
  burnCyclesPerDay,
  timeInHoursPerBurn,
  estimationWoodUsedPerHopperPerBurnDry,
  estimationWoodUsedPerBurnWet,
  wetWoodNeededPerOvenPerFullDayWetCharcoalWood,
  charcoalPerDay,
};
