import { supabase } from "./config";

export const likesService = {
    async getLikesCount(postId: number): Promise<number> {
        const { count, error } = await supabase
            .from("likes")
            .select("*", { count: "exact", head: true })
            .eq("post_id", postId);

        if (error) {
            console.error("Error fetching likes count:", error);
            return 0;
        }

        return count || 0;
    },

    async hasUserLiked(postId: number, userId: number): Promise<boolean> {
        const { data, error } = await supabase
            .from("likes")
            .select("id")
            .eq("post_id", postId)
            .eq("user_id", userId);

        if (error) {
            console.error("Error checking if user liked:", error);
            return false;
        }

        return !!(data && data.length > 0);
    },

    async toggleLike(postId: number, userId: number): Promise<{ liked: boolean; count: number }> {
       
        const liked = await this.hasUserLiked(postId, userId);

        if (liked) {
            
            const { error } = await supabase
                .from("likes")
                .delete()
                .eq("post_id", postId)
                .eq("user_id", userId);

            if (error) throw error;
        } else {
            
            const { error } = await supabase
                .from("likes")
                .insert({ post_id: postId, user_id: userId });

            if (error) throw error;
        }

        
        const count = await this.getLikesCount(postId);
        return { liked: !liked, count };
    },

    async deleteLikesByPostId(postId: number): Promise<void> {
        const { error } = await supabase
            .from("likes")
            .delete()
            .eq("post_id", postId);

        if (error) {
            console.error("Error deleting likes:", error);
            throw error;
        }
    }
};
