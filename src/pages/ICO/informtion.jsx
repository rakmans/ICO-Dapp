import { Box } from "@mui/material";
import Holders from "./Holders";
import Supply from "./Supply";
import Remained from "./Remained";
import Balance from "./Balance";
import { useContext } from "react";
import icoContext from "../../context/icoContext";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
const Information = () => {
  const { isConnected } = useWeb3ModalAccount();
  const { ICOData, tokenData } = useContext(icoContext);

  return (
    <>
      <Box
        width={"90%"}
        pt={2}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <Holders
          props={isConnected ? ICOData.holdersCount : "you not connected"}
        />
        <Supply
          props={isConnected ? tokenData.totalSupply : "you not connected"}
        />
        <Remained
          props={isConnected ? tokenData.remindToken : "you not connected"}
        />
      </Box>
    </>
  );
};

export default Information;
