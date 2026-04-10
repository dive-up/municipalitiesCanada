import { upperTier, lowerTier } from "./rawData/ontario/muncipalities.js";
import * as fs from "node:fs";

const formattedLowerTierMunicipalities = [];
const formattedUpperTierMunicipalities = [];

lowerTier.forEach((record) => {
  formattedLowerTierMunicipalities.push(formatLowerTierMunicipalities(record));
});

formatUpperTierMunicipalities(formattedLowerTierMunicipalities);

writeToJSON(formattedUpperTierMunicipalities);

function writeToJSON(data) {
  const writeData = JSON.stringify(data);

  fs.writeFile("ontarioMunicipalities.json", writeData, "utf-8", (err) => {
    if (err) {
      console.log("There was an error write data to file.");
    }
    console.log("Data written to file.");
  });
}

function formatUpperTierMunicipalities(data) {
  const municpalityNamesComplete = removeDuplicateMunicipalityNames(data);

  const formattedData = [];

  for (let i = 0; i < municpalityNamesComplete.length; i++) {
    const members = [];

    for (let j = 0; j < data.length; j++) {
      if (data[j].partOf === municpalityNamesComplete[i]) {
        members.push(data[j]);
      }
    }

    formattedData.push({
      divisionName: municpalityNamesComplete[i],
      members: [...members],
    });
  }

  formattedData.forEach((record) => {
    if (upperTier.find((element) => element[0] === record.divisionName)) {
      record.divisionType =
        upperTier[
          upperTier.findIndex((element) => element[0] === record.divisionName)
        ][2];

      record.tier =
        upperTier[
          upperTier.findIndex((element) => element[0] === record.divisionName)
        ][1];
    } else {
      record.divisionType = "unknown";
      record.tier = "unknown";
    }
  });

  formattedData.forEach((element) =>
    formattedUpperTierMunicipalities.push(element),
  );
}

function formatLowerTierMunicipalities(data) {
  return {
    mName: data[0],
    tier: data[1],
    mType: data[2],
    partOf: data[3],
  };
}

function removeDuplicateMunicipalityNames(rawData) {
  const municipalityNames = [];
  rawData.forEach((record) => municipalityNames.push(record.partOf));

  const data = municipalityNames.toSorted();

  const mNames = [];

  for (let i = 0; i < data.length; i++) {
    if ((data[i] === data[i + 1]) === data[i + 2]) {
      data.shift();
    } else if (data[i] !== data[i + 1]) {
      mNames.push(data[i]);
    }
  }
  return mNames;
}
