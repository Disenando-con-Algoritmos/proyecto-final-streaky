import { supabase } from "./config";
import type { UserProfile } from "../../types/UserProfileType";

export async function getCurrentUser(): Promise<UserProfile | null> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) return null;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", user.email)
    .single();

  if (error) {
    console.error("Error fetching user:", error);
    return null;
  }

  const userProfile: UserProfile = {
    id: data.id,
    username: data.username,
    userDescription: data.description || "No description yet.",
    email: data.email,
    userImage: data.image,
    streak: data.streak ?? 0,
    followers: 0,
    following: 0,
    habits: []
  };

  return userProfile;
}

type UserService = {
  username?: string;
  description?: string;
  image?: string;
};


type UserSupabase = {
  id: number;
  username: string | null;
  email: string;
  image: string;
  streak: number | null;
  description: string | null;
};

export async function updateUserProfile(
  updates: Partial<UserProfile> & { password?: string; imageFile?: File }
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("No user logged in");

  if (updates.username) {
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("username", updates.username)
      .neq("email", user.email)
      .single();

    if (existingUser) {
      throw new Error("USERNAME_EXISTS");
    }
  }

  if (updates.password && updates.password.trim() !== "") {
    const { error: passwordError } = await supabase.auth.updateUser({
      password: updates.password,
    });
    if (passwordError) throw passwordError;
  }

  let publicUrl = updates.userImage;

  if (updates.imageFile) {
    const fileExt = updates.imageFile.name.split(".").pop();
    const fileName = `${Date.now()}_profile.${fileExt}`;
    const filePath = `profile_images/${user.id}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("streaky_bucket")
      .upload(filePath, updates.imageFile);

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage
      .from("streaky_bucket")
      .getPublicUrl(filePath);

    publicUrl = urlData.publicUrl;
  }

  const dbUpdates: UserService = {};
  if (updates.username) dbUpdates.username = updates.username;
  if (updates.userDescription) dbUpdates.description = updates.userDescription;
  if (publicUrl) dbUpdates.image = publicUrl;

  const { data, error } = await supabase
    .from("users")
    .update(dbUpdates)
    .eq("email", user.email);

  if (error) throw error;
  return data;
}

export async function getAllUsers(): Promise<UserProfile[]> {
  const { data, error } = await supabase
    .from("users")
    .select("id, username, email, image, streak, description");

  if (error) {
    console.error("Error fetching users:", error);
    return [];
  }

  return data.map((user: UserSupabase): UserProfile => ({
    id: user.id,
    username: user.username ?? "",
    userDescription: user.description ?? "No description yet.",
    email: user.email,
    userImage: user.image,
    streak: user.streak ?? 0,
    followers: 0,
    following: 0,
    habits: []
  }));
}
