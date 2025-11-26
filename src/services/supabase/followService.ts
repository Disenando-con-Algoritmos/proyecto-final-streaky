import { supabase } from "./config";

export const followService = {
    async followUser(followerId: number, followingId: number) {
        const { error } = await supabase
            .from("followers")
            .insert({ followers_id: followerId, following_id: followingId });

        if (error) throw error;
    },

    async unfollowUser(followerId: number, followingId: number) {
        const { error } = await supabase
            .from("followers")
            .delete()
            .eq("followers_id", followerId)
            .eq("following_id", followingId);

        if (error) throw error;
    },

    async isFollowing(followerId: number, followingId: number): Promise<boolean> {
        const { data, error } = await supabase
            .from("followers")
            .select("id")
            .eq("followers_id", followerId)
            .eq("following_id", followingId);

        if (error) {
            console.error("Error checking isFollowing:", error);
            return false;
        }

        return !!(data && data.length > 0);
    },

    async getFollowCounts(userId: number): Promise<{ followers: number; following: number }> {
        const { count: followersCount, error: followersError } = await supabase
            .from("followers")
            .select("*", { count: "exact", head: true })
            .eq("following_id", userId);

        if (followersError) console.error("Error fetching followers count:", followersError);

        const { count: followingCount, error: followingError } = await supabase
            .from("followers")
            .select("*", { count: "exact", head: true })
            .eq("followers_id", userId);

        if (followingError) console.error("Error fetching following count:", followingError);

        return {
            followers: followersCount || 0,
            following: followingCount || 0,
        };
    },
};
