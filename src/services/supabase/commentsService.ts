import { supabase } from "./config";
import type { CommentsPost } from "../../types/Comments";

type CommentType = {
    id: number;
    content: string;
    date: string;
    users: {
        username: string;
        image: string | null;
    } | {
        username: string;
        image: string | null;
    }[] | null;
}

export async function addComment(postId: number, userId: number, content: string) {
    const { data, error } = await supabase
        .from("comments")
        .insert([
            {
                post_id: postId,
                user_id: userId,
                content: content,
                date: new Date().toISOString(),
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

    return (data as unknown as CommentType[]).map((comment) => {
        const user = Array.isArray(comment.users) ? comment.users[0] : comment.users;
        return {
            id: comment.id,
            content: comment.content,
            datePublished: new Date(comment.date).toLocaleDateString(), // Format as needed
            username: user?.username || "Unknown",
            userImage: user?.image || "",
        };
    });
}
