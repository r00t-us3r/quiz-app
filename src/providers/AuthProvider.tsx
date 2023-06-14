import { superBase } from '../services/superBase';
import { Session } from '@supabase/supabase-js';
import {createContext, useContext, useEffect, useState} from "react";
type ContextProps = {
    user: null | boolean;
    session: Session | null;
};

const AuthContext = createContext<Partial<ContextProps>>({});

interface Props {
    children: React.ReactNode;
}

const AuthProvider = (props: Props) => {
    // user null = loading
    const [user, setUser] = useState<null | boolean>(null);
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        superBase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setUser(session ? true : false);
        })
        const { data: authListener } = superBase.auth.onAuthStateChange(
            async (event, session) => {
                console.log(`Supabase auth event: ${event}`);
                setSession(session);
                setUser(session ? true : false);
            }
        );
        return () => {
            authListener!.subscription.unsubscribe();
        };
    }, [user]);

    return (
        <AuthContext.Provider
            value={{
                user,
                session,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

const useAuthContext = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuthContext };