import React from 'react';
import { Paper, List, Typography, Button, Box, CircularProgress, Container } from '@mui/material';
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
        <Container maxWidth="md">
            <Box display="flex" flexDirection="column" alignItems="center" marginBottom={2}>
                <Typography variant="h4" gutterBottom align="center">
                    Consortium List
                </Typography>
                <Button variant="contained" color="primary" onClick={onReload} sx={{ marginBottom: 2 }}>
                    Reload
                </Button>
            </Box>
            <Paper elevation={3}>
                <List>
                    {consortiumList.map((consortium, index) => (
                        <ConsortiumListItem key={index} consortium={consortium} />
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default ConsortiumList;
