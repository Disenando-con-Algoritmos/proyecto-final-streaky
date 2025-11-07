import type { Habit } from "./HabitsTypes";

export type UserProfile = {
    id: number
    username: string
    userDescription: string
    userImage: string
    streak: number
    followers: number
    following: number
    habits: Habit[]
}