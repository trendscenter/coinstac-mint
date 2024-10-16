import { useEffect, useState, useCallback } from "react";
import { useCentralApi } from "../../apis/centralApi/centralApi";
import { PublicUser, StudyConfiguration } from "../../apis/centralApi/generated/graphql";
import { useParams } from "react-router-dom";
import { useUserState } from "../../contexts/UserStateContext";

const useConsortiumDetails = () => {
    const { getConsortiumDetails, subscriptions: {
        consortiumDetailsChanged
    } } = useCentralApi();
    const consortiumId = useParams<{ consortiumId: string }>().consortiumId as string;
    const [studyConfiguration, setStudyConfiguration] = useState<StudyConfiguration>();
    const [members, setMembers] = useState<PublicUser[]>([]);
    const [activeMembers, setActiveMembers] = useState<PublicUser[]>([]);
    const [readyMembers, setReadyMembers] = useState<PublicUser[]>([]);
    const [leader, setLeader] = useState<PublicUser>({ id: '', username: '' });
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { userId } = useUserState()
    const [isLeader, setIsLeader] = useState(false);

    const fetchConsortiumDetails = useCallback(async () => {
        if (!consortiumId) return;
        setLoading(true);
        setError(null);

        try {
            const result = await getConsortiumDetails({ consortiumId });
            setMembers(result.members);
            setActiveMembers(result.activeMembers);
            setReadyMembers(result.readyMembers);
            setLeader(result.leader);
            setTitle(result.title);
            setDescription(result.description);
            setStudyConfiguration(result.studyConfiguration);

            setIsLeader(result.leader.id === userId);
        } catch (err) {
            setError("Failed to fetch consortium details.");
        } finally {
            setLoading(false);
        }
    }, [consortiumId]);

    useEffect(() => {
        fetchConsortiumDetails();
        const subscription = consortiumDetailsChanged({ consortiumId }).subscribe({
            next: () => {
                fetchConsortiumDetails()
            }
        })
        return () => {
            subscription.unsubscribe()
        }
    }, []);

    return {
        data: {
            studyConfiguration,
            members,
            activeMembers,
            readyMembers,
            leader,
            title,
            description,
        },
        status: {
            loading,
            error,
        },
        refetch: fetchConsortiumDetails, // expose refetch method
        isLeader: isLeader
    };
};

export default useConsortiumDetails;

