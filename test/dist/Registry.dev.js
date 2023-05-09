"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

require('regenerator-runtime/runtime'); // Load dependencies


var _require = require("@nomicfoundation/hardhat-network-helpers"),
    time = _require.time,
    loadFixture = _require.loadFixture;

var _require2 = require("@nomicfoundation/hardhat-chai-matchers/withArgs"),
    anyValue = _require2.anyValue;

var _require3 = require("chai"),
    expect = _require3.expect;

var _require4 = require("hardhat"),
    ethers = _require4.ethers;

var _require5 = require("ethers"),
    BigNumber = _require5.BigNumber; // Start test block


describe("MarriageRegistry", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  function deployFixture() {
    var _ref, _ref2, firstPartner, secondPartner, firstWitness, secondWitness, officiant, MarriageRegistry, registry;

    return regeneratorRuntime.async(function deployFixture$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(ethers.getSigners());

          case 2:
            _ref = _context.sent;
            _ref2 = _slicedToArray(_ref, 5);
            firstPartner = _ref2[0];
            secondPartner = _ref2[1];
            firstWitness = _ref2[2];
            secondWitness = _ref2[3];
            officiant = _ref2[4];
            _context.next = 11;
            return regeneratorRuntime.awrap(ethers.getContractFactory("MarriageRegistry"));

          case 11:
            MarriageRegistry = _context.sent;
            _context.next = 14;
            return regeneratorRuntime.awrap(MarriageRegistry.deploy());

          case 14:
            registry = _context.sent;
            return _context.abrupt("return", {
              registry: registry,
              firstPartner: firstPartner,
              secondPartner: secondPartner,
              officiant: officiant,
              firstWitness: firstWitness,
              secondWitness: secondWitness
            });

          case 16:
          case "end":
            return _context.stop();
        }
      }
    });
  } // Fixture for testing all code related to officiants


  function deployOfficiantFixture() {
    var _ref3, _ref4, rootOfficiant, intermediateOfficiant, leafOfficiant, nonOfficiant, MarriageRegistry, registry;

    return regeneratorRuntime.async(function deployOfficiantFixture$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(ethers.getSigners());

          case 2:
            _ref3 = _context2.sent;
            _ref4 = _slicedToArray(_ref3, 4);
            rootOfficiant = _ref4[0];
            intermediateOfficiant = _ref4[1];
            leafOfficiant = _ref4[2];
            nonOfficiant = _ref4[3];
            _context2.next = 10;
            return regeneratorRuntime.awrap(ethers.getContractFactory("MarriageRegistry"));

          case 10:
            MarriageRegistry = _context2.sent;
            _context2.next = 13;
            return regeneratorRuntime.awrap(MarriageRegistry.deploy());

          case 13:
            registry = _context2.sent;
            return _context2.abrupt("return", {
              registry: registry,
              rootOfficiant: rootOfficiant,
              intermediateOfficiant: intermediateOfficiant,
              leafOfficiant: leafOfficiant,
              nonOfficiant: nonOfficiant
            });

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    });
  }

  describe("First Partner Sign", function () {
    it("Shouldn't fail", function _callee() {
      var _ref5, registry, secondPartner, firstWitness, secondWitness;

      return regeneratorRuntime.async(function _callee$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(loadFixture(deployFixture));

            case 2:
              _ref5 = _context3.sent;
              registry = _ref5.registry;
              secondPartner = _ref5.secondPartner;
              firstWitness = _ref5.firstWitness;
              secondWitness = _ref5.secondWitness;
              _context3.next = 9;
              return regeneratorRuntime.awrap(expect(registry.firstPartnerSign("John", "Jill", "Will", "Whitney", secondPartner.address, firstWitness.address, secondWitness.address, "11 Feb 2023", "Singapore")).not.to.be.reverted);

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      });
    });
    it("Should return correct number of records", function _callee2() {
      var _ref6, registry, secondPartner, firstWitness, secondWitness;

      return regeneratorRuntime.async(function _callee2$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(loadFixture(deployFixture));

            case 2:
              _ref6 = _context4.sent;
              registry = _ref6.registry;
              secondPartner = _ref6.secondPartner;
              firstWitness = _ref6.firstWitness;
              secondWitness = _ref6.secondWitness;
              _context4.next = 9;
              return regeneratorRuntime.awrap(registry.firstPartnerSign("John", "Jill", "Will", "Whitney", secondPartner.address, firstWitness.address, secondWitness.address, "11 Feb 2023", "Singapore"));

            case 9:
              _context4.t0 = expect;
              _context4.next = 12;
              return regeneratorRuntime.awrap(registry.getNumRecords());

            case 12:
              _context4.t1 = _context4.sent;
              (0, _context4.t0)(_context4.t1).to.equal(1);

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      });
    });
  });
  describe("Second Partner Sign", function () {
    it("Should revert with the right error if called from another account", function _callee3() {
      var _ref7, registry, firstPartner, secondPartner, firstWitness, secondWitness;

      return regeneratorRuntime.async(function _callee3$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(loadFixture(deployFixture));

            case 2:
              _ref7 = _context5.sent;
              registry = _ref7.registry;
              firstPartner = _ref7.firstPartner;
              secondPartner = _ref7.secondPartner;
              firstWitness = _ref7.firstWitness;
              secondWitness = _ref7.secondWitness;
              _context5.next = 10;
              return regeneratorRuntime.awrap(registry.firstPartnerSign("John", "Jill", "Will", "Whitney", secondPartner.address, firstWitness.address, secondWitness.address, "11 Feb 2023", "Singapore"));

            case 10:
              _context5.next = 12;
              return regeneratorRuntime.awrap(expect(registry.secondPartnerSign(firstPartner.address)).to.be.revertedWith("Only second partner can sign"));

            case 12:
            case "end":
              return _context5.stop();
          }
        }
      });
    });
    it("Shouldn't revert if called from second partner's account", function _callee4() {
      var _ref8, registry, firstPartner, secondPartner, firstWitness, secondWitness;

      return regeneratorRuntime.async(function _callee4$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(loadFixture(deployFixture));

            case 2:
              _ref8 = _context6.sent;
              registry = _ref8.registry;
              firstPartner = _ref8.firstPartner;
              secondPartner = _ref8.secondPartner;
              firstWitness = _ref8.firstWitness;
              secondWitness = _ref8.secondWitness;
              _context6.next = 10;
              return regeneratorRuntime.awrap(registry.firstPartnerSign("John", "Jill", "Will", "Whitney", secondPartner.address, firstWitness.address, secondWitness.address, "11 Feb 2023", "Singapore"));

            case 10:
              _context6.next = 12;
              return regeneratorRuntime.awrap(expect(registry.connect(secondPartner).secondPartnerSign(firstPartner.address)).not.to.be.reverted);

            case 12:
            case "end":
              return _context6.stop();
          }
        }
      });
    });
    it("Should record that second partner has signed", function _callee5() {
      var _ref9, registry, firstPartner, secondPartner, firstWitness, secondWitness;

      return regeneratorRuntime.async(function _callee5$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(loadFixture(deployFixture));

            case 2:
              _ref9 = _context7.sent;
              registry = _ref9.registry;
              firstPartner = _ref9.firstPartner;
              secondPartner = _ref9.secondPartner;
              firstWitness = _ref9.firstWitness;
              secondWitness = _ref9.secondWitness;
              _context7.next = 10;
              return regeneratorRuntime.awrap(registry.firstPartnerSign("John", "Jill", "Will", "Whitney", secondPartner.address, firstWitness.address, secondWitness.address, "11 Feb 2023", "Singapore"));

            case 10:
              _context7.next = 12;
              return regeneratorRuntime.awrap(registry.connect(secondPartner).secondPartnerSign(firstPartner.address));

            case 12:
              _context7.next = 14;
              return regeneratorRuntime.awrap(registry.connect(firstWitness).firstWitnessSignOff(firstPartner.address));

            case 14:
              _context7.t0 = expect;
              _context7.next = 17;
              return regeneratorRuntime.awrap(registry.getSecondPartnerSigned(firstPartner.address));

            case 17:
              _context7.t1 = _context7.sent;
              (0, _context7.t0)(_context7.t1).to.equal(true);

            case 19:
            case "end":
              return _context7.stop();
          }
        }
      });
    });
  });
  describe("First Witness Signs Off", function () {
    it("Shouldn't fail if both partners have signed", function _callee6() {
      var _ref10, registry, firstPartner, secondPartner, firstWitness, secondWitness;

      return regeneratorRuntime.async(function _callee6$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(loadFixture(deployFixture));

            case 2:
              _ref10 = _context8.sent;
              registry = _ref10.registry;
              firstPartner = _ref10.firstPartner;
              secondPartner = _ref10.secondPartner;
              firstWitness = _ref10.firstWitness;
              secondWitness = _ref10.secondWitness;
              _context8.next = 10;
              return regeneratorRuntime.awrap(registry.firstPartnerSign("John", "Jill", "Will", "Whitney", secondPartner.address, firstWitness.address, secondWitness.address, "11 Feb 2023", "Singapore"));

            case 10:
              _context8.next = 12;
              return regeneratorRuntime.awrap(registry.connect(secondPartner).secondPartnerSign(firstPartner.address));

            case 12:
              _context8.next = 14;
              return regeneratorRuntime.awrap(expect(registry.connect(firstWitness).firstWitnessSignOff(firstPartner.address)).not.to.be.reverted);

            case 14:
            case "end":
              return _context8.stop();
          }
        }
      });
    });
    it("Should fail if second partner hasn't signed", function _callee7() {
      var _ref11, registry, firstPartner, secondPartner, firstWitness, secondWitness;

      return regeneratorRuntime.async(function _callee7$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(loadFixture(deployFixture));

            case 2:
              _ref11 = _context9.sent;
              registry = _ref11.registry;
              firstPartner = _ref11.firstPartner;
              secondPartner = _ref11.secondPartner;
              firstWitness = _ref11.firstWitness;
              secondWitness = _ref11.secondWitness;
              _context9.next = 10;
              return regeneratorRuntime.awrap(registry.firstPartnerSign("John", "Jill", "Will", "Whitney", secondPartner.address, firstWitness.address, secondWitness.address, "11 Feb 2023", "Singapore"));

            case 10:
              _context9.next = 12;
              return regeneratorRuntime.awrap(expect(registry.connect(firstWitness).firstWitnessSignOff(firstPartner.address)).to.be.revertedWith("Second partner must sign"));

            case 12:
            case "end":
              return _context9.stop();
          }
        }
      });
    });
    it("Should fail if signer isn't the first witness", function _callee8() {
      var _ref12, registry, firstPartner, secondPartner, firstWitness, secondWitness;

      return regeneratorRuntime.async(function _callee8$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return regeneratorRuntime.awrap(loadFixture(deployFixture));

            case 2:
              _ref12 = _context10.sent;
              registry = _ref12.registry;
              firstPartner = _ref12.firstPartner;
              secondPartner = _ref12.secondPartner;
              firstWitness = _ref12.firstWitness;
              secondWitness = _ref12.secondWitness;
              _context10.next = 10;
              return regeneratorRuntime.awrap(registry.firstPartnerSign("John", "Jill", "Will", "Whitney", secondPartner.address, firstWitness.address, secondWitness.address, "11 Feb 2023", "Singapore"));

            case 10:
              _context10.next = 12;
              return regeneratorRuntime.awrap(registry.connect(secondPartner).secondPartnerSign(firstPartner.address));

            case 12:
              _context10.next = 14;
              return regeneratorRuntime.awrap(expect(registry.connect(secondWitness).firstWitnessSignOff(firstPartner.address)).to.be.revertedWith("Only first witness can sign"));

            case 14:
            case "end":
              return _context10.stop();
          }
        }
      });
    });
    it("Should record that first witness has signed", function _callee9() {
      var _ref13, registry, firstPartner, secondPartner, firstWitness, secondWitness;

      return regeneratorRuntime.async(function _callee9$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return regeneratorRuntime.awrap(loadFixture(deployFixture));

            case 2:
              _ref13 = _context11.sent;
              registry = _ref13.registry;
              firstPartner = _ref13.firstPartner;
              secondPartner = _ref13.secondPartner;
              firstWitness = _ref13.firstWitness;
              secondWitness = _ref13.secondWitness;
              _context11.next = 10;
              return regeneratorRuntime.awrap(registry.firstPartnerSign("John", "Jill", "Will", "Whitney", secondPartner.address, firstWitness.address, secondWitness.address, "11 Feb 2023", "Singapore"));

            case 10:
              _context11.next = 12;
              return regeneratorRuntime.awrap(registry.connect(secondPartner).secondPartnerSign(firstPartner.address));

            case 12:
              _context11.next = 14;
              return regeneratorRuntime.awrap(registry.connect(firstWitness).firstWitnessSignOff(firstPartner.address));

            case 14:
              _context11.t0 = expect;
              _context11.next = 17;
              return regeneratorRuntime.awrap(registry.getFirstWitnessSigned(firstPartner.address));

            case 17:
              _context11.t1 = _context11.sent;
              (0, _context11.t0)(_context11.t1).to.equal(true);

            case 19:
            case "end":
              return _context11.stop();
          }
        }
      });
    });
  });
  describe("Second Witness Signs Off", function () {
    it("Shouldn't fail if both partners have signed", function _callee10() {
      var _ref14, registry, firstPartner, secondPartner, firstWitness, secondWitness;

      return regeneratorRuntime.async(function _callee10$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return regeneratorRuntime.awrap(loadFixture(deployFixture));

            case 2:
              _ref14 = _context12.sent;
              registry = _ref14.registry;
              firstPartner = _ref14.firstPartner;
              secondPartner = _ref14.secondPartner;
              firstWitness = _ref14.firstWitness;
              secondWitness = _ref14.secondWitness;
              _context12.next = 10;
              return regeneratorRuntime.awrap(registry.firstPartnerSign("John", "Jill", "Will", "Whitney", secondPartner.address, firstWitness.address, secondWitness.address, "11 Feb 2023", "Singapore"));

            case 10:
              _context12.next = 12;
              return regeneratorRuntime.awrap(registry.connect(secondPartner).secondPartnerSign(firstPartner.address));

            case 12:
              _context12.next = 14;
              return regeneratorRuntime.awrap(expect(registry.connect(secondWitness).secondWitnessSignOff(firstPartner.address)).not.to.be.reverted);

            case 14:
            case "end":
              return _context12.stop();
          }
        }
      });
    });
    it("Should fail if second partner hasn't signed", function _callee11() {
      var _ref15, registry, firstPartner, secondPartner, firstWitness, secondWitness;

      return regeneratorRuntime.async(function _callee11$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return regeneratorRuntime.awrap(loadFixture(deployFixture));

            case 2:
              _ref15 = _context13.sent;
              registry = _ref15.registry;
              firstPartner = _ref15.firstPartner;
              secondPartner = _ref15.secondPartner;
              firstWitness = _ref15.firstWitness;
              secondWitness = _ref15.secondWitness;
              _context13.next = 10;
              return regeneratorRuntime.awrap(registry.firstPartnerSign("John", "Jill", "Will", "Whitney", secondPartner.address, firstWitness.address, secondWitness.address, "11 Feb 2023", "Singapore"));

            case 10:
              _context13.next = 12;
              return regeneratorRuntime.awrap(expect(registry.connect(secondWitness).secondWitnessSignOff(firstPartner.address)).to.be.revertedWith("Second partner must sign"));

            case 12:
            case "end":
              return _context13.stop();
          }
        }
      });
    });
    it("Should fail if signer isn't the second witness", function _callee12() {
      var _ref16, registry, firstPartner, secondPartner, firstWitness, secondWitness;

      return regeneratorRuntime.async(function _callee12$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return regeneratorRuntime.awrap(loadFixture(deployFixture));

            case 2:
              _ref16 = _context14.sent;
              registry = _ref16.registry;
              firstPartner = _ref16.firstPartner;
              secondPartner = _ref16.secondPartner;
              firstWitness = _ref16.firstWitness;
              secondWitness = _ref16.secondWitness;
              _context14.next = 10;
              return regeneratorRuntime.awrap(registry.firstPartnerSign("John", "Jill", "Will", "Whitney", secondPartner.address, firstWitness.address, secondWitness.address, "11 Feb 2023", "Singapore"));

            case 10:
              _context14.next = 12;
              return regeneratorRuntime.awrap(registry.connect(secondPartner).secondPartnerSign(firstPartner.address));

            case 12:
              _context14.next = 14;
              return regeneratorRuntime.awrap(expect(registry.connect(firstWitness).secondWitnessSignOff(firstPartner.address)).to.be.revertedWith("Only second witness can sign"));

            case 14:
            case "end":
              return _context14.stop();
          }
        }
      });
    });
    it("Should record that second witness has signed", function _callee13() {
      var _ref17, registry, firstPartner, secondPartner, firstWitness, secondWitness;

      return regeneratorRuntime.async(function _callee13$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return regeneratorRuntime.awrap(loadFixture(deployFixture));

            case 2:
              _ref17 = _context15.sent;
              registry = _ref17.registry;
              firstPartner = _ref17.firstPartner;
              secondPartner = _ref17.secondPartner;
              firstWitness = _ref17.firstWitness;
              secondWitness = _ref17.secondWitness;
              _context15.next = 10;
              return regeneratorRuntime.awrap(registry.firstPartnerSign("John", "Jill", "Will", "Whitney", secondPartner.address, firstWitness.address, secondWitness.address, "11 Feb 2023", "Singapore"));

            case 10:
              _context15.next = 12;
              return regeneratorRuntime.awrap(registry.connect(secondPartner).secondPartnerSign(firstPartner.address));

            case 12:
              _context15.next = 14;
              return regeneratorRuntime.awrap(registry.connect(secondWitness).secondWitnessSignOff(firstPartner.address));

            case 14:
              _context15.t0 = expect;
              _context15.next = 17;
              return regeneratorRuntime.awrap(registry.getSecondWitnessSigned(firstPartner.address));

            case 17:
              _context15.t1 = _context15.sent;
              (0, _context15.t0)(_context15.t1).to.equal(true);

            case 19:
            case "end":
              return _context15.stop();
          }
        }
      });
    });
  });
  describe("Officiant Signs Off", function () {
    it("Shouldn't fail", function _callee14() {
      var _ref18, registry, firstPartner, secondPartner, firstWitness, secondWitness;

      return regeneratorRuntime.async(function _callee14$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return regeneratorRuntime.awrap(loadFixture(deployFixture));

            case 2:
              _ref18 = _context16.sent;
              registry = _ref18.registry;
              firstPartner = _ref18.firstPartner;
              secondPartner = _ref18.secondPartner;
              firstWitness = _ref18.firstWitness;
              secondWitness = _ref18.secondWitness;
              _context16.next = 10;
              return regeneratorRuntime.awrap(registry.firstPartnerSign("John", "Jill", "Will", "Whitney", secondPartner.address, firstWitness.address, secondWitness.address, "11 Feb 2023", "Singapore"));

            case 10:
              _context16.next = 12;
              return regeneratorRuntime.awrap(registry.connect(secondPartner).secondPartnerSign(firstPartner.address));

            case 12:
              _context16.next = 14;
              return regeneratorRuntime.awrap(registry.connect(firstWitness).firstWitnessSignOff(firstPartner.address));

            case 14:
              _context16.next = 16;
              return regeneratorRuntime.awrap(registry.connect(secondWitness).secondWitnessSignOff(firstPartner.address));

            case 16:
              _context16.next = 18;
              return regeneratorRuntime.awrap(expect(registry.officiantSignOff(firstPartner.address)).not.to.be.reverted);

            case 18:
            case "end":
              return _context16.stop();
          }
        }
      });
    });
    it("Should fail if second partner hasn't signed", function _callee15() {
      var _ref19, registry, firstPartner, secondPartner, firstWitness, secondWitness;

      return regeneratorRuntime.async(function _callee15$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.next = 2;
              return regeneratorRuntime.awrap(loadFixture(deployFixture));

            case 2:
              _ref19 = _context17.sent;
              registry = _ref19.registry;
              firstPartner = _ref19.firstPartner;
              secondPartner = _ref19.secondPartner;
              firstWitness = _ref19.firstWitness;
              secondWitness = _ref19.secondWitness;
              _context17.next = 10;
              return regeneratorRuntime.awrap(registry.firstPartnerSign("John", "Jill", "Will", "Whitney", secondPartner.address, firstWitness.address, secondWitness.address, "11 Feb 2023", "Singapore"));

            case 10:
              _context17.next = 12;
              return regeneratorRuntime.awrap(expect(registry.officiantSignOff(firstPartner.address)).to.be.revertedWith("Second partner must sign"));

            case 12:
            case "end":
              return _context17.stop();
          }
        }
      });
    });
    it("Should fail if first witness hasn't signed", function _callee16() {
      var _ref20, registry, firstPartner, secondPartner, firstWitness, secondWitness;

      return regeneratorRuntime.async(function _callee16$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.next = 2;
              return regeneratorRuntime.awrap(loadFixture(deployFixture));

            case 2:
              _ref20 = _context18.sent;
              registry = _ref20.registry;
              firstPartner = _ref20.firstPartner;
              secondPartner = _ref20.secondPartner;
              firstWitness = _ref20.firstWitness;
              secondWitness = _ref20.secondWitness;
              _context18.next = 10;
              return regeneratorRuntime.awrap(registry.firstPartnerSign("John", "Jill", "Will", "Whitney", secondPartner.address, firstWitness.address, secondWitness.address, "11 Feb 2023", "Singapore"));

            case 10:
              _context18.next = 12;
              return regeneratorRuntime.awrap(registry.connect(secondPartner).secondPartnerSign(firstPartner.address));

            case 12:
              _context18.next = 14;
              return regeneratorRuntime.awrap(expect(registry.officiantSignOff(firstPartner.address)).to.be.revertedWith("First witness must sign"));

            case 14:
            case "end":
              return _context18.stop();
          }
        }
      });
    });
    it("Should fail if second witness hasn't signed", function _callee17() {
      var _ref21, registry, firstPartner, secondPartner, firstWitness, secondWitness;

      return regeneratorRuntime.async(function _callee17$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _context19.next = 2;
              return regeneratorRuntime.awrap(loadFixture(deployFixture));

            case 2:
              _ref21 = _context19.sent;
              registry = _ref21.registry;
              firstPartner = _ref21.firstPartner;
              secondPartner = _ref21.secondPartner;
              firstWitness = _ref21.firstWitness;
              secondWitness = _ref21.secondWitness;
              _context19.next = 10;
              return regeneratorRuntime.awrap(registry.firstPartnerSign("John", "Jill", "Will", "Whitney", secondPartner.address, firstWitness.address, secondWitness.address, "11 Feb 2023", "Singapore"));

            case 10:
              _context19.next = 12;
              return regeneratorRuntime.awrap(registry.connect(secondPartner).secondPartnerSign(firstPartner.address));

            case 12:
              _context19.next = 14;
              return regeneratorRuntime.awrap(registry.connect(firstWitness).firstWitnessSignOff(firstPartner.address));

            case 14:
              _context19.next = 16;
              return regeneratorRuntime.awrap(expect(registry.officiantSignOff(firstPartner.address)).to.be.revertedWith("Second witness must sign"));

            case 16:
            case "end":
              return _context19.stop();
          }
        }
      });
    });
  });
  describe("Add First Root Officiant", function () {
    it("Should add officiant as root authority", function _callee18() {
      var _ref22, registry, rootOfficiant;

      return regeneratorRuntime.async(function _callee18$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _context20.next = 2;
              return regeneratorRuntime.awrap(loadFixture(deployOfficiantFixture));

            case 2:
              _ref22 = _context20.sent;
              registry = _ref22.registry;
              rootOfficiant = _ref22.rootOfficiant;
              _context20.next = 7;
              return regeneratorRuntime.awrap(expect(registry.addFirstRootOfficiant("Rachel", rootOfficiant.address, "Singapore")).not.to.be.reverted);

            case 7:
            case "end":
              return _context20.stop();
          }
        }
      });
    });
    it("Shouldn't add officiant as root officiant when called from another account", function _callee19() {
      var _ref23, registry, rootOfficiant, nonOfficiant;

      return regeneratorRuntime.async(function _callee19$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              _context21.next = 2;
              return regeneratorRuntime.awrap(loadFixture(deployOfficiantFixture));

            case 2:
              _ref23 = _context21.sent;
              registry = _ref23.registry;
              rootOfficiant = _ref23.rootOfficiant;
              nonOfficiant = _ref23.nonOfficiant;
              _context21.next = 8;
              return regeneratorRuntime.awrap(expect(registry.connect(nonOfficiant).addFirstRootOfficiant("Rachel", rootOfficiant.address, "Singapore")).to.be.revertedWith("Officiant address must be yours"));

            case 8:
            case "end":
              return _context21.stop();
          }
        }
      });
    });
    it("Should record officiant as active root authority", function _callee20() {
      var _ref24, registry, rootOfficiant;

      return regeneratorRuntime.async(function _callee20$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              _context22.next = 2;
              return regeneratorRuntime.awrap(loadFixture(deployOfficiantFixture));

            case 2:
              _ref24 = _context22.sent;
              registry = _ref24.registry;
              rootOfficiant = _ref24.rootOfficiant;
              _context22.next = 7;
              return regeneratorRuntime.awrap(registry.addFirstRootOfficiant("Rachel", rootOfficiant.address, "Singapore"));

            case 7:
              _context22.t0 = expect;
              _context22.next = 10;
              return regeneratorRuntime.awrap(registry.isOfficiantActive(rootOfficiant.address));

            case 10:
              _context22.t1 = _context22.sent;
              (0, _context22.t0)(_context22.t1).to.equal(true);

            case 12:
            case "end":
              return _context22.stop();
          }
        }
      });
    });
  });
  describe("Add Subsequent Officiants", function () {
    it("Should add officiant as root authority", function _callee21() {
      var _ref25, registry, rootOfficiant, nonOfficiant;

      return regeneratorRuntime.async(function _callee21$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              _context23.next = 2;
              return regeneratorRuntime.awrap(loadFixture(deployOfficiantFixture));

            case 2:
              _ref25 = _context23.sent;
              registry = _ref25.registry;
              rootOfficiant = _ref25.rootOfficiant;
              nonOfficiant = _ref25.nonOfficiant;
              _context23.next = 8;
              return regeneratorRuntime.awrap(registry.addFirstRootOfficiant("Rachel", rootOfficiant.address, "Singapore"));

            case 8:
              _context23.next = 10;
              return regeneratorRuntime.awrap(expect(registry.addOfficiant("Randy", nonOfficiant.address, "Singapore", rootOfficiant.address, rootOfficiant.address, 2)).not.to.be.reverted);

            case 10:
            case "end":
              return _context23.stop();
          }
        }
      });
    });
    it("Should record officiant as active root authority", function _callee22() {
      var _ref26, registry, rootOfficiant, nonOfficiant;

      return regeneratorRuntime.async(function _callee22$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              _context24.next = 2;
              return regeneratorRuntime.awrap(loadFixture(deployOfficiantFixture));

            case 2:
              _ref26 = _context24.sent;
              registry = _ref26.registry;
              rootOfficiant = _ref26.rootOfficiant;
              nonOfficiant = _ref26.nonOfficiant;
              _context24.next = 8;
              return regeneratorRuntime.awrap(registry.addFirstRootOfficiant("Rachel", rootOfficiant.address, "Singapore"));

            case 8:
              _context24.next = 10;
              return regeneratorRuntime.awrap(registry.addOfficiant("Randy", nonOfficiant.address, "Singapore", rootOfficiant.address, rootOfficiant.address, 2));

            case 10:
              _context24.t0 = expect;
              _context24.next = 13;
              return regeneratorRuntime.awrap(registry.isOfficiantActive(nonOfficiant.address));

            case 13:
              _context24.t1 = _context24.sent;
              (0, _context24.t0)(_context24.t1).to.equal(true);

            case 15:
            case "end":
              return _context24.stop();
          }
        }
      });
    });
    it("Should have correct permission level", function _callee23() {
      var _ref27, registry, rootOfficiant, nonOfficiant;

      return regeneratorRuntime.async(function _callee23$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              _context25.next = 2;
              return regeneratorRuntime.awrap(loadFixture(deployOfficiantFixture));

            case 2:
              _ref27 = _context25.sent;
              registry = _ref27.registry;
              rootOfficiant = _ref27.rootOfficiant;
              nonOfficiant = _ref27.nonOfficiant;
              _context25.next = 8;
              return regeneratorRuntime.awrap(registry.addFirstRootOfficiant("Rachel", rootOfficiant.address, "Singapore"));

            case 8:
              _context25.next = 10;
              return regeneratorRuntime.awrap(registry.addOfficiant("Randy", nonOfficiant.address, "Singapore", rootOfficiant.address, rootOfficiant.address, 2));

            case 10:
              _context25.t0 = expect;
              _context25.next = 13;
              return regeneratorRuntime.awrap(registry.getOfficiantPermissions(nonOfficiant.address));

            case 13:
              _context25.t1 = _context25.sent;
              (0, _context25.t0)(_context25.t1).to.equal(2);

            case 15:
            case "end":
              return _context25.stop();
          }
        }
      });
    });
    it("Should revert if caller isn't the issuing authority", function _callee24() {
      var _ref28, registry, rootOfficiant, nonOfficiant;

      return regeneratorRuntime.async(function _callee24$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              _context26.next = 2;
              return regeneratorRuntime.awrap(loadFixture(deployOfficiantFixture));

            case 2:
              _ref28 = _context26.sent;
              registry = _ref28.registry;
              rootOfficiant = _ref28.rootOfficiant;
              nonOfficiant = _ref28.nonOfficiant;
              _context26.next = 8;
              return regeneratorRuntime.awrap(registry.addFirstRootOfficiant("Rachel", rootOfficiant.address, "Singapore"));

            case 8:
              _context26.next = 10;
              return regeneratorRuntime.awrap(expect(registry.connect(nonOfficiant).addOfficiant("Randy", nonOfficiant.address, "Singapore", rootOfficiant.address, rootOfficiant.address, 2)).to.be.revertedWith("You must be the issuing authority"));

            case 10:
            case "end":
              return _context26.stop();
          }
        }
      });
    });
    it("Should revert if the issuing authority isn't active", function _callee25() {
      var _ref29, registry, rootOfficiant, intermediateOfficiant, nonOfficiant;

      return regeneratorRuntime.async(function _callee25$(_context27) {
        while (1) {
          switch (_context27.prev = _context27.next) {
            case 0:
              _context27.next = 2;
              return regeneratorRuntime.awrap(loadFixture(deployOfficiantFixture));

            case 2:
              _ref29 = _context27.sent;
              registry = _ref29.registry;
              rootOfficiant = _ref29.rootOfficiant;
              intermediateOfficiant = _ref29.intermediateOfficiant;
              nonOfficiant = _ref29.nonOfficiant;
              _context27.next = 9;
              return regeneratorRuntime.awrap(registry.addFirstRootOfficiant("Rachel", rootOfficiant.address, "Singapore"));

            case 9:
              _context27.next = 11;
              return regeneratorRuntime.awrap(registry.addOfficiant("Ian", intermediateOfficiant.address, "Singapore", rootOfficiant.address, rootOfficiant.address, 2));

            case 11:
              _context27.next = 13;
              return regeneratorRuntime.awrap(registry.removeOfficiant(intermediateOfficiant.address));

            case 13:
              _context27.next = 15;
              return regeneratorRuntime.awrap(expect(registry.connect(intermediateOfficiant).addOfficiant("Lee", nonOfficiant.address, "Singapore", intermediateOfficiant.address, rootOfficiant.address, 0)).to.be.revertedWith("Issuing authority must be active"));

            case 15:
            case "end":
              return _context27.stop();
          }
        }
      });
    });
    it("Should revert if new officiant's permission level is higher than issuing authority's", function _callee26() {
      var _ref30, registry, rootOfficiant, intermediateOfficiant, nonOfficiant;

      return regeneratorRuntime.async(function _callee26$(_context28) {
        while (1) {
          switch (_context28.prev = _context28.next) {
            case 0:
              _context28.next = 2;
              return regeneratorRuntime.awrap(loadFixture(deployOfficiantFixture));

            case 2:
              _ref30 = _context28.sent;
              registry = _ref30.registry;
              rootOfficiant = _ref30.rootOfficiant;
              intermediateOfficiant = _ref30.intermediateOfficiant;
              nonOfficiant = _ref30.nonOfficiant;
              _context28.next = 9;
              return regeneratorRuntime.awrap(registry.addFirstRootOfficiant("Rachel", rootOfficiant.address, "Singapore"));

            case 9:
              _context28.next = 11;
              return regeneratorRuntime.awrap(registry.addOfficiant("Ian", intermediateOfficiant.address, "Singapore", rootOfficiant.address, rootOfficiant.address, 1));

            case 11:
              _context28.next = 13;
              return regeneratorRuntime.awrap(expect(registry.connect(intermediateOfficiant).addOfficiant("Randy", nonOfficiant.address, "Singapore", intermediateOfficiant.address, rootOfficiant.address, 2)).to.be.revertedWith("Cannot issue permissions higher than your own"));

            case 13:
            case "end":
              return _context28.stop();
          }
        }
      });
    });
    it("Should revert if new officiant's root authority isn't the same as issuing authority's", function _callee27() {
      var _ref31, registry, rootOfficiant, intermediateOfficiant, leafOfficiant, nonOfficiant;

      return regeneratorRuntime.async(function _callee27$(_context29) {
        while (1) {
          switch (_context29.prev = _context29.next) {
            case 0:
              _context29.next = 2;
              return regeneratorRuntime.awrap(loadFixture(deployOfficiantFixture));

            case 2:
              _ref31 = _context29.sent;
              registry = _ref31.registry;
              rootOfficiant = _ref31.rootOfficiant;
              intermediateOfficiant = _ref31.intermediateOfficiant;
              leafOfficiant = _ref31.leafOfficiant;
              nonOfficiant = _ref31.nonOfficiant;
              _context29.next = 10;
              return regeneratorRuntime.awrap(registry.addFirstRootOfficiant("Rachel", rootOfficiant.address, "Singapore"));

            case 10:
              _context29.next = 12;
              return regeneratorRuntime.awrap(registry.addOfficiant("Ian", intermediateOfficiant.address, "Singapore", rootOfficiant.address, rootOfficiant.address, 1));

            case 12:
              _context29.next = 14;
              return regeneratorRuntime.awrap(expect(registry.connect(intermediateOfficiant).addOfficiant("Lee", leafOfficiant.address, "Singapore", intermediateOfficiant.address, nonOfficiant.address, 0)).to.be.revertedWith("Issuing authority and declared root authority must descend from the same root authority"));

            case 14:
            case "end":
              return _context29.stop();
          }
        }
      });
    });
  });
  describe("Remove Officiants", function () {
    it("Root officiant should be able to remove another root officiant", function _callee28() {
      var _ref32, registry, rootOfficiant, nonOfficiant;

      return regeneratorRuntime.async(function _callee28$(_context30) {
        while (1) {
          switch (_context30.prev = _context30.next) {
            case 0:
              _context30.next = 2;
              return regeneratorRuntime.awrap(loadFixture(deployOfficiantFixture));

            case 2:
              _ref32 = _context30.sent;
              registry = _ref32.registry;
              rootOfficiant = _ref32.rootOfficiant;
              nonOfficiant = _ref32.nonOfficiant;
              _context30.next = 8;
              return regeneratorRuntime.awrap(registry.addFirstRootOfficiant("Rachel", rootOfficiant.address, "Singapore"));

            case 8:
              _context30.next = 10;
              return regeneratorRuntime.awrap(registry.addOfficiant("Randy", nonOfficiant.address, "Singapore", rootOfficiant.address, rootOfficiant.address, 2));

            case 10:
              _context30.t0 = expect;
              _context30.next = 13;
              return regeneratorRuntime.awrap(registry.isOfficiantActive(nonOfficiant.address));

            case 13:
              _context30.t1 = _context30.sent;
              (0, _context30.t0)(_context30.t1).to.equal(true);
              _context30.next = 17;
              return regeneratorRuntime.awrap(registry.removeOfficiant(nonOfficiant.address));

            case 17:
              _context30.t2 = expect;
              _context30.next = 20;
              return regeneratorRuntime.awrap(registry.isOfficiantActive(nonOfficiant.address));

            case 20:
              _context30.t3 = _context30.sent;
              (0, _context30.t2)(_context30.t3).to.equal(false);

            case 22:
            case "end":
              return _context30.stop();
          }
        }
      });
    });
    it("Root officiant should be able to remove intermiediate officiants", function _callee29() {
      var _ref33, registry, rootOfficiant, nonOfficiant;

      return regeneratorRuntime.async(function _callee29$(_context31) {
        while (1) {
          switch (_context31.prev = _context31.next) {
            case 0:
              _context31.next = 2;
              return regeneratorRuntime.awrap(loadFixture(deployOfficiantFixture));

            case 2:
              _ref33 = _context31.sent;
              registry = _ref33.registry;
              rootOfficiant = _ref33.rootOfficiant;
              nonOfficiant = _ref33.nonOfficiant;
              _context31.next = 8;
              return regeneratorRuntime.awrap(registry.addFirstRootOfficiant("Rachel", rootOfficiant.address, "Singapore"));

            case 8:
              _context31.next = 10;
              return regeneratorRuntime.awrap(registry.addOfficiant("Ian", nonOfficiant.address, "Singapore", rootOfficiant.address, rootOfficiant.address, 1));

            case 10:
              _context31.t0 = expect;
              _context31.next = 13;
              return regeneratorRuntime.awrap(registry.isOfficiantActive(nonOfficiant.address));

            case 13:
              _context31.t1 = _context31.sent;
              (0, _context31.t0)(_context31.t1).to.equal(true);
              _context31.next = 17;
              return regeneratorRuntime.awrap(registry.removeOfficiant(nonOfficiant.address));

            case 17:
              _context31.t2 = expect;
              _context31.next = 20;
              return regeneratorRuntime.awrap(registry.isOfficiantActive(nonOfficiant.address));

            case 20:
              _context31.t3 = _context31.sent;
              (0, _context31.t2)(_context31.t3).to.equal(false);

            case 22:
            case "end":
              return _context31.stop();
          }
        }
      });
    });
    it("Root officiant should be able to remove leaf officiants", function _callee30() {
      var _ref34, registry, rootOfficiant, nonOfficiant;

      return regeneratorRuntime.async(function _callee30$(_context32) {
        while (1) {
          switch (_context32.prev = _context32.next) {
            case 0:
              _context32.next = 2;
              return regeneratorRuntime.awrap(loadFixture(deployOfficiantFixture));

            case 2:
              _ref34 = _context32.sent;
              registry = _ref34.registry;
              rootOfficiant = _ref34.rootOfficiant;
              nonOfficiant = _ref34.nonOfficiant;
              _context32.next = 8;
              return regeneratorRuntime.awrap(registry.addFirstRootOfficiant("Rachel", rootOfficiant.address, "Singapore"));

            case 8:
              _context32.next = 10;
              return regeneratorRuntime.awrap(registry.addOfficiant("Lee", nonOfficiant.address, "Singapore", rootOfficiant.address, rootOfficiant.address, 0));

            case 10:
              _context32.t0 = expect;
              _context32.next = 13;
              return regeneratorRuntime.awrap(registry.isOfficiantActive(nonOfficiant.address));

            case 13:
              _context32.t1 = _context32.sent;
              (0, _context32.t0)(_context32.t1).to.equal(true);
              _context32.next = 17;
              return regeneratorRuntime.awrap(registry.removeOfficiant(nonOfficiant.address));

            case 17:
              _context32.t2 = expect;
              _context32.next = 20;
              return regeneratorRuntime.awrap(registry.isOfficiantActive(nonOfficiant.address));

            case 20:
              _context32.t3 = _context32.sent;
              (0, _context32.t2)(_context32.t3).to.equal(false);

            case 22:
            case "end":
              return _context32.stop();
          }
        }
      });
    });
    it("Intermediate officiant should not be able to remove root officiant", function _callee31() {
      var _ref35, registry, rootOfficiant, intermediateOfficiant;

      return regeneratorRuntime.async(function _callee31$(_context33) {
        while (1) {
          switch (_context33.prev = _context33.next) {
            case 0:
              _context33.next = 2;
              return regeneratorRuntime.awrap(loadFixture(deployOfficiantFixture));

            case 2:
              _ref35 = _context33.sent;
              registry = _ref35.registry;
              rootOfficiant = _ref35.rootOfficiant;
              intermediateOfficiant = _ref35.intermediateOfficiant;
              _context33.next = 8;
              return regeneratorRuntime.awrap(registry.addFirstRootOfficiant("Rachel", rootOfficiant.address, "Singapore"));

            case 8:
              _context33.next = 10;
              return regeneratorRuntime.awrap(registry.addOfficiant("Ian", intermediateOfficiant.address, "Singapore", rootOfficiant.address, rootOfficiant.address, 1));

            case 10:
              _context33.t0 = expect;
              _context33.next = 13;
              return regeneratorRuntime.awrap(registry.isOfficiantActive(rootOfficiant.address));

            case 13:
              _context33.t1 = _context33.sent;
              (0, _context33.t0)(_context33.t1).to.equal(true);
              _context33.next = 17;
              return regeneratorRuntime.awrap(expect(registry.connect(intermediateOfficiant).removeOfficiant(rootOfficiant.address)).to.be.revertedWith("You must have higher or equal permissions to remove this officiant"));

            case 17:
            case "end":
              return _context33.stop();
          }
        }
      });
    });
    it("Intermediate officiant should be able to remove intermediate officiant", function _callee32() {
      var _ref36, registry, rootOfficiant, intermediateOfficiant, nonOfficiant;

      return regeneratorRuntime.async(function _callee32$(_context34) {
        while (1) {
          switch (_context34.prev = _context34.next) {
            case 0:
              _context34.next = 2;
              return regeneratorRuntime.awrap(loadFixture(deployOfficiantFixture));

            case 2:
              _ref36 = _context34.sent;
              registry = _ref36.registry;
              rootOfficiant = _ref36.rootOfficiant;
              intermediateOfficiant = _ref36.intermediateOfficiant;
              nonOfficiant = _ref36.nonOfficiant;
              _context34.next = 9;
              return regeneratorRuntime.awrap(registry.addFirstRootOfficiant("Rachel", rootOfficiant.address, "Singapore"));

            case 9:
              _context34.next = 11;
              return regeneratorRuntime.awrap(registry.addOfficiant("Ian", intermediateOfficiant.address, "Singapore", rootOfficiant.address, rootOfficiant.address, 1));

            case 11:
              _context34.next = 13;
              return regeneratorRuntime.awrap(registry.addOfficiant("Ivy", nonOfficiant.address, "Singapore", rootOfficiant.address, rootOfficiant.address, 1));

            case 13:
              _context34.t0 = expect;
              _context34.next = 16;
              return regeneratorRuntime.awrap(registry.isOfficiantActive(nonOfficiant.address));

            case 16:
              _context34.t1 = _context34.sent;
              (0, _context34.t0)(_context34.t1).to.equal(true);
              _context34.next = 20;
              return regeneratorRuntime.awrap(registry.connect(intermediateOfficiant).removeOfficiant(nonOfficiant.address));

            case 20:
              _context34.t2 = expect;
              _context34.next = 23;
              return regeneratorRuntime.awrap(registry.isOfficiantActive(nonOfficiant.address));

            case 23:
              _context34.t3 = _context34.sent;
              (0, _context34.t2)(_context34.t3).to.equal(false);

            case 25:
            case "end":
              return _context34.stop();
          }
        }
      });
    });
    it("Intermediate officiant should be able to remove leaf officiant", function _callee33() {
      var _ref37, registry, rootOfficiant, intermediateOfficiant, nonOfficiant;

      return regeneratorRuntime.async(function _callee33$(_context35) {
        while (1) {
          switch (_context35.prev = _context35.next) {
            case 0:
              _context35.next = 2;
              return regeneratorRuntime.awrap(loadFixture(deployOfficiantFixture));

            case 2:
              _ref37 = _context35.sent;
              registry = _ref37.registry;
              rootOfficiant = _ref37.rootOfficiant;
              intermediateOfficiant = _ref37.intermediateOfficiant;
              nonOfficiant = _ref37.nonOfficiant;
              _context35.next = 9;
              return regeneratorRuntime.awrap(registry.addFirstRootOfficiant("Rachel", rootOfficiant.address, "Singapore"));

            case 9:
              _context35.next = 11;
              return regeneratorRuntime.awrap(registry.addOfficiant("Ian", intermediateOfficiant.address, "Singapore", rootOfficiant.address, rootOfficiant.address, 1));

            case 11:
              _context35.next = 13;
              return regeneratorRuntime.awrap(registry.addOfficiant("Lee", nonOfficiant.address, "Singapore", rootOfficiant.address, rootOfficiant.address, 0));

            case 13:
              _context35.t0 = expect;
              _context35.next = 16;
              return regeneratorRuntime.awrap(registry.isOfficiantActive(nonOfficiant.address));

            case 16:
              _context35.t1 = _context35.sent;
              (0, _context35.t0)(_context35.t1).to.equal(true);
              _context35.next = 20;
              return regeneratorRuntime.awrap(registry.connect(intermediateOfficiant).removeOfficiant(nonOfficiant.address));

            case 20:
              _context35.t2 = expect;
              _context35.next = 23;
              return regeneratorRuntime.awrap(registry.isOfficiantActive(nonOfficiant.address));

            case 23:
              _context35.t3 = _context35.sent;
              (0, _context35.t2)(_context35.t3).to.equal(false);

            case 25:
            case "end":
              return _context35.stop();
          }
        }
      });
    });
    it("Leaf officiant should not be able to remove root officiant", function _callee34() {
      var _ref38, registry, rootOfficiant, leafOfficiant;

      return regeneratorRuntime.async(function _callee34$(_context36) {
        while (1) {
          switch (_context36.prev = _context36.next) {
            case 0:
              _context36.next = 2;
              return regeneratorRuntime.awrap(loadFixture(deployOfficiantFixture));

            case 2:
              _ref38 = _context36.sent;
              registry = _ref38.registry;
              rootOfficiant = _ref38.rootOfficiant;
              leafOfficiant = _ref38.leafOfficiant;
              _context36.next = 8;
              return regeneratorRuntime.awrap(registry.addFirstRootOfficiant("Rachel", rootOfficiant.address, "Singapore"));

            case 8:
              _context36.next = 10;
              return regeneratorRuntime.awrap(registry.addOfficiant("Lee", leafOfficiant.address, "Singapore", rootOfficiant.address, rootOfficiant.address, 0));

            case 10:
              _context36.t0 = expect;
              _context36.next = 13;
              return regeneratorRuntime.awrap(registry.isOfficiantActive(rootOfficiant.address));

            case 13:
              _context36.t1 = _context36.sent;
              (0, _context36.t0)(_context36.t1).to.equal(true);
              _context36.next = 17;
              return regeneratorRuntime.awrap(expect(registry.connect(leafOfficiant).removeOfficiant(rootOfficiant.address)).to.be.revertedWith("You must have higher or equal permissions to remove this officiant"));

            case 17:
            case "end":
              return _context36.stop();
          }
        }
      });
    });
    it("Leaf officiant should not be able to remove intermediate officiant", function _callee35() {
      var _ref39, registry, rootOfficiant, intermediateOfficiant, leafOfficiant;

      return regeneratorRuntime.async(function _callee35$(_context37) {
        while (1) {
          switch (_context37.prev = _context37.next) {
            case 0:
              _context37.next = 2;
              return regeneratorRuntime.awrap(loadFixture(deployOfficiantFixture));

            case 2:
              _ref39 = _context37.sent;
              registry = _ref39.registry;
              rootOfficiant = _ref39.rootOfficiant;
              intermediateOfficiant = _ref39.intermediateOfficiant;
              leafOfficiant = _ref39.leafOfficiant;
              _context37.next = 9;
              return regeneratorRuntime.awrap(registry.addFirstRootOfficiant("Rachel", rootOfficiant.address, "Singapore"));

            case 9:
              _context37.next = 11;
              return regeneratorRuntime.awrap(registry.addOfficiant("Ian", intermediateOfficiant.address, "Singapore", rootOfficiant.address, rootOfficiant.address, 1));

            case 11:
              _context37.next = 13;
              return regeneratorRuntime.awrap(registry.addOfficiant("Lee", leafOfficiant.address, "Singapore", rootOfficiant.address, rootOfficiant.address, 0));

            case 13:
              _context37.t0 = expect;
              _context37.next = 16;
              return regeneratorRuntime.awrap(registry.isOfficiantActive(intermediateOfficiant.address));

            case 16:
              _context37.t1 = _context37.sent;
              (0, _context37.t0)(_context37.t1).to.equal(true);
              _context37.next = 20;
              return regeneratorRuntime.awrap(expect(registry.connect(leafOfficiant).removeOfficiant(intermediateOfficiant.address)).to.be.revertedWith("You must have higher or equal permissions to remove this officiant"));

            case 20:
            case "end":
              return _context37.stop();
          }
        }
      });
    });
    it("Leaf officiant should not be able to remove intermediate officiant", function _callee36() {
      var _ref40, registry, rootOfficiant, leafOfficiant, nonOfficiant;

      return regeneratorRuntime.async(function _callee36$(_context38) {
        while (1) {
          switch (_context38.prev = _context38.next) {
            case 0:
              _context38.next = 2;
              return regeneratorRuntime.awrap(loadFixture(deployOfficiantFixture));

            case 2:
              _ref40 = _context38.sent;
              registry = _ref40.registry;
              rootOfficiant = _ref40.rootOfficiant;
              leafOfficiant = _ref40.leafOfficiant;
              nonOfficiant = _ref40.nonOfficiant;
              _context38.next = 9;
              return regeneratorRuntime.awrap(registry.addFirstRootOfficiant("Rachel", rootOfficiant.address, "Singapore"));

            case 9:
              _context38.next = 11;
              return regeneratorRuntime.awrap(registry.addOfficiant("Lee", leafOfficiant.address, "Singapore", rootOfficiant.address, rootOfficiant.address, 0));

            case 11:
              _context38.next = 13;
              return regeneratorRuntime.awrap(registry.addOfficiant("Liz", nonOfficiant.address, "Singapore", rootOfficiant.address, rootOfficiant.address, 0));

            case 13:
              _context38.t0 = expect;
              _context38.next = 16;
              return regeneratorRuntime.awrap(registry.isOfficiantActive(nonOfficiant.address));

            case 16:
              _context38.t1 = _context38.sent;
              (0, _context38.t0)(_context38.t1).to.equal(true);
              _context38.next = 20;
              return regeneratorRuntime.awrap(expect(registry.connect(leafOfficiant).removeOfficiant(nonOfficiant.address)).to.be.revertedWith("Leaf officiants are not allowed to remove officiants"));

            case 20:
            case "end":
              return _context38.stop();
          }
        }
      });
    });
  });
});