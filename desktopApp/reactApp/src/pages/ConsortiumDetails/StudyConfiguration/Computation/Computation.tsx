import { Box, Typography } from "@mui/material";
import { Computation as ComputationType } from "../../../../apis/centralApi/generated/graphql";
import ComputationSelect from "./ComputationSelect/ComputationSelect";
import { useConsortiumDetailsContext } from "../../ConsortiumDetailsContext";

export default function Computation({ computation }: { computation: ComputationType }) {
    const { isLeader } = useConsortiumDetailsContext();

    return <Box p={2} borderRadius={2}  marginBottom={2} bgcolor={'white'} display="flex" justifyContent="space-between">
        <Box>
            <Typography variant="h6" gutterBottom>
                Computation
            </Typography>
            <Typography variant="h6" fontWeight="600" color="black" lineHeight="1">{computation?.title}</Typography>
            <Typography variant="body1" marginBottom="0.2rem">{computation?.imageName}</Typography>
            <a id="compnotes-anchor" style={{fontSize: '0.9rem'}} href="#compnotes">View Notes</a>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center">
            {isLeader && <ComputationSelect />}
        </Box>
    </Box>
}