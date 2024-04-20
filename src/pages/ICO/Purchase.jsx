import { Card, Button, Typography, TextField, Box } from "@mui/material";
import { PurchaseValid } from "../../validations/Purchase";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { UilMessage } from "@iconscout/react-unicons";
import icoContext from "../../context/icoContext";
import {
    useWeb3ModalAccount,
    useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { BrowserProvider } from "ethers";
const Purchase = () => {
    const { isConnected } = useWeb3ModalAccount();
    const [disabled, setDisabled] = useState(false);
    const { walletProvider } = useWeb3ModalProvider();
    const { ICOContract, ICOData, setTokenData, tokenContract, tokenData } =
        useContext(icoContext);
    const { address } = useWeb3ModalAccount();
    const { ICOAddress } = useParams();
    const formik = useFormik({
        initialValues: {
            Purchase: "",
        },
        validationSchema: PurchaseValid,
        onSubmit: (values, { resetForm }) => {
            onclick(values);
            resetForm();
        },
    });
    const onclick = async (values) => {
        if (tokenData.remindToken < BigInt(values.Purchase)) {
            toast.error("Not enough tokens in ICO");
            throw new Error("Not enough tokens in ICO");
        }
        try {
            let value = values.Purchase;
            let price = BigInt(value) * BigInt(ICOData.tokenRate);
            const ethersProvider = new BrowserProvider(walletProvider);
            const userBalance = await ethersProvider.getBalance(address);
            if (BigInt(userBalance) < price) {
                toast.error("you do not have enough ether");
                throw new Error("you do not have enough ether");
            }
            setDisabled(true);
            const tx = await ICOContract.purchase(
                BigInt(value) * BigInt(Math.pow(10, 18)),
                { value: price, gasLimit: 1000000 }
            );
            await toast.promise(tx.wait(), {
                pending: "pending transaction",
                error: "ERROR",
                success: "transaction successfully done!",
            });
            console.log("0")
            let userInventory = await tokenContract.balanceOf(address);
            console.log("1")
            userInventory = userInventory / BigInt(Math.pow(10, 18));
            console.log("2")
            let remindToken = await tokenContract.balanceOf(ICOAddress);
            console.log("3")
            remindToken = remindToken / BigInt(Math.pow(10, 18));
            console.log("4")
            let holdersCount = await ICOContract.holdersCount();
            console.log({holdersCount,
                userInventory,
                remindToken,})
            setTokenData((prev) => ({
                ...prev,
                holdersCount,
                userInventory,
                remindToken,
            }));
        } catch (error) {
            toast.error(error.code);
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
                Purchase some Tokens
            </Typography>
            <Typography variant='body1' ml={2} mt={0.5}>
                Price:{" "}
                {!isConnected
                    ? "you not connected"
                    : ICOData.tokenRate.toString()}{" "}
                wei
            </Typography>
            <Box component='form' onSubmit={formik.handleSubmit}>
                <TextField
                    sx={{ mb: 4, mt: 7, width: "60%", ml: 2 }}
                    id='Purchase'
                    name='Purchase'
                    type='number'
                    label='How many tokens'
                    error={
                        formik.touched.Purchase && formik.errors.Purchase
                            ? true
                            : false
                    }
                    value={formik.values.Purchase}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                        formik.touched.Purchase && formik.errors.Purchase
                            ? formik.errors.Purchase
                            : null
                    }
                />
                <Button
                    endIcon={<UilMessage size='35' />}
                    disabled={
                        formik.errors.Purchase || disabled || ICOData.loading
                    }
                    type='submit'
                    variant='contained'
                    sx={{ mb: 4, mt: 7, fontSize: 25, ml: "5%", width: "30%" }}
                    color='success'>
                    Purchase
                </Button>
            </Box>
        </Card>
    );
};

export default Purchase;
