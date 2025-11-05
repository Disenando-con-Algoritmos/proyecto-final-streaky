import type { User } from "../../../types/HabitsTypes";

export default function HabFoweFowi({ user }: { user: User }) {
    return (
        <div className="flex justify-center gap-10 mt-8 mb-8 text-center">
            <div>
                <p className="text-[24px] font-semibold">{user.habits.length}</p>
                <p className="text-[#5A5A5A]  text-[20px]">Habits</p>
            </div>
            <div>
                <p className="text-[24px] font-semibold">{user.followers.toLocaleString()}</p>
                <p className="text-[#5A5A5A]  text-[20px]">Followers</p>
            </div>
            <div>
                <p className="text-[24px] font-semibold">{user.following}</p>
                <p className="text-[#5A5A5A]  text-[20px]">Following</p>
            </div>
        </div>
    );
}
