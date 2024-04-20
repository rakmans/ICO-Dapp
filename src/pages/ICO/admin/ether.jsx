import { Button, TextField, Box } from "@mui/material";
import { EtherValid } from "../../../validations/ether";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { UilMessage } from "@iconscout/react-unicons";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import icoContext from "../../../context/icoContext";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {  BrowserProvider } from "ethers";

const Ether = () => {
    const [disabled, setDisabled] = useState(false);
    const { walletProvider } = useWeb3ModalProvider();
    const { ICOContract, ICOData, setICOData } =
        useContext(icoContext);
    const { ICOAddress } = useParams();
    const formik = useFormik({
        initialValues: {
            Ether: "",
        },
        validationSchema: EtherValid,
        onSubmit: (values, { resetForm }) => {
            onclick(values.Ether);
            resetForm();
        },
    });
    const onclick = async (Ether) => {
        if (ICOData.isOwner) {
            const ethersProvider = new BrowserProvider(walletProvider);
            const ICOBalance = await ethersProvider.getBalance(ICOAddress);
            if(BigInt(ICOBalance) < Ether){
                toast.error("your requested amount is more than available amount")
                throw new Error("your requested amount is more than available amount")
            }
            try {
                setDisabled(true);
                const tx = await ICOContract.withdrawEth(Ether);
                await toast.promise(tx.wait(), {
                    pending: "pending transaction",
                    error: "ERROR",
                    success: "transaction successfully done!",
                });
                const ethersProvider = new BrowserProvider(walletProvider);
                const ICOBalance = await ethersProvider.getBalance(ICOAddress);
                setICOData((prev) => ({ ...prev, ICOBalance }));
            } catch (error) {
                toast.error(error.code);
            }
        } else {
            toast.error("only owner can call this function!");
        }
        setDisabled(false);
    };
    return (
        <Box component='form' onSubmit={formik.handleSubmit}>
            <TextField
                sx={{ mb: 4, width: "60%", ml: 2 }}
                id='Ether'
                name='Ether'
                type="number"
                label='How many Wei'
                error={
                    (formik.touched.Ether && formik.errors.Ether) ||
                    ICOData.loading
                }
                value={formik.values.Ether}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                    formik.touched.Ether && formik.errors.Ether
                        ? formik.errors.Ether
                        : null
                }
            />
            <Button
                endIcon={<UilMessage size='35' />}
                disabled={formik.errors.Ether || disabled || ICOData.loading}
                type='submit'
                variant='contained'
                sx={{ mb: 4, fontSize: 20, ml: "5%", width: "30%" }}
                color='success'>
                withdraw ether
            </Button>
        </Box>
    );
};

export default Ether;
