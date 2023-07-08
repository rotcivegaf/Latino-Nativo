require("dotenv").config();
const { verify, networkHasVerification } = require("./utils.js");
const { task } = require("hardhat/config");

task("deploy-nativo", "Deploy Nativo token contract")
  .addParam("name", "Name of the token")
  .addParam("symbol", "Symbol of the token")
  .setAction(async (taskArgs, hre) => {
    const [admin] = await hre.ethers.getSigners();
    console.log("The admin address: ", admin.address);

    console.log("Deploying Nativo...");
    const Nativo = await hre.ethers.getContractFactory(
      "Nativo"
    );
    const nativo = await Nativo.connect(admin).deploy(
      taskArgs.name,
      taskArgs.symbol
    );
    console.log("TX hash:", nativo.deployTransaction.hash);
    await nativo.deployed();
    console.log(`Nativo deployed to ${nativo.address}`);

    if (networkHasVerification(hre.network.config.chainId)) {
      console.log("Waiting for block confirmations...");
      await nativo.deployTransaction.wait(6);
      console.log(nativo.address, [taskArgs.name, taskArgs.symbol]);
      //await verify(nativo.address, [taskArgs.name, taskArgs.symbol]);


      /*
      await verify(
        "0x78A93058e871ca077d0317D48af58B3eAc5b52A4",
        [
          '0x0000000000000000000000000000000000000000000000000000000000000001',
          '0x0000000000000000000000000000000000000000000000000000000000000002',
        ]);
      */
    }
    //return nativo;
  });

  module.exports = {};