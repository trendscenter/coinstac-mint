import Grid from '@mui/material/Grid2';
import { Members } from "./Members/Members";
import { TitleAndDescription } from "./TitleAndDescription/TitleAndDescription";
import DirectorySelect from "./DirectorySelect/DirectorySelect";
import { useUserState } from "../../contexts/UserStateContext";
import StartRunButton from "./StartRunButton/StartRunButton";
import { ConsortiumDetailsProvider, useConsortiumDetailsContext } from "./ConsortiumDetailsContext";
import { LatestRun } from "./LatestRun/LatestRun";
import ComputationDisplay from "./ComputationDisplay/ComputationDisplay";
import ConsortiumLeaderNotes from "./ConsortiumLeaderNotes/ConsortiumLeaderNotes";
import Computation from "./Computation/Computation";
import ComputationParameters from "./ComputationParameters/ComputationParameters";
import { useNavigate, useParams } from 'react-router-dom';

export function ConsortiumDetailsPage() {
    const { consortiumId } = useParams<{ consortiumId: string }>();
    const { data: { studyConfiguration, members, activeMembers, readyMembers, leader, title, description }, status: { loading, error }, isLeader } = useConsortiumDetailsContext();
    const { userId } = useUserState();
    const navigate = useNavigate();

    const isActive = activeMembers.some((member) => member.id === userId);

    return (
        <Grid container spacing={2} padding={2}>
            <Grid size={{ sm: 6, md: 4 }}>
                {/* Title and Description Section */}
                <TitleAndDescription title={title} description={description} />


                {/* Start Run Button Section (only if leader a computation has been selected) */}
                {isLeader && studyConfiguration?.computation && (
                    <StartRunButton />
                )}

                {/* Directory Select Section (only if active) */}
                {isActive && (
                    <DirectorySelect />
                )}

                {/* Members Section */}
                <Members members={members} activeMembers={activeMembers} readyMembers={readyMembers} leader={leader} />

                {/* Leader Notes */}
                {studyConfiguration && <ConsortiumLeaderNotes consortiumLeaderNotes={studyConfiguration?.consortiumLeaderNotes} />}
            </Grid>
            <Grid size={{ sm: 6, md: 4 }} className="consortium-details-grid-2">
                {/* Consortium Link @ Smaller Viewport */}
                <a onClick={() => navigate(`/consortium/wizard/${consortiumId}`)} className='consortium-list-link'>
                    &#60; To Wizard View
                </a>
                <a onClick={() => navigate('/consortium/list')} className='consortium-list-link'>
                    &#60; Back To Consortium List
                </a>
                {/* Latest Run */}
                <LatestRun />
                {/* Computation */}
                <Computation computation={studyConfiguration?.computation} />
                {/* Computation Parameters */}
                {studyConfiguration && studyConfiguration?.computation && <ComputationParameters />}
            </Grid>
            <Grid size={{ sm: 12, md: 4 }} className="consortium-details-grid-3">
                {/* Consortium Link @ Larger Viewport */}
                {/* <a onClick={() => navigate('/consortium/list')} className='consortium-list-link'>
                    &#60; Back To Consortium List
                </a> */}
                <a onClick={() => navigate(`/consortium/wizard/${consortiumId}`)} className='consortium-list-link'>
                   To Wizard View
                </a>
                {/* Computation Notes */}
                <ComputationDisplay />
            </Grid>
        </Grid>

    );
}


export default function ConsortiumDetailsPageWithProvider() {
    return <ConsortiumDetailsProvider>
        <ConsortiumDetailsPage />
    </ConsortiumDetailsProvider>
}