import { ethers } from "ethers";
import { ICOABI } from "../data/ICOData/ICOABI";
import { byteCode } from "../data/ICOData/ICOByteCode";
export const GeneratorContract = async (values, signer) => {
  const contractFactory = new ethers.ContractFactory(ICOABI, byteCode, signer);

  const contract = await contractFactory.deploy(
    values.address,
    values.holderAirdropAmount,
    values.holderAirdropAmount,
    values.tokenRate
  );
  await contract.waitForDeployment();
  const address = await contract.getAddress();
  //    contract.deployed();
  console.log("Contract deployed at address:", address);
  return address;
};
