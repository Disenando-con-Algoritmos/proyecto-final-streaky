import { supabase } from "./supabase/config";
import type { PostTypes } from "../types/PostTypes";

const getPost = async (): Promise<PostTypes[]> => {
  const { data, error } = await supabase
    .from("post")
    .select(`
      id,
      content,
      image,
      date_created,
      user_id,
      users!post_user_id_fkey (
        username,
        image,
        streak
      ),
      categories (
        category
      )
    `)
    .order("date_created", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }

  return data.map((post: any) => ({
    id: post.id,
    datePublished: post.date_created,
    postImage: post.image,
    content: post.content,
    username: post.users?.username || "Unknown",
    userImage: post.users?.image || "",
    likeCount: 0,
    tag: post.categories?.category || "General",
    userDescription: `Streak: ${post.users?.streak || 0}`,
    comments: [],
    userId: post.user_id,
  }));
};

export { getPost };
