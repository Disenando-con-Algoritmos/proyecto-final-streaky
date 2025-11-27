import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { getHabits, getUserHabits } from "../services/HabitsServices";
import { getPost } from "../services/PostService";
import BtnFollow from "../components/mobile/profilesearch/BtnFollow";
import HabFoweFowi from "../components/mobile/profilesearch/HabFoweFowi";
import Habit from "../components/mobile/profilesearch/Habit";
import type { User, Habit as HabitType } from "../types/HabitsTypes";
import type { PostTypes } from "../types/PostTypes";
import CardPost from "../components/mobile/feed/CardPost";
import PcSearchBar from "../components/desktop/PcSearchBar";
import MobileNavbar from "../components/mobile/nav-bar/MobileNavBar";
import { getCurrentUser, getAllUsers } from "../services/supabase/userService";
import type { UserProfile } from "../types/UserProfileType";
import UserAvatar from "../components/UserAvatar/UserAvatar";
import { followService } from "../services/supabase/followService";
import { supabase } from "../services/supabase/config";
import CatLastPost from "../assets/cat-last-post.png";

export default function ProfileSearch() {
    const nav = useNavigate();
    const NavigateProfile = () => nav("/welcome/profile");
    const { username } = useParams<{ username: string }>();
    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [lastPost, setLastPost] = useState<PostTypes | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);

    // cargar usuarios
    useEffect(() => {
        const loadUsers = async () => {
            const staticUsers = await getHabits();
            const dynamicUsers = await getAllUsers();
            const mergedUsers = [...staticUsers];

            dynamicUsers.forEach((dUser) => {
                if (!mergedUsers.find(sUser =>
                    sUser.username.toLowerCase() === dUser.username.toLowerCase())) {
                    mergedUsers.push(dUser as unknown as User);
                }
            });

            setUsers(mergedUsers);
            setLoading(false);
        };
        loadUsers();
    }, []);

    // cargar usuario logueado
    useEffect(() => {
        async function fetchCurrentUser() {
            const userData = await getCurrentUser();
            if (userData) {
                setCurrentUser(userData);
            }
        }
        fetchCurrentUser();
    }, []);

    // busca el primer usuario que el username coincida con el valor de la url
    useEffect(() => {
        let isMounted = true;

        const fetchUserData = () => {
            if (users.length > 0 && username) {
                const foundUser = users.find(
                    (u: User) => u.username.toLowerCase() === username.toLowerCase()
                );

                if (foundUser) {
                    getUserHabits(Number(foundUser.id)).then((habits: HabitType[]) => {
                        if (isMounted) setUser({ ...foundUser, habits });
                    });
                } else {
                    if (isMounted) setUser(null);
                }
            }
        };

        fetchUserData();

        return () => {
            isMounted = false;
        };
    }, [users, username]);

    const userHabitsRef = useRef<HabitType[]>([]);
    useEffect(() => {
        if (user?.habits) {
            userHabitsRef.current = user.habits;
        }
    }, [user?.habits]);

    //realtime perfil
    useEffect(() => {
        if (!user) return;

        let isMounted = true;

        const refreshHabits = () => {
            getUserHabits(Number(user.id)).then((habits: HabitType[]) => {
                if (isMounted) setUser(prev => prev ? { ...prev, habits } : null);
            });
        };

        const channel = supabase
            .channel(`profile_search_realtime:${user.id}`)
            .on(
                'postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'users', filter: `id=eq.${user.id}` },
                (payload) => {
                    if (isMounted) {
                        const newUser = payload.new as User;
                        setUser(prev => prev ? { ...prev, streak: newUser.streak } : null);
                    }
                }
            )
            .on(
                'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'habits', filter: `user_id=eq.${user.id}` },
                () => refreshHabits()
            )
            .on(
                'postgres_changes',
            { event: 'UPDATE', schema: 'public', table: 'habits', filter: `user_id=eq.${user.id}` },
                () => refreshHabits()
            )
            .on(
                'postgres_changes',
                { event: 'DELETE', schema: 'public', table: 'habits' },
                (payload) => {
    
                    const deletedId = payload.old.id;
                    if (userHabitsRef.current.some(h => h.id === deletedId)) {
                        refreshHabits();
                    }
                }
            )
            .subscribe();

        return () => {
            isMounted = false;
            supabase.removeChannel(channel);
        };
    }, [user?.id, user]);

    useEffect(() => {
        if (user) {
            followService.getFollowCounts(Number(user.id)).then((counts) => {
                setFollowersCount(counts.followers);
                setFollowingCount(counts.following);
            });
        }
    }, [user?.id, user]);

    const handleFollowChange = (isFollowing: boolean) => {
        setFollowersCount(prev => isFollowing ? prev + 1 : prev - 1);
    };

    // cargar posts
    useEffect(() => {
        //de todos los post que existen me quedo con los que 
        //el nombre de usuario del post se a igual al 
        //nombre del usuario que está en la URL
        const loadPosts = async () => {
            const allPosts = await getPost(); //trae todos los posts
            const userPosts = allPosts.filter(
                (p: PostTypes) => p.username.toLowerCase() === username?.toLowerCase()
            );
            setLastPost(userPosts.length > 0 ? userPosts[0] : null);
            //guardar el ultimos post o si no tiene ninguno es null
        };
        loadPosts();
    }, [username]);

    //spiner
    if (loading) {
        return (
            <div className="min-h-screen bg-[#171717] flex justify-center items-center">
                <div className="w-12 h-12 border-4 border-[#B1F042] 
                border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // si no hay usuario
    if (!user) {
        return (
            <div className="min-h-screen bg-[#171717] text-white flex justify-center items-center">
                <p>No users found.</p>
            </div>
        );
    }

    return (
        <>
            <PcSearchBar></PcSearchBar>
            <MobileNavbar />

            <div
                className="
                min-h-screen bg-[#171717] text-[#F9FAFB]
                flex flex-col items-center py-17
                lg:grid lg:grid-cols-[300px_1fr_390px] 
                lg:px-13 lg:py-18
                lg:items-start
                lg:min-h-[calc(100vh-80px)]"
            >
                {/* espacio blanco  */}
                <div className="hidden lg:block"></div>

                {/* perfil y post */}
                <div className="flex flex-col items-center lg:items-start w-full">

                    <img
                        src="https://i.imgur.com/7IzEEQ5.png"
                        alt="Streaky logo"
                        className="w-24 mr-70 md:w-28 lg:hidden"
                    />

                    {/* perfil */}
                    <div className="flex flex-col items-center lg:items-start lg:flex-row 
                lg:flex-wrap lg:w-full mt-8 gap-y-4 lg:gap-y-0 lg:ml-40">
                        <div className="flex items-center gap-5 lg:w-auto">
                            <UserAvatar
                                userImage={user.userImage}
                                username={user.username}
                                size="w-32 h-32"
                                textSize="text-4xl"
                            />
                            <div className="flex flex-col mt-5 gap-3 mb-8">
                                <h2 className="text-[35px] font-bold">{user.username}</h2>
                                <p className="text-[#B3B3B3] text-[16px] lg:w-50">
                                    {user.userDescription}
                                </p>
                            </div>
                        </div>

                        <div className="mt-3 lg:mt-10 mr-1">
                            {user && (
                                <BtnFollow
                                    targetUserId={Number(user.id)}
                                    currentUserId={currentUser?.id || null}
                                    onFollowChange={handleFollowChange}
                                />
                            )}
                        </div>

                        <div className="w-full flex justify-center mb-8 mt-8 
                    lg:justify-start lg:ml-35 lg:mb-20 lg:mt-0 ">
                            <HabFoweFowi
                                user={user}
                                followersCount={followersCount}
                                followingCount={followingCount}
                            />
                        </div>
                    </div>

                    {/* streak */}
                    <div
                        className="mt-5 px-6 py-4 mb-5 rounded-2xl flex items-center gap-2 
                    w-11/12 max-w-sm border border-[#2A2A2A] lg:hidden "
                    >
                        <span className="text-[60px]">🔥</span>
                        <div className="flex flex-col items-start">
                            <p className="text-[#F9FAFB] font-semibold text-[23px]">
                                {user.streak} days of streak
                            </p>
                            <p className="text-[16px] font-regular
                        text-[#F9FAFB]">        Keep the fire alive 💪</p>
                        </div>
                    </div>

                    {/* habits */}
                    <h3 className="text-[25px] font-semibold mt-10 mb-2 w-11/12 max-w-sm md:hidden">
                        Habits
                    </h3>
                    <div className="w-11/12 max-w-sm h-[1px] bg-[#2A2A2A] mb-6 mt-2
                    md:hidden"></div>

                    <div className="w-11/12 max-w-sm flex flex-col gap-5 mb-6 lg:hidden">
                        {user.habits.length > 0 ? (
                            user.habits.map((habit: HabitType) => (
                                <Habit key={habit.id} habit={habit} />
                            ))
                        ) : (
                            <p className="text-gray-400 text-center">No habits yet.</p>
                        )}
                    </div>

                    {/* last post */}
                    {lastPost ? (
                        <>
                            <div className="flex justify-between items-center 
                        w-11/12 max-w-sm mt-10 mb-2 lg:w-full relative">
                                <h3 className="text-[25px] lg:text-[30px] 
                                font-semibold lg:ml-45 lg:mb-10">
                                    My last post</h3>
                                <img
                                    src={CatLastPost}
                                    alt="cat last post"
                                    className="w-30 -mb-11 mr-7 z-20 lg:absolute 
                                lg:w-35 lg:right-[-210px] lg:top-3.5"
                                />
                            </div>

                            <div className="w-[430px] lg:w-[818px] rounded-2xl lg:m-0">
                                <CardPost cardIndividuals={lastPost} />
                            </div>
                        </>
                    ) : (
                        <div className="w-11/12 max-w-sm mt-10 mb-10
                        text-center lg:w-full lg:ml-45">
                            <p className="text-gray-400 text-xl">No posts yet.</p>
                        </div>
                    )}
                </div>

                {/*columna derecha de habitos streak y jenntty */}
                <div className="hidden lg:flex flex-col 
                right-[60px] top-[40px] w-[380px] gap-6 z-40">
                    {/* perfil Jenny */}
                    <div
                        onClick={NavigateProfile}
                        className="flex items-center gap-3 cursor-pointer ml-12"
                    >
                        {currentUser && (
                            <UserAvatar
                                userImage={currentUser.userImage}
                                username={currentUser.username}
                                size="w-17 h-17"
                                textSize="text-2xl"
                            />
                        )}
                        <div className="flex flex-col">
                            <p className="font-semibold text-[#F9FAFB] text-[19px]">
                                {currentUser ? currentUser.username : "Loading..."}
                            </p>
                            <p className="text-[#A1A1AA] text-sm text-[14px]">Your Profile</p>
                        </div>
                    </div>

                    {/* streak */}
                    <div className="px-6 py-4 rounded-2xl w-full flex items-center mb-10 mt-10 
                    gap-2 border
                    border-[#2A2A2A]">
                        <span className="text-[55px]">🔥</span>
                        <div className="flex flex-col items-start">
                            <p className="text-[#F9FAFB] font-semibold text-[21px]">
                                {user.streak} days of streak
                            </p>
                            <p className="text-[14px] font-regular text-[#F9FAFB]">
                                Keep the fire alive 💪
                            </p>
                        </div>
                    </div>

                    {/* Desktop Habits List */}
                    <div className="w-full flex flex-col gap-5 mb-6">
                        <h3 className="text-[25px] font-semibold mb-2">Habits</h3>
                        <div className="w-full h-[1px] bg-[#2A2A2A] mb-4"></div>

                        {user.habits.length > 0 ? (
                            user.habits.map((habit: HabitType) => (
                                <Habit key={habit.id} habit={habit} />
                            ))
                        ) : (
                            <p className="text-gray-400 text-center">No habits yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
