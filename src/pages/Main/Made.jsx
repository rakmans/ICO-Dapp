import { useState } from "react";
import {
    Box,
    Typography,
    Button,
    Grid,
    TextField,
    Avatar,
} from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { MadeValid } from "../../validations/Made";
import { UilChart } from "@iconscout/react-unicons";
import { GeneratorContract } from "../../utils/GenerateContract";
import SucceedModal from "./Modal.jsx";

import { BrowserProvider } from "ethers";
import {
    useWeb3ModalAccount,
    useWeb3ModalProvider,
    useWeb3Modal,
} from "@web3modal/ethers/react";
const Made = () => {
    const [btn, setBtn] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [address, setAdrress] = useState("");
    const formik = useFormik({
        initialValues: {
            address: "",
            maxAirdropAmount: Number,
            holderAirdropAmount: Number,
            tokenRate: Number,
        },
        validationSchema: MadeValid,
        onSubmit: (values, { resetForm }) => {
            onclick(values);
            resetForm();
        },
    });
    const { isConnected } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();
    const { open } = useWeb3Modal();
    const onclick = async (values) => {
        try {
            setBtn(false);
            if (!isConnected) {
                open();
                setBtn(true);
                throw toast.error("User disconnected");
            }
            const ethersProvider = new BrowserProvider(walletProvider);
            const signer = await ethersProvider.getSigner();
            try {
                const contract = await toast.promise(
                    GeneratorContract(values, signer),
                    {
                        pending: "pending transaction",
                        success: "ICO created successfully",
                        error: "ERROR",
                    }
                );
                setAdrress(contract);
                setBtn(true);
                setOpenModal(true);
            } catch (error) {
                toast.error(error.code);
                console.log(error);
            }
        } catch (error) {
            setBtn(true);
            console.log(error);
        }
    };
    return (
        <Box component='form' onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <Box
                textAlign='center'
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    mt: 2,
                    alignItems: "center",
                    mb: 5,
                }}>
                <Avatar
                    sx={{
                        m: 1,
                        bgcolor: "primary.main",
                        color: "white",
                        textAlign: "center",
                    }}>
                    <UilChart />
                </Avatar>
                <Typography variant='h4'>Made ICO</Typography>
            </Box>
            <Grid container spacing={2} sx={{ textAlign: "center" }}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        autoFocus
                        error={
                            formik.touched.address && formik.errors.address
                                ? true
                                : false
                        }
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={
                            formik.touched.address && formik.errors.address
                                ? formik.errors.address
                                : null
                        }
                        name='address'
                        sx={{
                            width: {
                                xs: "92%",
                                md: "100%",
                                sm: "98%",
                            },
                        }}
                        id='address'
                        label='Token address'
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        error={
                            formik.touched.maxAirdropAmount &&
                            formik.errors.maxAirdropAmount
                                ? true
                                : false
                        }
                        value={formik.values.maxAirdropAmount}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={
                            formik.touched.maxAirdropAmount &&
                            formik.errors.maxAirdropAmount
                                ? formik.errors.maxAirdropAmount
                                : null
                        }
                        name='maxAirdropAmount'
                        sx={{
                            width: {
                                xs: "92%",
                                md: "100%",
                                sm: "98%",
                            },
                        }}
                        id='maxAirdropAmount'
                        label='max Airdrop Amount'
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        error={
                            formik.touched.holderAirdropAmount &&
                            formik.errors.holderAirdropAmount
                                ? true
                                : false
                        }
                        value={formik.values.holderAirdropAmount}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={
                            formik.touched.holderAirdropAmount &&
                            formik.errors.holderAirdropAmount
                                ? formik.errors.holderAirdropAmount
                                : null
                        }
                        name='holderAirdropAmount'
                        sx={{
                            width: {
                                xs: "92%",
                                md: "100%",
                                sm: "98%",
                            },
                        }}
                        id='holderAirdropAmount'
                        label='holder Airdrop Amount'
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        error={
                            formik.touched.tokenRate && formik.errors.tokenRate
                                ? true
                                : false
                        }
                        value={formik.values.tokenRate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={
                            formik.touched.tokenRate && formik.errors.tokenRate
                                ? formik.errors.tokenRate
                                : null
                        }
                        name='tokenRate'
                        sx={{
                            width: {
                                xs: "92%",
                                md: "100%",
                                sm: "98%",
                            },
                        }}
                        id='tokenRate'
                        label='token Rate'
                    />
                </Grid>
            </Grid>
            <Button
                disabled={
                    formik.errors.address ||
                    formik.errors.holderAirdropAmount ||
                    formik.errors.maxAirdropAmount ||
                    formik.errors.tokenRate ||
                    !btn
                        ? true
                        : false
                }
                fullWidth
                type='submit'
                variant='contained'
                sx={{ mt: 3, fontSize: 15 }}>
                Made ico
            </Button>
            <SucceedModal
                onChange={(newOpen) => setOpenModal(newOpen)}
                open={openModal}
                ICOAddress={address}
            />
        </Box>
    );
};

export default Made;
