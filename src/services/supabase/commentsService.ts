import { supabase } from "./config";
import type { CommentsPost } from "../../types/Comments";

export async function addComment(postId: number, userId: number, content: string) {
    const { data, error } = await supabase
        .from("comments")
        .insert([
            {
                post_id: postId,
                user_id: userId,
                content: content,
                date: new Date().toISOString(), // Assuming the DB takes a timestamp string or we let it default if configured
            },
        ])
        .select();

    if (error) {
        console.error("Error adding comment:", error);
        throw error;
    }
    return data;
}

export async function getCommentsByPostId(postId: number): Promise<CommentsPost[]> {
    const { data, error } = await supabase
        .from("comments")
        .select(`
      id,
      content,
      date,
      users (
        username,
        image
      )
    `)
        .eq("post_id", postId)
        .order("date", { ascending: true });

    if (error) {
        console.error("Error fetching comments:", error);
        return [];
    }

    // Map the result to match CommentsPost type
    return data.map((comment: any) => ({
        id: comment.id,
        content: comment.content,
        datePublished: new Date(comment.date).toLocaleDateString(), // Format as needed
        username: comment.users?.username || "Unknown",
        userImage: comment.users?.image || "",
    }));
}
