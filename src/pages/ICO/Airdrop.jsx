import { Card, Button, Typography, Box } from "@mui/material";
import Countdown from "react-countdown";
import { useContext } from "react";
import icoContext from "../../context/icoContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { useParams } from "react-router-dom";

const Airdrop = () => {
    const [disabled, setDisabled] = useState(false);
    const { ICOData, setTokenData, tokenContract, ICOContract,tokenData } =
        useContext(icoContext);
    const { address } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();
    const { ICOAddress } = useParams();
    const onClick = async () => {
        if(tokenData.remindToken < ICOData.holderAirdropAmount){
            toast.error("Not enough tokens in ICO")
            throw new Error("Not enough tokens in ICO")
        }
        try {
            setDisabled(true);
            const tx = await ICOContract.airdrop();
            await toast.promise(tx.wait(), {
                pending: "pending transaction",
                error: "ERROR",
                success: "transaction successfully done!",
            });
            let userInventory = await tokenContract.balanceOf(address);
            userInventory = userInventory / BigInt(Math.pow(10, 18));
            let remindToken = await tokenContract.balanceOf(ICOAddress);
            remindToken = remindToken / BigInt(Math.pow(10, 18));
            let holdersCount = await ICOContract.holdersCount();
            setTokenData((prev) => ({
                ...prev,
                userInventory,
                remindToken,
                holdersCount
            }));
        } catch (error) {
            toast.error(error.message);
        }
        setDisabled(false);
    };
    return (
        <Card
            sx={{
                width: "90%",
                borderRadius: 7,
            }}>
            <Typography variant='h4' ml={2} mt={2}>
                Airdrop
            </Typography>
            <Typography variant='body2' ml={2} mt={0.5}>
                Time to get your 100 free Tokens:
            </Typography>
            <Box sx={{ textAlign: "center", fontSize: "4vw" }}>
                <Countdown
                    date={
                        ICOData.remindTime !== "loading"
                            ? Number(Date.now()) +
                              Number(ICOData.remindTime) * 1000
                            : Date.now()
                    }
                />
            </Box>
            <Button
                variant='contained'
                disabled={disabled || ICOData.loading}
                onClick={() => {
                    onClick();
                }}
                sx={{ mb: 4, mt: 3, fontSize: 25, width: "90%", ml: "5%" }}
                color='success'>
                claim airdrop
            </Button>
        </Card>
    );
};

export default Airdrop;
