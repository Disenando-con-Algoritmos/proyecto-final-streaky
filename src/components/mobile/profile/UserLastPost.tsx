import { useEffect, useState } from "react";
import { getPost } from "../../../services/PostService";
import type { PostTypes } from "../../../types/PostTypes";
import CardPost from "../feed/CardPost";


interface LastUserPostProps {
    userId: number;
}

export default function UserLastPost({ userId }: LastUserPostProps) {
    const [lastPost, setLastPost] = useState<PostTypes | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data: PostTypes[] = await getPost();

            // filtrar solo los posts de este usuario
            const userPosts = data.filter(
                (post: PostTypes) => post.id === userId
            );

            // ordenar los posts por fecha de publicación (más reciente primero)
            const sortedPosts = userPosts.sort(
                (a: PostTypes, b: PostTypes) =>
                    new Date(b.datePublished).getTime() -
                    new Date(a.datePublished).getTime()
            );

            // guardar el último post si existe
            if (sortedPosts.length > 0) {
                setLastPost(sortedPosts[0]);
            }
        };

        fetchData();
    }, [userId]);

    if (!lastPost) {
        return (
            <p className="text-gray-400 text-center mt-10">
                No posts published yet.
            </p>
        );
    }

    return (
            <div className="w-full">
                <CardPost cardIndividuals={lastPost} />
            </div>

    );
}
