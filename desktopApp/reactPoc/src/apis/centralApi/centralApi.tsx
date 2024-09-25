import { useApolloClients } from "../../contexts/ApolloClientsContext";
import { login } from "./login";
import { getConsortiumList } from "./getConsortiumList";
import { MutationLoginArgs, QueryGetConsortiumDetailsArgs } from "./generated/graphql"; // Import generated types
import { getConsortiumDetails } from "./getConsortiumDetails";

export const useCentralApi = () => {
    const { centralApiApolloClient } = useApolloClients();

    // Handle Apollo Client being undefined
    if (!centralApiApolloClient) {
        throw new Error("Apollo Client is not defined");
    }

    return {
        login: (input: MutationLoginArgs) => login(centralApiApolloClient, input),
        getConsortiumList: () => getConsortiumList(centralApiApolloClient)
        getConsortiumDetails: (input: QueryGetConsortiumDetailsArgs) => getConsortiumDetails(centralApiApolloClient, input)
    };
};