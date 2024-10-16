import Grid from '@mui/material/Grid2';
import { StudyConfiguration } from "./StudyConfiguration/StudyConfiguration";
import { Members } from "./Members/Members";
import { TitleAndDescription } from "./TitleAndDescription/TitleAndDescription";
import useConsortiumDetails from "./useConsortiumDetails";
import DirectorySelect from "./DirectorySelect/DirectorySelect";
import { useUserState } from "../../contexts/UserStateContext";
import StartRunButton from "./StartRunButton/StartRunButton";
import { ConsortiumDetailsProvider } from "./ConsortiumDetailsContext";
import { LatestRun } from "./LatestRun/LatestRun";
import ComputationDisplay from "./StudyConfiguration/Computation/ComputationDisplay";
import ConsortiumLeaderNotes from "./ConsortiumLeaderNotes/ConsortiumLeaderNotes";

export default function ConsortiumDetailsPage() {
    const { userId } = useUserState();
    const { data, status, refetch, isLeader } = useConsortiumDetails();
    const { studyConfiguration, members, activeMembers, readyMembers, leader, title, description } = data;

    const isActive = activeMembers.some((member) => member.id === userId);

    return (
        <ConsortiumDetailsProvider refetch={refetch} isLeader={isLeader}>
            <Grid container spacing={2} padding={2}>
                <Grid size={{ sm: 6, md: 4 }}>
                    {/* Title and Description Section */}
                    <TitleAndDescription title={title} description={description} />


                    {/* Start Run Button Section (only if leader) */}
                    {isLeader && (
                        <StartRunButton />
                    )}

                    {/* Directory Select Section (only if active) */}
                    {isActive && (
                        <DirectorySelect />
                    )}

                    {/* Members Section */}
                    <Members members={members} activeMembers={activeMembers} readyMembers={readyMembers} leader={leader} />
                    {studyConfiguration && <ConsortiumLeaderNotes consortiumLeaderNotes={studyConfiguration.consortiumLeaderNotes} />}
                </Grid>
                <Grid size={{ sm: 6, md: 4 }}>
                    {/* Latest Run M */}
                    <LatestRun />
                    {/* Study Configuration Section */}
                    {studyConfiguration && <StudyConfiguration studyConfiguration={studyConfiguration} />}
                </Grid>
                <Grid size={{ sm: 12, md: 4 }}>
                    {studyConfiguration && <ComputationDisplay computation={studyConfiguration.computation} />}
                </Grid>
            </Grid>
        </ConsortiumDetailsProvider>
    );
}
