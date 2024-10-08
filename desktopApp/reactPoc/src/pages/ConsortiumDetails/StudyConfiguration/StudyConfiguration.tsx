import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Computation from "./Computation/Computation";
import ComputationParameters from "./ComputationParameters/ComputationParameters";
import ConsortiumLeaderNotes from "./ConsortiumLeaderNotes/ConsortiumLeaderNotes";

export function StudyConfiguration({ studyConfiguration }: { studyConfiguration: any }) {
    const { computation, computationParameters, consortiumLeaderNotes } = studyConfiguration;

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Study Configuration
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <Computation computation={computation} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <ComputationParameters computationParameters={computationParameters} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <ConsortiumLeaderNotes consortiumLeaderNotes={consortiumLeaderNotes} />
                </Grid>
            </Grid>
        </Box>
    );
}
