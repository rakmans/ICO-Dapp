import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { pink } from "@mui/material/colors";
import { lili } from "../../constants/particles.js";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
const Page_404 = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = (container) => {
        console.log(container);
    };
    return (
        <div
            style={{
                backgroundColor: "black",
                alignItems: "center",
                textAlign: "center",
                height: "100vh",
                pt: "10vw",
            }}>
            {init && (
                <Particles
                    id='tsparticles'
                    particlesLoaded={particlesLoaded}
                    options={lili}
                />
            )}
            <Typography
                variant='h2'
                component='div'
                sx={{
                    flexGrow: 1,
                    fontSize: "100px",
                    pl: "5vw",
                    pt: "4vw",
                    color: pink[400],
                }}
                className='GjpTh'>
                404
                <Typography
                    variant='p'
                    component='div'
                    sx={{
                        flexGrow: 1,
                        fontSize: "5vw",
                        color: "white",
                    }}>
                    Page is not definde ...
                </Typography>
            </Typography>
        </div>
    );
};

export default Page_404;
