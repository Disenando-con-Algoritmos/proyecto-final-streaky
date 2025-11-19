import type { UserProfile } from "../types/UserProfileType";
import { supabase } from "./supabase/config";
import userService from "./UserServices";

const authService = {
    signUp: async (email: string, password: string, additionalInfo: Omit<UserProfile, 
        "id" | "userDescription" | "userImage" | "streak" | "followers" | 
        "following" | "habits">) => {
        const { data, error } = await supabase.auth.signUp({
            //todo viene desde la api de supabase, aqui es donde por ejemplo
            email, //tenemos que solo enviamos el email y la password
            password,
            options: {
        data: {
            username: additionalInfo.username,
            display_name: additionalInfo.username,  // esto es el nombre que ves en Supabase
        }
    }
        });

        if (error) {
            console.error("Error signing up:", error);
            return {
                success: false,
                error: error.message,
                user: null,
            };
        }

        const resultCreate = await userService.createUser(additionalInfo);

        return {
            success: true,
            data,
            user: resultCreate,
        };
    },
    signOut: async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Error signing out:", error);
            return {
                success: false,
                error: error.message,
            };
        }

        return {
            success: true,
        };
    },
    signIn: async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error("Error signing in:", error);
            return {
                success: false,
                error: error.message,
                user: null,
            };
        }

        return {
            success: true,
            data,
        };
    },
};

export default authService;
