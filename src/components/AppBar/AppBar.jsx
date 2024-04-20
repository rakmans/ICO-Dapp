import {
    CssBaseline,
    Fab,
    Container,
    AppBar,
    Box,
    Toolbar,
    Button,
    useTheme,
} from "@mui/material";
import { UilAngleUp } from "@iconscout/react-unicons";
import { NavLink } from "react-router-dom";

import { ScrollTop, ElevationScroll } from "../../utils/index";
import { MenuBar, Mode, rakmans, Balance } from "./index";
import WalletConnect from "../../components/WalletConnectButton";

const Appbar = ({ page }) => {
    const theme = useTheme();
    return (
        <>
            <CssBaseline />
            <ElevationScroll>
                <AppBar
                    className='appBar'
                    sx={{
                        width: "100%",
                        bgcolor: theme.palette.mode === "dark" ? "" : "white",
                        backdropFilter: "blur(3px)",
                        borderBottom: `2px solid ${
                            theme.palette.mode == "dark" ? "#40679E" : "#1B3C73"
                        }`,
                        WebkitBackdropFilter: "blur(3px)",
                        zIndex: 9,
                    }}>
                    <Container maxWidth='xl'>
                        <Toolbar disableGutters>
                            <Box
                                component='img'
                                sx={{
                                    mr: 2,
                                    display: { xs: "none", md: "flex" },
                                    width: 50,
                                }}
                                src={rakmans}
                                alt='logo'
                            />
                            <Box
                                sx={{
                                    flexGrow: { xs: 1, sm: 0 },
                                    mr: { sm: 2 },
                                    display: { xs: "flex", md: "none" },
                                }}>
                                <MenuBar />
                            </Box>
                            <Box
                                sx={{
                                    display: {
                                        sm: "flex",
                                        md: "none",
                                        xs: "none",
                                    },
                                    flexGrow: 1,
                                    fontSize: "30px",
                                }}>
                                <Box
                                    component='img'
                                    src={rakmans}
                                    alt='logo'
                                    width={50}
                                />
                            </Box>
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: { xs: "none", md: "flex" },
                                }}>
                                <NavLink
                                    to='/'
                                    style={{
                                        color: "#1B3C73",
                                        textDecoration: "none",
                                    }}>
                                    <Button
                                        color='secondary'
                                        sx={{
                                            my: 2,
                                            display: "block",
                                            fontSize: "20px",
                                        }}>
                                        Main
                                    </Button>
                                </NavLink>
                            </Box>
                            {page === 1 ? <Balance /> : ""}
                            <Box
                                sx={{ flexGrow: { xs: 1, sm: 0 } }}
                                display={"flex"}>
                                <WalletConnect />
                            </Box>
                            <Mode />
                        </Toolbar>
                    </Container>
                </AppBar>
            </ElevationScroll>
            <Box id='back-to-top-anchor' />
            <ScrollTop>
                <Fab color='primary' size='small'>
                    <UilAngleUp />
                </Fab>
            </ScrollTop>
        </>
    );
};

export default Appbar;
