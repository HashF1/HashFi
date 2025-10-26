const { expect } = require("chai");
const { ethers, network } = require("hardhat");

describe("YieldPassport", function () {

  //  Helpers 
  async function latestTime() {
    const block = await ethers.provider.getBlock("latest");
    return block.timestamp;
  }

  async function increaseTo(timestamp) {
    await network.provider.send("evm_setNextBlockTimestamp", [timestamp]);
    await network.provider.send("evm_mine");
  }

  //  Fixture 
  async function deployYieldPassportFixture() {
    const accounts = await ethers.getSigners();
    const owner = accounts[0];
    const attester = accounts[1];
    const otherAccount = accounts[2];

    const YieldPassport = await ethers.getContractFactory("YieldPassport");
    const yieldPassport = await YieldPassport.deploy([attester.address]);
    await yieldPassport.deployed();

    return { yieldPassport, owner, attester, otherAccount };
  }

  //  Deployment
  describe("Deployment", function () {
    it("Should set the owner correctly", async function () {
      const { yieldPassport, owner } = await deployYieldPassportFixture();
      expect(await yieldPassport.owner()).to.equal(owner.address);
    });

    it("Should register initial attester", async function () {
      const { yieldPassport, attester } = await deployYieldPassportFixture();
      expect(await yieldPassport.attesters(attester.address)).to.be.true;
    });
  });

  //  Admin Actions 
  describe("Admin Actions", function () {
    it("Should allow owner to update passports directly", async function () {
      const { yieldPassport, owner, otherAccount } = await deployYieldPassportFixture();
      const tx = await yieldPassport.adminUpdate(otherAccount.address, 100);
      const receipt = await tx.wait();

      const event = receipt.events.find(e => e.event === "PassportUpdated");
      expect(event.args.score).to.equal(100);

      const passport = await yieldPassport.getPassport(otherAccount.address);
      expect(passport.score).to.equal(100);
      expect(passport.attester).to.equal(owner.address);
    });

    it("Should revert if non-owner tries admin update", async function () {
      const { yieldPassport, otherAccount } = await deployYieldPassportFixture();
      await expect(
        yieldPassport.connect(otherAccount).adminUpdate(otherAccount.address, 50)
      ).to.be.revertedWith("Only owner");
    });

    it("Should transfer ownership correctly", async function () {
      const { yieldPassport, owner, otherAccount } = await deployYieldPassportFixture();

      await expect(yieldPassport.transferOwner(otherAccount.address))
        .to.emit(yieldPassport, "OwnerTransferred")
        .withArgs(owner.address, otherAccount.address);

      expect(await yieldPassport.owner()).to.equal(otherAccount.address);
    });

    it("Should add/remove attesters correctly", async function () {
      const { yieldPassport, otherAccount } = await deployYieldPassportFixture();

      await expect(yieldPassport.setAttester(otherAccount.address, true))
        .to.emit(yieldPassport, "AttesterAdded")
        .withArgs(otherAccount.address);

      expect(await yieldPassport.attesters(otherAccount.address)).to.be.true;

      await expect(yieldPassport.setAttester(otherAccount.address, false))
        .to.emit(yieldPassport, "AttesterRemoved")
        .withArgs(otherAccount.address);

      expect(await yieldPassport.attesters(otherAccount.address)).to.be.false;
    });
  });

  //  Attester Signature Updates 
  describe("Attester Updates", function () {
    it("Should update passport using valid signature", async function () {
      const { yieldPassport, attester, otherAccount } = await deployYieldPassportFixture();

      const score = 200;
      const ts = Math.floor(Date.now() / 1000);
      const nonce = 1;

      const payload = ethers.utils.solidityKeccak256(
        ["address","uint256","uint256","uint256","address"],
        [otherAccount.address, score, ts, nonce, yieldPassport.address]
      );
      const ethHash = ethers.utils.arrayify(ethers.utils.hashMessage(ethers.utils.arrayify(payload)));
      const signature = await attester.signMessage(ethHash);

      await expect(yieldPassport.updateWithSignature(otherAccount.address, score, ts, nonce, signature))
        .to.emit(yieldPassport, "PassportUpdated")
        .withArgs(otherAccount.address, score, ts, attester.address, nonce);

      const passport = await yieldPassport.getPassport(otherAccount.address);
      expect(passport.score).to.equal(score);
      expect(passport.nonce).to.equal(nonce);
      expect(passport.attester).to.equal(attester.address);
    });

    it("Should revert on invalid attester signature", async function () {
      const { yieldPassport, otherAccount } = await deployYieldPassportFixture();

      const score = 50;
      const ts = Math.floor(Date.now() / 1000);
      const nonce = 1;
      const fakeSigner = ethers.Wallet.createRandom();

      const payload = ethers.utils.solidityKeccak256(
        ["address","uint256","uint256","uint256","address"],
        [otherAccount.address, score, ts, nonce, yieldPassport.address]
      );
      const ethHash = ethers.utils.arrayify(ethers.utils.hashMessage(ethers.utils.arrayify(payload)));
      const signature = await fakeSigner.signMessage(ethHash);

      await expect(yieldPassport.updateWithSignature(otherAccount.address, score, ts, nonce, signature))
        .to.be.revertedWith("unauthorized attester");
    });

    it("Should prevent replay attacks using nonce", async function () {
      const { yieldPassport, attester, otherAccount } = await deployYieldPassportFixture();

      const score = 100;
      const ts = Math.floor(Date.now() / 1000);
      const nonce = 1;

      const payload = ethers.utils.solidityKeccak256(
        ["address","uint256","uint256","uint256","address"],
        [otherAccount.address, score, ts, nonce, yieldPassport.address]
      );
      const ethHash = ethers.utils.arrayify(ethers.utils.hashMessage(ethers.utils.arrayify(payload)));
      const signature = await attester.signMessage(ethHash);

      await yieldPassport.updateWithSignature(otherAccount.address, score, ts, nonce, signature);

      await expect(yieldPassport.updateWithSignature(otherAccount.address, score, ts, nonce, signature))
        .to.be.revertedWith("invalid nonce");
    });
  });

  // Time-Based Passport Updates 
  describe("Time-Based Passport Updates", function () {
    it("Should revert if timestamp is too far in the future", async function () {
      const { yieldPassport, attester, otherAccount } = await deployYieldPassportFixture();

      const score = 100;
      const ts = (await latestTime()) + 120; // 2 minutes in future
      const nonce = 1;

      const payload = ethers.utils.solidityKeccak256(
        ["address","uint256","uint256","uint256","address"],
        [otherAccount.address, score, ts, nonce, yieldPassport.address]
      );
      const ethHash = ethers.utils.arrayify(ethers.utils.hashMessage(ethers.utils.arrayify(payload)));
      const signature = await attester.signMessage(ethHash);

      await expect(
        yieldPassport.updateWithSignature(otherAccount.address, score, ts, nonce, signature)
      ).to.be.revertedWith("future ts");
    });

    it("Should accept a timestamp within allowed window", async function () {
      const { yieldPassport, attester, otherAccount } = await deployYieldPassportFixture();

      const score = 150;
      const ts = (await latestTime()) + 30;
      const nonce = 1;

      const payload = ethers.utils.solidityKeccak256(
        ["address","uint256","uint256","uint256","address"],
        [otherAccount.address, score, ts, nonce, yieldPassport.address]
      );
      const ethHash = ethers.utils.arrayify(ethers.utils.hashMessage(ethers.utils.arrayify(payload)));
      const signature = await attester.signMessage(ethHash);

      await expect(
        yieldPassport.updateWithSignature(otherAccount.address, score, ts, nonce, signature)
      ).to.emit(yieldPassport, "PassportUpdated")
        .withArgs(otherAccount.address, score, ts, attester.address, nonce);
    });

    it("Should allow future timestamp after time increase", async function () {
      const { yieldPassport, attester, otherAccount } = await deployYieldPassportFixture();

      const score = 200;
      const ts = (await latestTime()) + 60;
      const nonce = 1;

      const payload = ethers.utils.solidityKeccak256(
        ["address","uint256","uint256","uint256","address"],
        [otherAccount.address, score, ts, nonce, yieldPassport.address]
      );
      const ethHash = ethers.utils.arrayify(ethers.utils.hashMessage(ethers.utils.arrayify(payload)));
      const signature = await attester.signMessage(ethHash);

      await increaseTo(ts);

      await expect(
        yieldPassport.updateWithSignature(otherAccount.address, score, ts, nonce, signature)
      ).to.emit(yieldPassport, "PassportUpdated")
        .withArgs(otherAccount.address, score, ts, attester.address, nonce);
    });
  });
});
