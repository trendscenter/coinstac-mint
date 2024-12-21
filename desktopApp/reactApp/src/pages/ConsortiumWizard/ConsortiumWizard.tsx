import { Route, Routes, useNavigate, useParams, Navigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material'; // Importing Button from Material UI
import StepSelectComputation from './steps/StepSelectComputation';
import StepSetParameters from './steps/StepSetParameters';
import StepSelectData from './steps/StepSelectData';
import StepStartRun from './steps/StepStartRun';
import ConsortiumWizardNavBar from './ConsortiumWizardNavBar';
import { ConsortiumDetailsProvider } from '../ConsortiumDetails/ConsortiumDetailsContext';

const ConsortiumWizard = () => {
    return (
        <>
            <Typography variant="h4" gutterBottom>
                Consortium Wizard
            </Typography>
            <NavigateToConsortiumDetailsButton />
            <ConsortiumWizardNavBar />
            {/* Control Panel Button */}


            {/* Step Routes */}
            <Routes>
                {/* Default route to redirect to the first step */}
                <Route path="/" element={<Navigate to="step-select-data" replace />} />
                <Route path="step-select-computation" element={<StepSelectComputation />} />
                <Route path="step-set-parameters" element={<StepSetParameters />} />
                <Route path="step-select-data" element={<StepSelectData />} />
                <Route path="step-start-run" element={<StepStartRun />} />
            </Routes>
        </>
    );
};

function NavigateToConsortiumDetailsButton() {
    const { consortiumId } = useParams<{ consortiumId: string }>();
    const navigate = useNavigate();

    // Handler to navigate to consortium control panel
    const handleNavigateToConsortiumDetails = () => {
        if (consortiumId) {
            navigate(`/consortium/details/${consortiumId}`);
        }
    };

    return (
        <Box sx={{ my: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleNavigateToConsortiumDetails}
            >
                Go to Consortium Details
            </Button>
        </Box>
    );
}

// Wrapped version with the Provider
export default function ConsortiumWizardWithProvider() {
    return (
        <ConsortiumDetailsProvider>
            <ConsortiumWizard />
        </ConsortiumDetailsProvider>
    );
}
