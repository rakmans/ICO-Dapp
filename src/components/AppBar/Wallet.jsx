import { Button, Box, IconButton } from "@mui/material";
import { UilWallet } from "@iconscout/react-unicons";
import { useWeb3Modal } from "@web3modal/ethers/react";
const Wallet = () => {
  const { open } = useWeb3Modal();

  return (
    <>
      <Box display={{ sm: "block", xs: "none" }}>
        <Button
          onClick={() => open()}
          sx={{ mr: 1, borderRadius: "50px" }}
          variant="contained"
          color="secondary"
          endIcon={<UilWallet />}
          size="large"
        >
          Wallet
        </Button>
      </Box>
      <Box display={{ sm: "none", xs: "block" }}>
        <IconButton
          sx={{ border: `1px solid `, mr: 1, borderRadius: "50%" }}
          color="secondary"
        >
          <UilWallet />
        </IconButton>
      </Box>
    </>
  );
};

export default Wallet;
