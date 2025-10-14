import type { CommentsPost } from "./Comments";

export type PostTypes = {
    id: number
    datePublished: string
    postImage: string
    content: string
    username: string
    userImage: string
    likeCount: number
    tag: string
    coments: CommentsPost
}