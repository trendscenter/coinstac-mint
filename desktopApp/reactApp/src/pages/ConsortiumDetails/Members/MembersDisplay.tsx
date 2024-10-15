import { Box, CardActions, FormControlLabel, Switch, Typography } from "@mui/material";
import MemberAvatar from "./MemberAvatar";

interface MembersDisplayProps {
    memberList: {
        id: string;
        username: string;
        isActive: boolean;
        isReady: boolean;
        isLeader: boolean;
        isMe: boolean;
    }[];
    setMemberActive: (memberId: string, isActive: boolean) => void;
    setMemberReady: (memberId: string, isReady: boolean) => void;
}


export function MembersDisplay({ memberList, setMemberActive, setMemberReady }: MembersDisplayProps) {

    const itsMe = memberList.find((member) => member.isMe === true);

    return(<Box 
        p={2} 
        border={1} 
        borderRadius={2} 
        borderColor="grey.300" 
        marginBottom={2} 
        bgcolor={'white'}
        style={{position: 'relative'}}
        >
        <Box>
            <Box>
                <Typography variant="h6" gutterBottom>
                    Members
                </Typography>
                <Box style={{width: 'calc(100% - 70px)'}}>
                {/* Display All Active And Ready Members */}
                {memberList.map(({ id, username, isActive, isReady, isLeader }, index) => {
                    if (isReady && isActive) {
                        return (
                            <MemberAvatar 
                                key={`${id}-${index}`}
                                username={username} 
                                isLeader={isLeader} 
                                isActive={isActive} 
                                isReady={isReady}
                                index={index} 
                            />
                        );
                    }
                    return null; // To handle the case where isReady is false
                })}
                {/* Display Active Members */}
                {memberList.map(({ id, username, isActive, isReady, isLeader }, index) => {
                    if (isActive && !isReady) {
                        return (
                            <MemberAvatar 
                                key={`${id}-${index}`}
                                username={username} 
                                isLeader={isLeader} 
                                isActive={isActive} 
                                isReady={isReady}
                                index={index} 
                            />
                        );
                    }
                    return null; // To handle the case where isReady is false
                })}
                {/* Display Joined Members */}
                {memberList.map(({ id, username, isActive, isReady, isLeader }, index) => {
                    if (!isActive && !isReady) {
                        return (
                            <MemberAvatar 
                                key={`${id}-${index}`}
                                username={username} 
                                isLeader={isLeader} 
                                isActive={isActive} 
                                isReady={isReady}
                                index={index} 
                            />
                        );
                    }
                    return null; // To handle the case where isReady is false
                })}
                </Box>
            </Box>
            <div style={{position: "absolute", bottom: '1rem', right: '1rem'}}>
                <Box
                    style={{
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"flex-end",
                        alignItems:"flex-end",
                        paddingBottom:"0.5rem",
                        paddingRight:"0.5rem"
                        }}
                >
                <CardActions 
                    style={{
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"center",
                        alignItems:"flex-end",
                        padding: 0,
                        margin: 0
                        }}
                >
                    {/* Active/Inactive Switch */}
                    {itsMe && <FormControlLabel
                        label={"Active"}
                        labelPlacement="start"
                        sx={{color: '#333'}}
                        control={
                            <Switch
                                checked={itsMe.isActive}
                                onChange={(_, checked) => setMemberActive(itsMe.id, checked)} // Corrected onChange
                                size="small" 
                            />
                        }
                    />}

                    {/* Ready/Not Ready Switch */}
                    {itsMe && itsMe.isActive && <FormControlLabel
                        label={"Ready"}
                        labelPlacement="start"
                        sx={{color: '#333'}}
                        control={
                            <Switch
                                color="primary"
                                checked={itsMe?.isReady}
                                onChange={(_, checked) => setMemberReady(itsMe.id, checked)} // Corrected onChange
                                size="small" 
                            />
                        }
                    />}
                </CardActions>
                </Box>
            </div>
        </Box>
    </Box>);
}
                