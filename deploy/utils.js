// async function verify(contractAddress, args) {
const verify = async (contractAddress, args) => {
  console.log("Verifying contract...");
  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!");
    } else {
      console.log(e);
    }
  }
};

const networkHasVerification = (chainId) => {
  return (
    (chainId === 5 && hre.config.etherscan.apiKey.goerli) ||
    (chainId === 80001 && hre.config.etherscan.apiKey.polygonMumbai) ||
    (chainId === 418 && hre.config.etherscan.apiKey.lachain)
  );
};

module.exports = {
  verify,
  networkHasVerification,
};
