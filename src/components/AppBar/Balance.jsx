import { Chip, Tooltip } from "@mui/material";
import { useContext } from "react";
import icoContext from "../../context/icoContext";
import { separateNumber } from "../../utils/separateNumber";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
const Balance = () => {
  const { isConnected } = useWeb3ModalAccount();
  const { ICOData, tokenData } = useContext(icoContext);
  if (isConnected && tokenData.userInventory !== "loading") {
    return (
      <Tooltip arrow title="User Balance">
        <Chip
          color="secondary"
          size="medium"
          label={separateNumber(tokenData.userInventory).toString()}
          sx={{ mr: 1, cursor: "pointer" }}
        />
      </Tooltip>
    );
  }
};

export default Balance;
