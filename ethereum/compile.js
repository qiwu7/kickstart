const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

// Clear build folder
const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

// Read "Campaign.sol" from the contracts folder
const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");

// Compile both contracts with solidity compiler
const contracts = solc.compile(source, 1).contracts;

// Write output to the build directory
fs.ensureDirSync(buildPath);
for (let contractName in contracts) {
  fs.outputJsonSync(
    path.resolve(buildPath, contractName.replace(":", "") + ".json"),
    contracts[contractName]
  )
}
