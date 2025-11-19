
import type { UserProfile } from "../types/UserProfileType";
import { supabase } from "./supabase/config";

const userService = {
    getUserByEmail: async (email: string) => {
        const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();
        if (error) {
            console.error("No se guardo, perdi");
            return null;
        }

        return data;
    },
    createUser: async (user: Omit<UserProfile,  "id" | "userDescription" |
         "userImage" | "streak" | "followers" | 
        "following" | "habits">) => {
        //en este apartado es donde se guarda la informacion, por ejemplo la letra o el color

        //aqui lo primero que debemos hacer es crear lo que queremos recibir en el supabase
        const { data, error } = await supabase
            .from("users")
            .insert({
                username: user.username,
                email: user.email,
            })
            .select();
        //lo que esta arriba, ese codigo nos la da directamente supabase
        if (error) {
            console.error("no se guardo, perdi");
            return null;
        }

        return data;
    },
    //en esta parte puede que no nos lo de, asique debemos de identificar que es lo que
    //debemos de gurdar, en este caso tenemos estos dos, en el parcial puede haber otra cosa
};

export default userService;
