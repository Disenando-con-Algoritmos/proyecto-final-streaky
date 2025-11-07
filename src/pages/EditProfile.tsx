import PcSearchBar from "../components/desktop/PcSearchBar";
import InputProfile from "../components/mobile/edit-profile/InputProfile";
import MobileNavbar from "../components/mobile/nav-bar/MobileNavBar";
import { MdOutlineModeEdit } from "react-icons/md";
import GlobalBtn from "../components/mobile/welcome/GlobalBtn";
import { useRef, useState } from "react";
import type { UserProfile } from "../types/UserProfileType";
import grayShape from "../assets/grayShape.png";
import miffyEdit from "../assets/miffyEdit.png";

export default function EditProfile() {
    const userData: Partial<UserProfile> = {
        id: 5,
        username: "Jenny",
        userImage: "https://i.pinimg.com/736x/34/df/3c/34df3c26865e26dbda372ed6ec45e9b7.jpg",
    };
    const [profileImg, setProfileImg] = useState<string>(userData.userImage ?? "");
    const [username, setUsername] = useState("");
    const [biography, setBiography] = useState("");
    const [password, setPassword] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);

    // manejar subida de imagen
    const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        // Solo PNG o JPG
        if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
            alert("Formato inválido. Solo PNG o JPG!");
            return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => setProfileImg(ev.target?.result as string);
        reader.readAsDataURL(file);
    };

    // ejecutar upload al clickear el icono
    const updateImgInput = () => fileInputRef.current?.click();

    // guardar cambios
    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({
            username,
            biography,
            password,
            profileImg,
        });
        alert("Datos guardados (revisa la consola :3)");
    };

    return (
        <>
            <PcSearchBar />
            <MobileNavbar />
            <div className="relative min-h-screen flex flex-col items-center 
            justify-center px-6 lg:ml-[260px] lg:flex lg:justify-center">
                <form className="w-full max-w-md flex flex-col items-center" onSubmit={handleSave}>
                    {/* Imagen de perfil */}
                    <div className="relative w-24 h-24 mb-6 rounded-full">
                        <img
                            src={profileImg}
                            className="rounded-full object-cover w-24 h-24 border-2 border-[#333]"
                        />
                        <button
                            type="button"
                            onClick={updateImgInput}
                            className="absolute bottom-0 right-0 cursor-pointer
                            bg-[#353535] rounded-full p-2 hover:bg-[#444]"
                            title="Editar imagen"
                        >
                            <MdOutlineModeEdit className="text-white text-xl" />
                        </button>
                        <input
                            type="file"
                            accept=".png,.jpg,.jpeg"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleImgChange}
                        />
                    </div>
                    <InputProfile
                        label="Username"
                        type="text"
                        placeholder="New Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    >
                        <MdOutlineModeEdit />
                    </InputProfile>
                    <InputProfile
                        label="Biography"
                        type="text"
                        placeholder="New Biography"
                        value={biography}
                        onChange={(e) => setBiography(e.target.value)}
                        required
                    >
                        <MdOutlineModeEdit />
                    </InputProfile>
                    <InputProfile
                        label="Password"
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <GlobalBtn
                        text="Save Changes"
                        type="submit"
                    />
                </form>

                {/* figura gris */}
                <img
                    src={grayShape}
                    className="hidden lg:block absolute -top-20 -left-10 w-100" 
                    style={{ zIndex: 0 }}
                />

                {/* miffy :3 */}
                <img
                    src={miffyEdit}
                    className="hidden lg:block absolute bottom-0 right-5 w-80 max-w-xs"
                    style={{ zIndex: 10 }}
                />

            </div>
        </>
    );
}
