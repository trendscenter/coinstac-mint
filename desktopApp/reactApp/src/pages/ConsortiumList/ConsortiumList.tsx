import React from 'react';
import { Paper, List, Typography, Button, Box, CircularProgress, Container } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { ConsortiumListItem as ConsortiumListItemType } from '../../apis/centralApi/generated/graphql'; // Import the type
import ConsortiumListItem from './ConsortiumListItem'; // Import the new presentation component

interface ConsortiumListProps {
    consortiumList: ConsortiumListItemType[];
    loading: boolean;
    error: string | null;
    onReload: () => void;
}

const ConsortiumList: React.FC<ConsortiumListProps> = ({ consortiumList, loading, error, onReload }) => {
    // Loading state
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    // Error state
    if (error) {
        return (
            <Container>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" marginTop={2}>
                    <Button variant="contained" color="primary" onClick={onReload} sx={{ marginBottom: 2 }}>
                        Reload
                    </Button>
                    <Typography variant="h6" color="error" align="center">
                        {error}
                    </Typography>
                </Box>
            </Container>
        );
    }

    // Success state (show list and reload button at the top)
    return (
        <Container maxWidth="lg">
            <Box display="flex" flexDirection="row" marginTop={4} marginBottom={2}>
                <Box flex={1}>
                    <Typography variant="h4" gutterBottom align="left">
                        Consortium List
                    </Typography>
                </Box>
                <Box>
                    <Button variant="contained" color="primary" onClick={onReload} sx={{ marginBottom: 2 }}>
                        Reload
                        <ReplayIcon sx={{fontSize: '1rem'}} />
                    </Button>
                </Box>
            </Box>
            <Box>
                <>
                    {consortiumList.map((consortium, index) => (
                        <ConsortiumListItem key={index} consortium={consortium} />
                    ))}
                </>
            </Box>
        </Container>
    );
};

export default ConsortiumList;