require('regenerator-runtime/runtime');

// Load dependencies
const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");

// Start test block
describe("MarriageRegistry", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [
      firstPartner,
      secondPartner,
      firstWitness,
      secondWitness,
      officiant,
    ] = await ethers.getSigners();

    const MarriageRegistry = await ethers.getContractFactory(
      "MarriageRegistry"
    );
    const registry = await MarriageRegistry.deploy();

    return {
      registry,
      firstPartner,
      secondPartner,
      officiant,
      firstWitness,
      secondWitness,
    };
  }
  // Fixture for testing all code related to officiants
  async function deployOfficiantFixture() {
    // Contracts are deployed using the first signer/account by default
    const [rootOfficiant, intermediateOfficiant, leafOfficiant, nonOfficiant] =
      await ethers.getSigners();

    const MarriageRegistry = await ethers.getContractFactory(
      "MarriageRegistry"
    );
    const registry = await MarriageRegistry.deploy();

    return {
      registry,
      rootOfficiant,
      intermediateOfficiant,
      leafOfficiant,
      nonOfficiant,
    };
  }

  describe("First Partner Sign", function () {
    it("Shouldn't fail", async function () {
      const { registry, secondPartner, firstWitness, secondWitness } =
        await loadFixture(deployFixture);
      await expect(
        registry.firstPartnerSign(
          "John",
          "Jill",
          "Will",
          "Whitney",
          secondPartner.address,
          firstWitness.address,
          secondWitness.address,
          "11 Feb 2023",
          "Singapore"
        )
      ).not.to.be.reverted;
    });

    it("Should return correct number of records", async function () {
      const { registry, secondPartner, firstWitness, secondWitness } =
        await loadFixture(deployFixture);
      await registry.firstPartnerSign(
        "John",
        "Jill",
        "Will",
        "Whitney",
        secondPartner.address,
        firstWitness.address,
        secondWitness.address,
        "11 Feb 2023",
        "Singapore"
      );
      expect(await registry.getNumRecords()).to.equal(1);
    });
  });

  describe("Second Partner Sign", function () {
    it("Should revert with the right error if called from another account", async function () {
      const {
        registry,
        firstPartner,
        secondPartner,
        firstWitness,
        secondWitness,
      } = await loadFixture(deployFixture);
      await registry.firstPartnerSign(
        "John",
        "Jill",
        "Will",
        "Whitney",
        secondPartner.address,
        firstWitness.address,
        secondWitness.address,
        "11 Feb 2023",
        "Singapore"
      );
      await expect(
        registry.secondPartnerSign(firstPartner.address)
      ).to.be.revertedWith("Only second partner can sign");
    });

    it("Shouldn't revert if called from second partner's account", async function () {
      const {
        registry,
        firstPartner,
        secondPartner,
        firstWitness,
        secondWitness,
      } = await loadFixture(deployFixture);
      await registry.firstPartnerSign(
        "John",
        "Jill",
        "Will",
        "Whitney",
        secondPartner.address,
        firstWitness.address,
        secondWitness.address,
        "11 Feb 2023",
        "Singapore"
      );
      await expect(
        registry.connect(secondPartner).secondPartnerSign(firstPartner.address)
      ).not.to.be.reverted;
    });

    it("Should record that second partner has signed", async function () {
      const {
        registry,
        firstPartner,
        secondPartner,
        firstWitness,
        secondWitness,
      } = await loadFixture(deployFixture);
      await registry.firstPartnerSign(
        "John",
        "Jill",
        "Will",
        "Whitney",
        secondPartner.address,
        firstWitness.address,
        secondWitness.address,
        "11 Feb 2023",
        "Singapore"
      );
      await registry
        .connect(secondPartner)
        .secondPartnerSign(firstPartner.address);
      await registry
        .connect(firstWitness)
        .firstWitnessSignOff(firstPartner.address);
      expect(
        await registry.getSecondPartnerSigned(firstPartner.address)
      ).to.equal(true);
    });
  });

  describe("First Witness Signs Off", function () {
    it("Shouldn't fail if both partners have signed", async function () {
      const {
        registry,
        firstPartner,
        secondPartner,
        firstWitness,
        secondWitness,
      } = await loadFixture(deployFixture);
      await registry.firstPartnerSign(
        "John",
        "Jill",
        "Will",
        "Whitney",
        secondPartner.address,
        firstWitness.address,
        secondWitness.address,
        "11 Feb 2023",
        "Singapore"
      );
      await registry
        .connect(secondPartner)
        .secondPartnerSign(firstPartner.address);
      await expect(
        registry.connect(firstWitness).firstWitnessSignOff(firstPartner.address)
      ).not.to.be.reverted;
    });

    it("Should fail if second partner hasn't signed", async function () {
      const {
        registry,
        firstPartner,
        secondPartner,
        firstWitness,
        secondWitness,
      } = await loadFixture(deployFixture);
      await registry.firstPartnerSign(
        "John",
        "Jill",
        "Will",
        "Whitney",
        secondPartner.address,
        firstWitness.address,
        secondWitness.address,
        "11 Feb 2023",
        "Singapore"
      );
      await expect(
        registry.connect(firstWitness).firstWitnessSignOff(firstPartner.address)
      ).to.be.revertedWith("Second partner must sign");
    });

    it("Should fail if signer isn't the first witness", async function () {
      const {
        registry,
        firstPartner,
        secondPartner,
        firstWitness,
        secondWitness,
      } = await loadFixture(deployFixture);
      await registry.firstPartnerSign(
        "John",
        "Jill",
        "Will",
        "Whitney",
        secondPartner.address,
        firstWitness.address,
        secondWitness.address,
        "11 Feb 2023",
        "Singapore"
      );
      await registry
        .connect(secondPartner)
        .secondPartnerSign(firstPartner.address);
      await expect(
        registry
          .connect(secondWitness)
          .firstWitnessSignOff(firstPartner.address)
      ).to.be.revertedWith("Only first witness can sign");
    });

    it("Should record that first witness has signed", async function () {
      const {
        registry,
        firstPartner,
        secondPartner,
        firstWitness,
        secondWitness,
      } = await loadFixture(deployFixture);
      await registry.firstPartnerSign(
        "John",
        "Jill",
        "Will",
        "Whitney",
        secondPartner.address,
        firstWitness.address,
        secondWitness.address,
        "11 Feb 2023",
        "Singapore"
      );
      await registry
        .connect(secondPartner)
        .secondPartnerSign(firstPartner.address);
      await registry
        .connect(firstWitness)
        .firstWitnessSignOff(firstPartner.address);
      expect(
        await registry.getFirstWitnessSigned(firstPartner.address)
      ).to.equal(true);
    });
  });

  describe("Second Witness Signs Off", function () {
    it("Shouldn't fail if both partners have signed", async function () {
      const {
        registry,
        firstPartner,
        secondPartner,
        firstWitness,
        secondWitness,
      } = await loadFixture(deployFixture);
      await registry.firstPartnerSign(
        "John",
        "Jill",
        "Will",
        "Whitney",
        secondPartner.address,
        firstWitness.address,
        secondWitness.address,
        "11 Feb 2023",
        "Singapore"
      );
      await registry
        .connect(secondPartner)
        .secondPartnerSign(firstPartner.address);
      await expect(
        registry
          .connect(secondWitness)
          .secondWitnessSignOff(firstPartner.address)
      ).not.to.be.reverted;
    });

    it("Should fail if second partner hasn't signed", async function () {
      const {
        registry,
        firstPartner,
        secondPartner,
        firstWitness,
        secondWitness,
      } = await loadFixture(deployFixture);
      await registry.firstPartnerSign(
        "John",
        "Jill",
        "Will",
        "Whitney",
        secondPartner.address,
        firstWitness.address,
        secondWitness.address,
        "11 Feb 2023",
        "Singapore"
      );
      await expect(
        registry
          .connect(secondWitness)
          .secondWitnessSignOff(firstPartner.address)
      ).to.be.revertedWith("Second partner must sign");
    });

    it("Should fail if signer isn't the second witness", async function () {
      const {
        registry,
        firstPartner,
        secondPartner,
        firstWitness,
        secondWitness,
      } = await loadFixture(deployFixture);
      await registry.firstPartnerSign(
        "John",
        "Jill",
        "Will",
        "Whitney",
        secondPartner.address,
        firstWitness.address,
        secondWitness.address,
        "11 Feb 2023",
        "Singapore"
      );
      await registry
        .connect(secondPartner)
        .secondPartnerSign(firstPartner.address);
      await expect(
        registry
          .connect(firstWitness)
          .secondWitnessSignOff(firstPartner.address)
      ).to.be.revertedWith("Only second witness can sign");
    });

    it("Should record that second witness has signed", async function () {
      const {
        registry,
        firstPartner,
        secondPartner,
        firstWitness,
        secondWitness,
      } = await loadFixture(deployFixture);
      await registry.firstPartnerSign(
        "John",
        "Jill",
        "Will",
        "Whitney",
        secondPartner.address,
        firstWitness.address,
        secondWitness.address,
        "11 Feb 2023",
        "Singapore"
      );
      await registry
        .connect(secondPartner)
        .secondPartnerSign(firstPartner.address);
      await registry
        .connect(secondWitness)
        .secondWitnessSignOff(firstPartner.address);
      expect(
        await registry.getSecondWitnessSigned(firstPartner.address)
      ).to.equal(true);
    });
  });

  describe("Officiant Signs Off", function () {
    it("Shouldn't fail", async function () {
      const {
        registry,
        firstPartner,
        secondPartner,
        firstWitness,
        secondWitness,
      } = await loadFixture(deployFixture);
      await registry.firstPartnerSign(
        "John",
        "Jill",
        "Will",
        "Whitney",
        secondPartner.address,
        firstWitness.address,
        secondWitness.address,
        "11 Feb 2023",
        "Singapore"
      );
      await registry
        .connect(secondPartner)
        .secondPartnerSign(firstPartner.address);
      await registry
        .connect(firstWitness)
        .firstWitnessSignOff(firstPartner.address);
      await registry
        .connect(secondWitness)
        .secondWitnessSignOff(firstPartner.address);
      await expect(registry.officiantSignOff(firstPartner.address)).not.to.be
        .reverted;
    });

    it("Should fail if second partner hasn't signed", async function () {
      const {
        registry,
        firstPartner,
        secondPartner,
        firstWitness,
        secondWitness,
      } = await loadFixture(deployFixture);
      await registry.firstPartnerSign(
        "John",
        "Jill",
        "Will",
        "Whitney",
        secondPartner.address,
        firstWitness.address,
        secondWitness.address,
        "11 Feb 2023",
        "Singapore"
      );
      await expect(
        registry.officiantSignOff(firstPartner.address)
      ).to.be.revertedWith("Second partner must sign");
    });

    it("Should fail if first witness hasn't signed", async function () {
      const {
        registry,
        firstPartner,
        secondPartner,
        firstWitness,
        secondWitness,
      } = await loadFixture(deployFixture);
      await registry.firstPartnerSign(
        "John",
        "Jill",
        "Will",
        "Whitney",
        secondPartner.address,
        firstWitness.address,
        secondWitness.address,
        "11 Feb 2023",
        "Singapore"
      );
      await registry
        .connect(secondPartner)
        .secondPartnerSign(firstPartner.address);
      await expect(
        registry.officiantSignOff(firstPartner.address)
      ).to.be.revertedWith("First witness must sign");
    });

    it("Should fail if second witness hasn't signed", async function () {
      const {
        registry,
        firstPartner,
        secondPartner,
        firstWitness,
        secondWitness,
      } = await loadFixture(deployFixture);
      await registry.firstPartnerSign(
        "John",
        "Jill",
        "Will",
        "Whitney",
        secondPartner.address,
        firstWitness.address,
        secondWitness.address,
        "11 Feb 2023",
        "Singapore"
      );
      await registry
        .connect(secondPartner)
        .secondPartnerSign(firstPartner.address);
      await registry
        .connect(firstWitness)
        .firstWitnessSignOff(firstPartner.address);
      await expect(
        registry.officiantSignOff(firstPartner.address)
      ).to.be.revertedWith("Second witness must sign");
    });
  });

  describe("Add First Root Officiant", function () {
    it("Should add officiant as root authority", async function () {
      const { registry, rootOfficiant } = await loadFixture(
        deployOfficiantFixture
      );
      await expect(
        registry.addFirstRootOfficiant(
          "Rachel",
          rootOfficiant.address,
          "Singapore"
        )
      ).not.to.be.reverted;
    });

    it("Shouldn't add officiant as root officiant when called from another account", async function () {
      const { registry, rootOfficiant, nonOfficiant } = await loadFixture(
        deployOfficiantFixture
      );
      await expect(
        registry
          .connect(nonOfficiant)
          .addFirstRootOfficiant("Rachel", rootOfficiant.address, "Singapore")
      ).to.be.revertedWith("Officiant address must be yours");
    });

    it("Should record officiant as active root authority", async function () {
      const { registry, rootOfficiant } = await loadFixture(
        deployOfficiantFixture
      );
      await registry.addFirstRootOfficiant(
        "Rachel",
        rootOfficiant.address,
        "Singapore"
      );
      expect(await registry.isOfficiantActive(rootOfficiant.address)).to.equal(
        true
      );
    });
  });

  describe("Add Subsequent Officiants", function () {
    it("Should add officiant as root authority", async function () {
      const { registry, rootOfficiant, nonOfficiant } = await loadFixture(
        deployOfficiantFixture
      );
      await registry.addFirstRootOfficiant(
        "Rachel",
        rootOfficiant.address,
        "Singapore"
      );
      await expect(
        registry.addOfficiant(
          "Randy",
          nonOfficiant.address,
          "Singapore",
          rootOfficiant.address,
          rootOfficiant.address,
          2
        )
      ).not.to.be.reverted;
    });

    it("Should record officiant as active root authority", async function () {
      const { registry, rootOfficiant, nonOfficiant } = await loadFixture(
        deployOfficiantFixture
      );
      await registry.addFirstRootOfficiant(
        "Rachel",
        rootOfficiant.address,
        "Singapore"
      );
      await registry.addOfficiant(
        "Randy",
        nonOfficiant.address,
        "Singapore",
        rootOfficiant.address,
        rootOfficiant.address,
        2
      );
      expect(await registry.isOfficiantActive(nonOfficiant.address)).to.equal(
        true
      );
    });

    it("Should have correct permission level", async function () {
      const { registry, rootOfficiant, nonOfficiant } = await loadFixture(
        deployOfficiantFixture
      );
      await registry.addFirstRootOfficiant(
        "Rachel",
        rootOfficiant.address,
        "Singapore"
      );
      await registry.addOfficiant(
        "Randy",
        nonOfficiant.address,
        "Singapore",
        rootOfficiant.address,
        rootOfficiant.address,
        2
      );
      expect(
        await registry.getOfficiantPermissions(nonOfficiant.address)
      ).to.equal(2);
    });

    it("Should revert if caller isn't the issuing authority", async function () {
      const { registry, rootOfficiant, nonOfficiant } = await loadFixture(
        deployOfficiantFixture
      );
      await registry.addFirstRootOfficiant(
        "Rachel",
        rootOfficiant.address,
        "Singapore"
      );
      await expect(
        registry
          .connect(nonOfficiant)
          .addOfficiant(
            "Randy",
            nonOfficiant.address,
            "Singapore",
            rootOfficiant.address,
            rootOfficiant.address,
            2
          )
      ).to.be.revertedWith("You must be the issuing authority");
    });

    it("Should revert if the issuing authority isn't active", async function () {
      const { registry, rootOfficiant, intermediateOfficiant, nonOfficiant } =
        await loadFixture(deployOfficiantFixture);
      await registry.addFirstRootOfficiant(
        "Rachel",
        rootOfficiant.address,
        "Singapore"
      );
      await registry.addOfficiant(
        "Ian",
        intermediateOfficiant.address,
        "Singapore",
        rootOfficiant.address,
        rootOfficiant.address,
        2
      );
      await registry.removeOfficiant(intermediateOfficiant.address);
      await expect(
        registry
          .connect(intermediateOfficiant)
          .addOfficiant(
            "Lee",
            nonOfficiant.address,
            "Singapore",
            intermediateOfficiant.address,
            rootOfficiant.address,
            0
          )
      ).to.be.revertedWith("Issuing authority must be active");
    });

    it("Should revert if new officiant's permission level is higher than issuing authority's", async function () {
      const { registry, rootOfficiant, intermediateOfficiant, nonOfficiant } =
        await loadFixture(deployOfficiantFixture);
      await registry.addFirstRootOfficiant(
        "Rachel",
        rootOfficiant.address,
        "Singapore"
      );
      await registry.addOfficiant(
        "Ian",
        intermediateOfficiant.address,
        "Singapore",
        rootOfficiant.address,
        rootOfficiant.address,
        1
      );
      await expect(
        registry
          .connect(intermediateOfficiant)
          .addOfficiant(
            "Randy",
            nonOfficiant.address,
            "Singapore",
            intermediateOfficiant.address,
            rootOfficiant.address,
            2
          )
      ).to.be.revertedWith("Cannot issue permissions higher than your own");
    });

    it("Should revert if new officiant's root authority isn't the same as issuing authority's", async function () {
      const {
        registry,
        rootOfficiant,
        intermediateOfficiant,
        leafOfficiant,
        nonOfficiant,
      } = await loadFixture(deployOfficiantFixture);
      await registry.addFirstRootOfficiant(
        "Rachel",
        rootOfficiant.address,
        "Singapore"
      );
      await registry.addOfficiant(
        "Ian",
        intermediateOfficiant.address,
        "Singapore",
        rootOfficiant.address,
        rootOfficiant.address,
        1
      );
      await expect(
        registry
          .connect(intermediateOfficiant)
          .addOfficiant(
            "Lee",
            leafOfficiant.address,
            "Singapore",
            intermediateOfficiant.address,
            nonOfficiant.address,
            0
          )
      ).to.be.revertedWith(
        "Issuing authority and declared root authority must descend from the same root authority"
      );
    });
  });

  describe("Remove Officiants", function () {
    it("Root officiant should be able to remove another root officiant", async function () {
      const { registry, rootOfficiant, nonOfficiant } = await loadFixture(
        deployOfficiantFixture
      );
      await registry.addFirstRootOfficiant(
        "Rachel",
        rootOfficiant.address,
        "Singapore"
      );
      await registry.addOfficiant(
        "Randy",
        nonOfficiant.address,
        "Singapore",
        rootOfficiant.address,
        rootOfficiant.address,
        2
      );
      expect(await registry.isOfficiantActive(nonOfficiant.address)).to.equal(
        true
      );
      await registry.removeOfficiant(nonOfficiant.address);
      expect(await registry.isOfficiantActive(nonOfficiant.address)).to.equal(
        false
      );
    });

    it("Root officiant should be able to remove intermiediate officiants", async function () {
      const { registry, rootOfficiant, nonOfficiant } = await loadFixture(
        deployOfficiantFixture
      );
      await registry.addFirstRootOfficiant(
        "Rachel",
        rootOfficiant.address,
        "Singapore"
      );
      await registry.addOfficiant(
        "Ian",
        nonOfficiant.address,
        "Singapore",
        rootOfficiant.address,
        rootOfficiant.address,
        1
      );
      expect(await registry.isOfficiantActive(nonOfficiant.address)).to.equal(
        true
      );
      await registry.removeOfficiant(nonOfficiant.address);
      expect(await registry.isOfficiantActive(nonOfficiant.address)).to.equal(
        false
      );
    });

    it("Root officiant should be able to remove leaf officiants", async function () {
      const { registry, rootOfficiant, nonOfficiant } = await loadFixture(
        deployOfficiantFixture
      );
      await registry.addFirstRootOfficiant(
        "Rachel",
        rootOfficiant.address,
        "Singapore"
      );
      await registry.addOfficiant(
        "Lee",
        nonOfficiant.address,
        "Singapore",
        rootOfficiant.address,
        rootOfficiant.address,
        0
      );
      expect(await registry.isOfficiantActive(nonOfficiant.address)).to.equal(
        true
      );
      await registry.removeOfficiant(nonOfficiant.address);
      expect(await registry.isOfficiantActive(nonOfficiant.address)).to.equal(
        false
      );
    });

    it("Intermediate officiant should not be able to remove root officiant", async function () {
      const { registry, rootOfficiant, intermediateOfficiant } =
        await loadFixture(deployOfficiantFixture);
      await registry.addFirstRootOfficiant(
        "Rachel",
        rootOfficiant.address,
        "Singapore"
      );
      await registry.addOfficiant(
        "Ian",
        intermediateOfficiant.address,
        "Singapore",
        rootOfficiant.address,
        rootOfficiant.address,
        1
      );
      expect(await registry.isOfficiantActive(rootOfficiant.address)).to.equal(
        true
      );
      await expect(
        registry
          .connect(intermediateOfficiant)
          .removeOfficiant(rootOfficiant.address)
      ).to.be.revertedWith(
        "You must have higher or equal permissions to remove this officiant"
      );
    });

    it("Intermediate officiant should be able to remove intermediate officiant", async function () {
      const { registry, rootOfficiant, intermediateOfficiant, nonOfficiant } =
        await loadFixture(deployOfficiantFixture);
      await registry.addFirstRootOfficiant(
        "Rachel",
        rootOfficiant.address,
        "Singapore"
      );
      await registry.addOfficiant(
        "Ian",
        intermediateOfficiant.address,
        "Singapore",
        rootOfficiant.address,
        rootOfficiant.address,
        1
      );
      await registry.addOfficiant(
        "Ivy",
        nonOfficiant.address,
        "Singapore",
        rootOfficiant.address,
        rootOfficiant.address,
        1
      );
      expect(await registry.isOfficiantActive(nonOfficiant.address)).to.equal(
        true
      );
      await registry
        .connect(intermediateOfficiant)
        .removeOfficiant(nonOfficiant.address);
      expect(await registry.isOfficiantActive(nonOfficiant.address)).to.equal(
        false
      );
    });

    it("Intermediate officiant should be able to remove leaf officiant", async function () {
      const { registry, rootOfficiant, intermediateOfficiant, nonOfficiant } =
        await loadFixture(deployOfficiantFixture);
      await registry.addFirstRootOfficiant(
        "Rachel",
        rootOfficiant.address,
        "Singapore"
      );
      await registry.addOfficiant(
        "Ian",
        intermediateOfficiant.address,
        "Singapore",
        rootOfficiant.address,
        rootOfficiant.address,
        1
      );
      await registry.addOfficiant(
        "Lee",
        nonOfficiant.address,
        "Singapore",
        rootOfficiant.address,
        rootOfficiant.address,
        0
      );
      expect(await registry.isOfficiantActive(nonOfficiant.address)).to.equal(
        true
      );
      await registry
        .connect(intermediateOfficiant)
        .removeOfficiant(nonOfficiant.address);
      expect(await registry.isOfficiantActive(nonOfficiant.address)).to.equal(
        false
      );
    });

    it("Leaf officiant should not be able to remove root officiant", async function () {
      const { registry, rootOfficiant, leafOfficiant } = await loadFixture(
        deployOfficiantFixture
      );
      await registry.addFirstRootOfficiant(
        "Rachel",
        rootOfficiant.address,
        "Singapore"
      );
      await registry.addOfficiant(
        "Lee",
        leafOfficiant.address,
        "Singapore",
        rootOfficiant.address,
        rootOfficiant.address,
        0
      );
      expect(await registry.isOfficiantActive(rootOfficiant.address)).to.equal(
        true
      );
      await expect(
        registry.connect(leafOfficiant).removeOfficiant(rootOfficiant.address)
      ).to.be.revertedWith(
        "You must have higher or equal permissions to remove this officiant"
      );
    });

    it("Leaf officiant should not be able to remove intermediate officiant", async function () {
      const { registry, rootOfficiant, intermediateOfficiant, leafOfficiant } =
        await loadFixture(deployOfficiantFixture);
      await registry.addFirstRootOfficiant(
        "Rachel",
        rootOfficiant.address,
        "Singapore"
      );
      await registry.addOfficiant(
        "Ian",
        intermediateOfficiant.address,
        "Singapore",
        rootOfficiant.address,
        rootOfficiant.address,
        1
      );
      await registry.addOfficiant(
        "Lee",
        leafOfficiant.address,
        "Singapore",
        rootOfficiant.address,
        rootOfficiant.address,
        0
      );
      expect(
        await registry.isOfficiantActive(intermediateOfficiant.address)
      ).to.equal(true);
      await expect(
        registry
          .connect(leafOfficiant)
          .removeOfficiant(intermediateOfficiant.address)
      ).to.be.revertedWith(
        "You must have higher or equal permissions to remove this officiant"
      );
    });

    it("Leaf officiant should not be able to remove intermediate officiant", async function () {
      const { registry, rootOfficiant, leafOfficiant, nonOfficiant } =
        await loadFixture(deployOfficiantFixture);
      await registry.addFirstRootOfficiant(
        "Rachel",
        rootOfficiant.address,
        "Singapore"
      );
      await registry.addOfficiant(
        "Lee",
        leafOfficiant.address,
        "Singapore",
        rootOfficiant.address,
        rootOfficiant.address,
        0
      );
      await registry.addOfficiant(
        "Liz",
        nonOfficiant.address,
        "Singapore",
        rootOfficiant.address,
        rootOfficiant.address,
        0
      );
      expect(await registry.isOfficiantActive(nonOfficiant.address)).to.equal(
        true
      );
      await expect(
        registry.connect(leafOfficiant).removeOfficiant(nonOfficiant.address)
      ).to.be.revertedWith(
        "Leaf officiants are not allowed to remove officiants"
      );
    });
  });
});
