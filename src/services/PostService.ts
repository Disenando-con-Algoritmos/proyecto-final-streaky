import { supabase } from "./supabase/config";
import type { PostTypes } from "../types/PostTypes";

type PostData = {
  id: number;
  content: string;
  image: string | null;
  date_created: string;
  user_id: number;
  users:
    | {
        username: string;
        image: string | null;
        streak: number | null;
      }
    | {
        username: string;
        image: string | null;
        streak: number | null;
      }[]
    | null;
  categories:
    | {
        category: string;
      }
    | {
        category: string;
      }[]
    | null;
};

const getPost = async (): Promise<PostTypes[]> => {
  const { data, error } = await supabase
    .from("post")
    .select(
      `
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
    `
    )
    .order("date_created", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }

  return (data as unknown as PostData[]).map((post) => {
    const user = Array.isArray(post.users) ? post.users[0] : post.users;
    const category = Array.isArray(post.categories)
      ? post.categories[0]
      : post.categories;

    return {
      id: post.id,
      datePublished: post.date_created,
      postImage: post.image || "",
      content: post.content,
      username: user?.username || "Unknown",
      userImage: user?.image || "",
      likeCount: 0,
      tag: category?.category || "General",
      userDescription: `Streak: ${user?.streak || 0}`,
      comments: [],
      userId: post.user_id,
    };
  });
};

export { getPost };
