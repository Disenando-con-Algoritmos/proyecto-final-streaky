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
    streak: 0,
    followers: 0,
    following: 0,
    habits: []
  };

  return userProfile;
}

type UserService = {
  username?: string;
  description?: string;
  image?: string | null;
};

export async function updateUserProfile(updates: Partial<UserProfile>) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("No user logged in");

  const dbUpdates: UserService = {};
  if (updates.username) dbUpdates.username = updates.username;
  if (updates.userDescription) dbUpdates.description = updates.userDescription;
  if (updates.userImage) dbUpdates.image = updates.userImage;

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

  console.log("Fetched users data:", data); // Debugging log

  return data.map((user: any) => ({
    id: user.id,
    username: user.username,
    userDescription: user.description || "No description yet.",
    email: user.email,
    userImage: user.image,
    streak: user.streak || 0,
    followers: user.followers || 0,
    following: user.following || 0,
    habits: []
  }));
}
