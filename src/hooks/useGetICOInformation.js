import {
    useWeb3ModalAccount,
    useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Contract, BrowserProvider, ethers } from "ethers";
import { ICOABI } from "../data/ICOData/ICOABI";
import { tokenABI } from "../data/tokenData/tokenABI";

export const useGetICOInformation = () => {
    const { isConnected, address } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();
    const { ICOAddress } = useParams();
    const [ICOContract, setICOContract] = useState("loading");
    const [ICOData, setICOData] = useState({
        holdersCount: "loading",
        maxAirdropAmount: "loading",
        holderAirdropAmount:"loading",
        ICOBalance:"loading",
        tokenRate:"loading",
        remindTime: "loading",
        stage:"loading",
        isOwner: false,
        loading:true
    });
    const [tokenContract, setTokenContract] = useState();
    const [tokenData, setTokenData] = useState({
        address: "loading",
        userInventory: "loading",
        remindToken: "loading",
        totalSupply: "loading",
        symbol: "loading",
    });

    useEffect(() => {
        const fetchData = async () => {
            const ethersProvider = new BrowserProvider(walletProvider);
            const ICOBalance = await ethersProvider.getBalance(ICOAddress)
            const signer = await ethersProvider.getSigner();
            const ICO = new Contract(ICOAddress, ICOABI, signer);
            const tokenAddress = await ICO.token();
            const Token = new Contract(tokenAddress, tokenABI, signer);
            const stage = await ICO.stage()
            const holdersCount = await ICO.holdersCount();
            const tokenRate = await ICO.tokenRate();
            let maxAirdropAmount = await ICO.maxAirdropAmount();
            maxAirdropAmount = maxAirdropAmount / BigInt(Math.pow(10, 18));
            let holderAirdropAmount = await ICO.holderAirdropAmount();
            holderAirdropAmount = holderAirdropAmount / BigInt(Math.pow(10, 18));
            const icoEndTime = await ICO.icoEndTime();
            const block = await ethersProvider.getBlock("latest");
            if (icoEndTime === 0n) {
                var remindTime = 0n;
            } else {
                var remindTime = icoEndTime - BigInt(block.timestamp);
            }
            const owner = await ICO.owner();
            const isOwner = address === owner;
            let userInventory = await Token.balanceOf(address);
            userInventory = userInventory / BigInt(Math.pow(10, 18));
            let remindToken = await Token.balanceOf(ICOAddress);
            remindToken = remindToken / BigInt(Math.pow(10, 18));
            let totalSupply = await Token.totalSupply();
            totalSupply = totalSupply / BigInt(Math.pow(10, 18));
            const tokenSymbol = await Token.symbol();
            setICOContract(ICO);
            setICOData({
                holdersCount,
                maxAirdropAmount,
                holderAirdropAmount,
                ICOBalance,
                tokenRate,
                remindTime,
                stage,
                isOwner,
                loading:false
            });
            setTokenContract(Token);
            setTokenData({
                address: tokenAddress,
                userInventory,
                remindToken,
                totalSupply,
                symbol: tokenSymbol,
            });
        };
        if (isConnected) {
            fetchData();
        }
    }, [isConnected]);
    return {
        ICOData,
        tokenData,
        tokenContract,
        ICOContract,
        setICOData,
        setTokenData,
    };
};
