import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useLatestRun } from "./useLatestRun"; // Import the custom hook

export function LatestRunDisplay({ latestRun, loading, navigateToRunDetails }: ReturnType<typeof useLatestRun> & { navigateToRunDetails: (runId: string) => void }) {
    return (
        <>
        {loading ? (
            <CircularProgress />
        ) : (latestRun &&
        <Box p={2} borderRadius={2}  bgcolor="white" marginBottom={2}>
            <Typography variant="h6" gutterBottom>
                Latest Run
            </Typography>
            <Box 
                p={2} 
                borderRadius={2} 
                bgcolor="#EEF2F2" 
                display='flex' 
                justifyContent="space-between" 
                alignItems="center"
                style={{animation: "fadeIn 2s"}}
            >
                <Box>
                    <Typography variant="body1" style={{fontWeight: 'bold', color: '#0066FF'}}>
                        {latestRun.consortiumTitle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" fontSize="11px">
                        <strong>Status:</strong> <strong style={{color: "#2FB600"}}>{latestRun.status} </strong><br />
                        <strong>Created At:</strong> {new Date(Number(latestRun.createdAt)).toLocaleString()}<br />
                        <strong>Last Updated:</strong> {new Date(Number(latestRun.lastUpdated)).toLocaleString()}<br />
                        <span style={{fontSize: '11px',  color: '#aaa'}}>{latestRun.runId}</span>
                    </Typography>
                </Box>
                <Box mt={2}>
                    <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        onClick={() => navigateToRunDetails()}
                    >
                        Details
                    </Button>
                </Box>
            </Box>
        </Box>)}
        </>
    );
}
