import ComputationDisplay from "../../ConsortiumDetails/ComputationDisplay/ComputationDisplay";
import ComputationParameters from "../../ConsortiumDetails/ComputationParameters/ComputationParameters";
import { Grid, Box } from "@mui/material";

export default function StepSetParameters() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <ComputationParameters />
            </Grid>
            <Grid item xs={6}>
                {/* Wrapping ComputationDisplay with Box to control overflow */}
                <Box
                    sx={{
                        height: '100%',
                        maxHeight: '50vh',  // Limit height to keep within view
                        overflowY: 'auto',  // Allow vertical scrolling if content exceeds
                        padding: 1,
                        boxSizing: 'border-box',
                    }}
                >
                    <ComputationDisplay />
                </Box>
            </Grid>
        </Grid>
    );
}
