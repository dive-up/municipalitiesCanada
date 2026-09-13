import * as fs from "node:fs";
import * as alberta from "./rawData/alberta/municipalities.js";
import * as britishColumbia from "./rawData/british-columbia/municipalities.js";
import * as manitoba from "./rawData/manitoba/municipalities.js";
import * as newBrunswick from "./rawData/new-brunswick/municipalities.js";
import * as newFoundlandAndLabrador from "./rawData/new-foundland-and-labrador/municipalities.js";
import * as novaScotia from "./rawData/nova-scotia/municipalities.js";
import * as ontario from "./rawData/ontario/muncipalities.js";
import * as sasketchwan from "./rawData/sasketchwan/municipalities.js";
import * as princeEdwardIsland from "./rawData/prince-edward-Island/municipalities.js";
import * as northwestTerritories from "./rawData/northwest-territories/municipalities.js";
import * as nunavut from "./rawData/nunavut/municipalities.js";
import * as yukon from "./rawData/yukon/municipalities.js";

const provincesAndTerritories = [
  "ab",
  "bc",
  "mb",
  "nb",
  "nl",
  "ns",
  "on",
  "sk",
  "pe",
  "nt",
  "nu",
  "yt",
];

const structure = {
  ab: ["name", "status"],
  bc: ["name", "status", "regionalDistrict"],
  mb: ["name", "status"],
  nb: ["name", "status", "regionalServiceCommission"],
  nl: ["name", "status"],
  ns: ["name", "status", "county"],
  on: ["name", "status", "censusDivision"],
  sk: ["name", "status", "ruralMunicipality"],
  pe: ["name", "status", "county"],
  nt: ["name", "status"],
  nu: ["name", "status"],
  yt: ["name", "status", "officialName"],
};

formatFromData(provincesAndTerritories, structure);

function formatFromData(filterList, filterStructure) {
  const data = [];

  filterList.forEach((element) => {
    const dataStructure = filterStructure[element];

    switch (element) {
      case "ab":
        data.push(organizeData(element, dataStructure, alberta));
        break;

      case "bc":
        data.push(organizeData(element, dataStructure, britishColumbia));
        break;

      case "mb":
        data.push(organizeData(element, dataStructure, manitoba));
        break;

      case "nb":
        data.push(organizeData(element, dataStructure, newBrunswick));
        break;

      case "nl":
        data.push(
          organizeData(element, dataStructure, newFoundlandAndLabrador),
        );
        break;

      case "ns":
        data.push(organizeData(element, dataStructure, novaScotia));
        break;

      case "on":
        data.push(organizeData(element, dataStructure, ontario));
        break;

      case "sk":
        data.push(organizeData(element, dataStructure, sasketchwan));
        break;

      case "pe":
        data.push(organizeData(element, dataStructure, princeEdwardIsland));
        break;

      case "nt":
        data.push(organizeData(element, dataStructure, northwestTerritories));
        break;

      case "nu":
        data.push(organizeData(element, dataStructure, nunavut));
        break;

      case "yt":
        data.push(organizeData(element, dataStructure, yukon));
        break;

      default:
        console.log("No more data");
        break;
    }
  });

  // console.log(JSON.stringify(data));
  writeToFile(data);
}

function organizeData(provinceOrTerritory, structure, data) {
  return {
    [provinceOrTerritory]: {
      description: data.description,
      municipalities: organizeMunicipalities(structure, data.municipalities),
    },
  };
}

function organizeMunicipalities(structure, municipalities) {
  const structuredMunicipalities = [];

  for (let i = 0; i < municipalities.length; i++) {
    const municipality = municipalities[i];
    if (municipality.length == 2) {
      structuredMunicipalities.push({
        name: municipality[0],
        status: municipality[1],
      });
    } else if (municipality.length == 1) {
      structuredMunicipalities.push({
        name: municipality[0],
      });
    } else if (municipality.length > 2) {
      const extraInfo = {};
      for (let i = 2; i < municipality.length; i++) {
        extraInfo[structure[i]] = municipality[i];
      }
      structuredMunicipalities.push({
        name: municipality[0],
        status: municipality[1],
        addInfo: extraInfo,
      });
    }
  }

  return structuredMunicipalities;
}

function writeToFile(data) {
  const writeData = JSON.stringify(data);

  fs.writeFile("municipalities.json", writeData, "utf-8", (err) => {
    if (err) {
      console.log("There was an error writing data to file.");
    }
    console.log("Data written to file.");
  });
}
