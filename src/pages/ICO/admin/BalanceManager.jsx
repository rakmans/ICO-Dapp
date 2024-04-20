import { Card, Button, Typography, TextField, Box } from "@mui/material";
import { TokenValid } from "../../../validations/Token";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import Ether from "./ether";
import icoContext from "../../../context/icoContext";
import { toast } from "react-toastify";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useParams } from "react-router-dom";
const BalanceManagement = () => {
    const [btnClicked, setBtnClicked] = useState("");
    const [disabled, setDisabled] = useState(false);
    const { ICOContract, ICOData, setTokenData, tokenContract, tokenData } =
        useContext(icoContext);
    const { ICOAddress } = useParams();
    const { address } = useWeb3ModalAccount();
    const formik = useFormik({
        initialValues: {
            Token: "",
        },
        validationSchema: TokenValid,
        onSubmit: (values, { resetForm }) => {
            onclick(values.Token, btnClicked);
            resetForm();
        },
    });
    const onclick = async (Token, btn) => {
        if (ICOData.isOwner) {
            if (btn === "Deposit") {
                if (ICOData.stage !== 0n) {
                    toast.error("ICO is active");
                    throw new Error("ICO is active");
                }
                if (tokenData.userInventory <= Token) {
                    toast.error("You do not have enough token!");
                    throw new Error("You do not have enough token!");
                }
                try {
                    const value = BigInt(Token) * BigInt(Math.pow(10, 18));
                    const allowance = await tokenContract.allowance(
                        address,
                        ICOAddress
                    );
                    if (allowance >= value) {
                        setDisabled(true);
                        const tx = await ICOContract.depositTokens(value);
                        await toast.promise(tx.wait(), {
                            pending: "pending transaction",
                            error: "ERROR",
                            success: "transaction successfully done!",
                        });
                        let userInventory = await tokenContract.balanceOf(
                            address
                        );
                        userInventory =
                            userInventory / BigInt(Math.pow(10, 18));
                        let remindToken = await tokenContract.balanceOf(
                            ICOAddress
                        );
                        remindToken = remindToken / BigInt(Math.pow(10, 18));
                        setTokenData((prev) => ({
                            ...prev,
                            userInventory,
                            remindToken,
                        }));
                    } else {
                        toast.error("you need to approve more tokens");
                    }
                } catch (error) {
                    toast.error(error.code);
                }
            } else if (btn === "Withdraw") {
                if (tokenData.remindToken < BigInt(Token)) {
                    toast.error(
                        "your requested amount is more than available amount"
                    );
                    throw new Error(
                        "your requested amount is more than available amount"
                    );
                }
                try {
                    const value = BigInt(Token) * BigInt(Math.pow(10, 18));
                    console.log("first");
                    console.log(value);
                    setDisabled(true);
                    const tx = await ICOContract.withdrawTokens(value);
                    await toast.promise(tx.wait(), {
                        pending: "pending transaction",
                        error: "ERROR",
                        success: "transaction successfully done!",
                    });
                    let userInventory = await tokenContract.balanceOf(address);
                    userInventory = userInventory / BigInt(Math.pow(10, 18));
                    let remindToken = await tokenContract.balanceOf(ICOAddress);
                    remindToken = remindToken / BigInt(Math.pow(10, 18));
                    setTokenData((prev) => ({
                        ...prev,
                        userInventory,
                        remindToken,
                    }));
                } catch (error) {
                    toast.error(error.code);
                }
            }
            setDisabled(false);
            let userInventory = await tokenContract.balanceOf(address);
            userInventory = userInventory / BigInt(Math.pow(10, 18));
            let remindToken = await tokenContract.balanceOf(ICOAddress);
            remindToken = remindToken / BigInt(Math.pow(10, 18));
            setTokenData((prev) => ({
                ...prev,
                userInventory,
                remindToken,
            }));
        } else {
            toast.error("only owner can call this function!");
        }
    };
    return (
        <Card
            sx={{
                width: "90%",
                borderRadius: 7,
            }}>
            <Typography variant='h5' ml={2} mt={2}>
                ICO Balance Management (Admin)
            </Typography>
            <Typography variant='body2' ml={2} mt={1}>
                {ICOData.ICOBalance !== "loading"
                    ? ICOData.ICOBalance.toString() + " Wei"
                    : "loading"}
            </Typography>
            <Typography variant='body2' ml={2} mt={1}></Typography>
            <Box component='form' onSubmit={formik.handleSubmit}>
                <TextField
                    sx={{ mb: 4, mt: 7, width: "40%", ml: 2 }}
                    id='Token'
                    name='Token'
                    type='number'
                    label='How many tokens'
                    error={
                        formik.touched.Token && formik.errors.Token
                            ? true
                            : false
                    }
                    value={formik.values.Token}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                        formik.touched.Token && formik.errors.Token
                            ? formik.errors.Token
                            : null
                    }
                />
                <Button
                    disabled={formik.errors.Token || disabled ? true : false}
                    type='submit'
                    variant='contained'
                    sx={{
                        mb: 4,
                        mt: 7,
                        fontSize: "1.7vw",
                        ml: "5%",
                        width: "25%",
                    }}
                    color='success'
                    onMouseOver={(event) => {
                        setBtnClicked("Deposit");
                    }}>
                    Deposit tokens
                </Button>
                <Button
                    disabled={
                        formik.errors.Token || disabled || ICOData.loading
                    }
                    type='submit'
                    variant='contained'
                    sx={{
                        mb: 4,
                        mt: 7,
                        fontSize: "1.7vw",
                        ml: "1%",
                        width: "25%",
                    }}
                    color='success'
                    onMouseOver={(event) => {
                        setBtnClicked("Withdraw");
                    }}>
                    Withdraw tokens
                </Button>
            </Box>
            <Ether />
        </Card>
    );
};

export default BalanceManagement;
