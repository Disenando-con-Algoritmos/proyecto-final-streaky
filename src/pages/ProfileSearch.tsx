import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getHabits } from "../services/HabitsServices";
import { getPost } from "../services/PostService";
import BtnFollow from "../components/mobile/profilesearch/BtnFollow";
import HabFoweFowi from "../components/mobile/profilesearch/HabFoweFowi";
import Habit from "../components/mobile/profilesearch/Habit";
import type { User, Habit as HabitType } from "../types/HabitsTypes";
import type { PostTypes } from "../types/PostTypes";
import CardPost from "../components/mobile/feed/CardPost";

export default function ProfileSearch() {
    const { username } = useParams<{ username: string }>();
    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [lastPost, setLastPost] = useState<PostTypes | null>(null);

    useEffect(() => {
        const loadUsers = async () => {
            const data = await getHabits();
            setUsers(data);
        };
        loadUsers();
    }, []);

    useEffect(() => {
        if (users.length > 0 && username) {
            const foundUser = users.find(
                (u: User) => u.username.toLowerCase() === username.toLowerCase()
            );
            setUser(foundUser || null);
        }
    }, [users, username]);

    useEffect(() => {
        const loadPosts = async () => {
            const allPosts = await getPost();
            const userPosts = allPosts.filter(
                (p: PostTypes) => p.username.toLowerCase() === username?.toLowerCase()
            );
            if (userPosts.length > 0) {
                setLastPost(userPosts[0]);
            } else {
                setLastPost(null);
            }
        };
        loadPosts();
    }, [username]);

    if (!user) {
        return (
            <div className="min-h-screen bg-[#121212] text-white flex justify-center items-center">
                <p>User not found :(</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#171717] text-[#F9FAFB] 
        flex flex-col items-center py-10 font-sans">
            <img
                src="https://i.imgur.com/7IzEEQ5.png"
                alt="Streaky logo"
                className="w-24 mr-70 md:w-28 md:hidden "
            />

            {/*profile*/}
            <div className="flex items-center gap-7 mb-8 mt-8">
                <img
                    src={user.userImage}
                    alt={user.username}
                    className="w-32 h-32 rounded-full object-cover"
                />
                <div className="flex flex-col mt-5 gap-3 mb-8">
                    <h2 className="text-[35px] font-bold">{user.username}</h2>
                    <p className="text-[#B3B3B3] text-[16px]">{user.userDescription}</p>
                </div>
            </div>

            {/* follow boton */}
            <div className="mb-4">
                <BtnFollow />
            </div>

            {/* follow following habit */}
            <HabFoweFowi user={user} />

            {/* streak */}
            <div className="mt-8 px-6 py-4 
            rounded-2xl flex flex-col items-center text-center 
            w-11/12 max-w-sm border border-[#2A2A2A]">
                <p className="text-5xl mb-2">🔥</p>
                <p className="text-white font-medium text-lg">
                    {user.streak} days of streak
                </p>
                <p className="text-sm text-gray-400 mt-1">Keep the fire alive 💪</p>
            </div>

            {/* habits */}
            <h3 className="text-[25px] font-semibold mt-10 mb-4 w-11/12 max-w-sm">
                Habits
            </h3>
            <div className="w-11/12 max-w-sm flex flex-col gap-5 mb-6">
                {user.habits.map((habit: HabitType) => (
                    <Habit key={habit.id} habit={habit} />
                ))}
            </div>

            {/* last post */}
            {lastPost && (
                <>
                    <h3 className="text-[25px] font-semibold mt-10 mb-2 w-11/12 max-w-sm">
                        My last post
                    </h3>
                    <div className="w-[430px] rounded-2xl">
                        <CardPost cardIndividuals={lastPost} />
                    </div>
                </>
            )}
        </div>
    );
}
