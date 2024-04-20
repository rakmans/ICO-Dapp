import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { useWeb3Modal } from "@web3modal/ethers/react";
import {
  UilLinkedin,
  UilInstagram,
  UilTelegram,
  UilWallet,
} from "@iconscout/react-unicons";
import rakmans from "./rakmans.svg";
import { useTheme } from "@emotion/react";
const Footer = () => {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          m: "auto",
          mt: "1%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            pt: "4vh",
          }}
        >
          <Box
            component="img"
            src={rakmans}
            sx={{
              m: "auto",
              width: 80,
            }}
          />
        </Box>

        <Box sx={{ textAlign: "center", mt: "1vh", pb: "2vh" }}>
          <IconButton sx={{ mr: "2.5vw" }}>
            <UilLinkedin
              color={theme.palette.mode === "dark" ? "#1976d2" : "#0d47a1"}
              size="3vw"
            />
          </IconButton>
          <IconButton sx={{ mr: "1.25vw" }}>
            <UilInstagram
              color={theme.palette.mode === "dark" ? "#1976d2" : "#0d47a1"}
              size="3vw"
            />
          </IconButton>
          <Typography
            variant="p"
            sx={{
              m: "auto",
              mt: "2vh",
              fontSize: "2vw",
              fontWeight: "700",
              color: theme.palette.mode === "dark" ? "#1976d2" : "#0d47a1",
            }}
          >
            RAKMANS
          </Typography>
          <IconButton sx={{ ml: "1.25vw" }}>
            <UilTelegram
              color={theme.palette.mode === "dark" ? "#1976d2" : "#0d47a1"}
              size="3vw"
            />
          </IconButton>
          <IconButton sx={{ ml: "2.5vw" }}>
            <UilWallet
              color={theme.palette.mode === "dark" ? "#1976d2" : "#0d47a1"}
              size="3vw"
            />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default Footer;