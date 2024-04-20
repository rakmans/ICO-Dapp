import {
    Card,
    Button,
    Typography,
    TextField,
    Box,
    Select,
    MenuItem,
} from "@mui/material";
import { DeadlineValid } from "../../../validations/Deadline";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import icoContext from "../../../context/icoContext";
import { BrowserProvider } from "ethers";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
const Deadline = () => {
    const { walletProvider } = useWeb3ModalProvider();
    const [disabled, setDisabled] = useState(false);
    const { ICOContract, ICOData, setICOData } = useContext(icoContext);
    const formik = useFormik({
        initialValues: {
            Deadline: Number,
            stage: "",
        },
        validationSchema: DeadlineValid,
        onSubmit: (values, { resetForm }) => {
            onclickActivate(values);
            resetForm();
        },
    });
    const onclickActivate = async (values) => {
        if (ICOData.isOwner) {
            if (ICOData.stage !== 0n) {
                toast.error("ICO is already active");
                throw new Error("ICO is already active");
            }
            try {
                if (values.stage === "Airdrop") {
                    var stage = 1;
                } else {
                    var stage = 2;
                }
                const deadLine = values.Deadline * 86400;
                setDisabled(true);
                const tx = await ICOContract.active(deadLine, stage);
                await toast.promise(tx.wait(), {
                    pending: "pending transaction",
                    error: "ERROR",
                    success: "transaction successfully done!",
                });
                const ethersProvider = new BrowserProvider(walletProvider);
                const icoEndTime = await ICOContract.icoEndTime();
                const block = await ethersProvider.getBlock("latest");
                if (icoEndTime === 0n) {
                    var remindTime = 0n;
                } else {
                    var remindTime = icoEndTime - BigInt(block.timestamp);
                }
                setICOData((prev) => ({ ...prev, remindTime }));
            } catch (error) {
                toast.error(error.code);
            }
        } else {
            toast.error("only owner can call this function!");
        }
        setDisabled(false);
    };
    const onclickDeActivate = async () => {
        if (ICOData.isOwner) {
            if (ICOData.stage === 0n) {
                toast.error("ICO is already inactive");
                throw new Error("ICO is already inactive");
            }
            try {
                setDisabled(true);
                const tx = await ICOContract.deActive();
                await toast.promise(tx.wait(), {
                    pending: "pending transaction",
                    error: "ERROR",
                    success: "transaction successfully done!",
                });
                setDisabled(false);
                const ethersProvider = new BrowserProvider(walletProvider);
                const icoEndTime = await ICOContract.icoEndTime();
                const block = await ethersProvider.getBlock("latest");
                if (icoEndTime === 0n) {
                    var remindTime = 0n;
                } else {
                    var remindTime = icoEndTime - BigInt(block.timestamp);
                }
                setICOData((prev) => ({ ...prev, remindTime, stage: 0n }));
            } catch (error) {
                toast.error(error.code);
            }
        } else {
            toast.error("only owner can call this function!");
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
                Airdrop Deadline (Admin)
            </Typography>
            <Box component='form' onSubmit={formik.handleSubmit}>
                <TextField
                    sx={{ mb: 4, mt: 7, width: "20%", ml: 2 }}
                    id='Deadline'
                    name='Deadline'
                    label='How many days'
                    type='number'
                    error={
                        formik.touched.Deadline && formik.errors.Deadline
                            ? true
                            : false
                    }
                    value={formik.values.Deadline}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                        formik.touched.Deadline && formik.errors.Deadline
                            ? formik.errors.Deadline
                            : null
                    }
                />
                <Select
                    defaultValue={"Sale"}
                    label='stage'
                    name='stage'
                    id='stage'
                    sx={{ width: "20%", ml: 2, mt: 7 }}
                    onChange={formik.handleChange}>
                    <MenuItem value={"Sale"}>Sale</MenuItem>
                    <MenuItem value={"Airdrop"}>Airdrop</MenuItem>
                </Select>
                <Button
                    disabled={
                        formik.errors.Deadline || disabled
                            ? true
                            : false || ICOData.loading
                    }
                    type='submit'
                    variant='contained'
                    sx={{
                        mb: 4,
                        mt: 3.2,
                        fontSize: 25,
                        ml: "5%",
                        width: "25%",
                    }}
                    color='success'>
                    Activate
                </Button>
                <Button
                    variant='contained'
                    disabled={disabled || ICOData.loading}
                    sx={{
                        mb: 4,
                        mt: 3.2,
                        fontSize: 25,
                        ml: "1%",
                        width: "25%",
                    }}
                    color='error'
                    onClick={() => onclickDeActivate()}>
                    Deactivate
                </Button>
            </Box>
        </Card>
    );
};

export default Deadline;
