import { useContext, useState } from "react";
import { ApolloClientsContext } from "../contexts/ApolloClientsContext";
import { gql } from "@apollo/client";

const ADMIN_CHANGE_USER_PASSWORD = gql`
    mutation AdminChangeUserPassword($username: String!, $password: String!) {
        adminChangeUserPassword(username: $username, password: $password)
    }
`;

export default function AdminChangeUserPassword() {
    const { centralApiApolloClient } = useContext(ApolloClientsContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const validatePassword = () => {
        if (password.length < 8) {
            return "Password must be at least 8 characters long.";
        }
        // Add more validation rules as needed
        return '';
    };

    const changePassword = async () => {
        const validationError = validatePassword();
        if (validationError) {
            setError(validationError);
            return;
        }
        setLoading(true);
        try {
            await centralApiApolloClient?.mutate({
                mutation: ADMIN_CHANGE_USER_PASSWORD,
                variables: {
                    username,
                    password
                }
            });
            setError('');
            setMessage('Password changed successfully.');
        } catch (e) {
            console.error(`Error changing password: ${e}`);
            setError('Failed to change password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Change Password</h1>
            <div>
                <label htmlFor="username">Username:</label>
            </div>
            <div>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">New Password:</label>
            </div>
            <div>
                <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    aria-describedby="passwordHelp"
                />
            </div>
            {error && <div id="passwordHelp" style={{ color: 'red' }}>{error}</div>}
            {message && <div style={{ color: 'green' }}>{message}</div>}
            <button onClick={changePassword} disabled={loading}>
                {loading ? 'Changing...' : 'Change Password'}
            </button>
        </div>
    );
}
