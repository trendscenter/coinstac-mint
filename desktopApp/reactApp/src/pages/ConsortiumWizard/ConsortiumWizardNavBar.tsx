import { Box, Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function ConsortiumWizardNavBar() {
    const steps = [
        { label: 'Select Data', path: 'step-select-data' },
        { label: 'Select Computation', path: 'step-select-computation' },
        { label: 'Set Parameters', path: 'step-set-parameters' },
        { label: 'Start Run', path: 'step-start-run' },
    ];

    const location = useLocation();
    return <>

        <Box sx={{ flexGrow: 1, my: 2 }}>
            <Grid container spacing={2}>
                {steps.map((step, index) => {
                    const isActive = location.pathname.includes(step.path);
                    return (
                        <Grid item xs={3} key={step.path}>
                            <Button
                                component={Link}
                                to={step.path}
                                variant="contained"
                                fullWidth
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    py: 2,
                                    backgroundColor: isActive ? 'primary.main' : 'grey.300',
                                    color: isActive ? 'white' : 'black',
                                    '&:hover': {
                                        backgroundColor: isActive ? 'primary.dark' : 'grey.400',
                                    },
                                }}
                            >
                                <Typography variant="button">{index + 1}: {step.label}</Typography>
                            </Button>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    </>
}