"use strict";

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
var hre = require("hardhat");

function main() {
  var currentTimestampInSeconds, ONE_YEAR_IN_SECS, unlockTime, Registry, registry;
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          currentTimestampInSeconds = Math.round(Date.now() / 1000);
          ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
          unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS; // const lockedAmount = hre.ethers.utils.parseEther("1");
          // const Lock = await hre.ethers.getContractFactory("Lock");
          // const lock = await Lock.deploy(unlockTime, { value: lockedAmount });
          // await lock.deployed();
          // console.log(
          //   `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
          // );

          _context.next = 5;
          return regeneratorRuntime.awrap(hre.ethers.getContractFactory("MarriageRegistry"));

        case 5:
          Registry = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(Registry.deploy());

        case 8:
          registry = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(registry.deployed());

        case 11:
          console.log("Contract deployed to ".concat(registry.address));

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
} // We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.


main()["catch"](function (error) {
  console.error(error);
  process.exitCode = 1;
});