import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getHabits } from "../services/HabitsServices";
import { getPost } from "../services/PostService";
import BtnFollow from "../components/mobile/profilesearch/BtnFollow";
import HabFoweFowi from "../components/mobile/profilesearch/HabFoweFowi";
import Habit from "../components/mobile/profilesearch/Habit";
import type { User, Habit as HabitType } from "../types/HabitsTypes";
import type { PostTypes } from "../types/PostTypes";
import CardPost from "../components/mobile/feed/CardPost";
import PcSearchBar from "../components/desktop/PcSearchBar";
import MobileNavbar from "../components/mobile/nav-bar/MobileNavBar";

export default function ProfileSearch() {
    const nav = useNavigate();
    const NavigateProfile = () => nav("/profile");
    const { username } = useParams<{ username: string }>();
    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [lastPost, setLastPost] = useState<PostTypes | null>(null);
    const [loading, setLoading] = useState(true);

    // cargar usuarios
    useEffect(() => {
        const loadUsers = async () => {
            const data = await getHabits();
            setUsers(data);
            setLoading(false);
        };
        loadUsers();
    }, []);

    // busca el primer usuario que el username coincida con el valor de la url
    useEffect(() => {
        if (users.length > 0 && username) {
            const foundUser = users.find(
                (u: User) => u.username.toLowerCase() === username.toLowerCase()
            );
            setUser(foundUser || null);
        }
    }, [users, username]);

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
                className="min-h-screen bg-[#171717] text-[#F9FAFB] 
            flex flex-col items-center py-17
            lg:grid lg:grid-cols-[200px_1fr_390px] l
            lg:px-13 lg:py-18"
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
                            <img
                                src={user.userImage}
                                alt={user.username}
                                className="w-32 h-32 rounded-full object-cover"
                            />
                            <div className="flex flex-col mt-5 gap-3 mb-8">
                                <h2 className="text-[35px] font-bold">{user.username}</h2>
                                <p className="text-[#B3B3B3] text-[16px] lg:w-50">
                                    {user.userDescription}
                                </p>
                            </div>
                        </div>

                        <div className="mt-3 lg:mt-10 mr-1">
                            <BtnFollow />
                        </div>

                        <div className="w-full flex justify-center mb-8 mt-8 
                    lg:justify-start lg:ml-35 lg:mb-20 lg:mt-0 ">
                            <HabFoweFowi user={user} />
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
                        {user.habits.map((habit: HabitType) => (
                            <Habit key={habit.id} habit={habit} />
                        ))}
                    </div>

                    {/* last post */}
                    {lastPost && (
                        <>
                            <div className="flex justify-between items-center 
                        w-11/12 max-w-sm mt-10 mb-2 lg:w-full relative">
                                <h3 className="text-[25px] lg:text-[30px] 
                                font-semibold lg:ml-45 lg:mb-10">
                                    My last post</h3>
                                <img
                                    src="/src/assets/cat-last-post.png"
                                    alt="cat last post"
                                    className="w-30 -mb-11 mr-7 z-20 lg:absolute 
                                lg:w-35 lg:right-[-210px] lg:top-3.5"
                                />
                            </div>

                            <div className="w-[430px] lg:w-[810px] rounded-2xl lg:m-0">
                                <CardPost cardIndividuals={lastPost} />
                            </div>
                        </>
                    )}
                </div>

                {/*columna derecha de habitos streak y jenntty */}
                <div className="hidden lg:flex flex-col fixed 
                right-[60px] top-[40px] w-[380px] gap-6 z-40">
                    {/* perfil Jenny */}
                    <div
                        onClick={NavigateProfile}
                        className="flex items-center gap-3 cursor-pointer ml-12"
                    >
                        <img
                    src="https://i.pinimg.com/736x/34/df/3c/34df3c26865e26dbda372ed6ec45e9b7.jpg"
                    alt="Profile"
                            className="w-17 h-17 rounded-full"
                        />
                        <div className="flex flex-col">
                            <p className="font-semibold text-[#F9FAFB] text-[19px]">
                                Jenny Torres
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

                    {/* habits */}
                    <div className="flex flex-col gap-7 max-h-[70vh] overflow-y-auto pr-1 mt-18">
                        {user.habits.map((habit: HabitType) => (
                            <Habit key={habit.id} habit={habit} />
                        ))}
                    </div>
                </div>

            </div>
        </>
    );
}
