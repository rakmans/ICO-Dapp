import Appbar from "../../components/AppBar/AppBar";
import { Box } from "@mui/material";
import Airdrop from "./Airdrop";
import Purchase from "./Purchase";
import Deadline from "./admin/Deadline";
import Footer from "../../components/Footer";
import BalanceManager from "./admin/BalanceManager";
import Information from "./informtion";
import {
    useWeb3ModalAccount,
    useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { useGetICOInformation } from "../../hooks/useGetICOInformation";
import icoContext from "../../context/icoContext";
import { useEffect } from "react";
const ICO = () => {
    const { isConnected } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();
    const {
        ICOData,
        tokenData,
        tokenContract,
        ICOContract,
        setICOData,
        setTokenData,
    } = useGetICOInformation();
    useEffect(() => {
        if (isConnected) {
            walletProvider.on("accountsChanged", () => {
                window.location.reload();
            });
            walletProvider.on("chainChanged", () => {
                window.location.reload();
            });
            walletProvider.on("disconnect", () => {
                setICOData({
                    holdersCount: "loading",
                    maxAirdropAmount: "loading",
                    holderAirdropAmount: "loading",
                    ICOBalance: "loading",
                    tokenRate: "loading",
                    remindTime: "loading",
                    stage: "loading",
                    isOwner: false,
                    loading: true,
                });
                setTokenData({
                    address: "loading",
                    userInventory: "loading",
                    remindToken: "loading",
                    totalSupply: "loading",
                    symbol: "loading",
                });
            });
        }
    }, [isConnected]);
    return (
        <icoContext.Provider
            value={{
                ICOData,
                tokenData,
                tokenContract,
                ICOContract,
                setICOData,
                setTokenData,
            }}>
            <>
                <Appbar page={1} />
                <Box sx={{ mt: "13vh" }}>
                    <Box display={"flex"} justifyContent={"center"}>
                        <Information />
                    </Box>
                    {(ICOData.stage === 1n || ICOData.isOwner) && (
                        <Box mt={2} display={"flex"} justifyContent={"center"}>
                            <Airdrop />
                        </Box>
                    )}
                    {(ICOData.stage === 2n || ICOData.isOwner) && (
                        <Box mt={2} display={"flex"} justifyContent={"center"}>
                            <Purchase />
                        </Box>
                    )}
                    {ICOData.isOwner && (
                        <Box>
                            <Box
                                mt={2}
                                display={"flex"}
                                justifyContent={"center"}>
                                <Deadline />
                            </Box>
                            <Box
                                mt={2}
                                display={"flex"}
                                justifyContent={"center"}>
                                <BalanceManager />
                            </Box>
                        </Box>
                    )}
                </Box>
                <Box>
                    <Footer width='100%' />
                </Box>
            </>
        </icoContext.Provider>
    );
};

export default ICO;
