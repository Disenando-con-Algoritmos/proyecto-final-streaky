import { createBrowserRouter } from "react-router";

import Landing from "../pages/Landing";
import SearchPage from "../pages/SearchPage";
import SignUp from "../pages/SignUp";
import MyProfile from "../pages/MyProfile";
import Welcome from "../pages/Welcome";
import SelectCategory from "../pages/SelectCategory";
import AddNewHabit from "../pages/addnewhabit";
import Habits from "../pages/habits";
import ProfileSearch from "../pages/ProfileSearch";
import HabitAdded from "../pages/HabitSucces";
import EditProfile from "../pages/EditProfile";
import LogIn from "../pages/Login";
import Feed from "../pages/Feed";
import CreatePost from "../pages/createpost";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/signUp",
    Component: SignUp,
  },
  {
    path: "/welcome",
    Component: Welcome,
  },
  {
    path: "/login",
    Component: LogIn,
  },
  {
    path: "/feed",
    Component: Feed,
  },
  {
    path: "/select",
    Component: SelectCategory,
  },
  {
    path: "/userSearch",
    Component: SearchPage,
  },
  {
    path: "/newhabit",
    Component: AddNewHabit,
  },
  {
    path: "/profile",
    Component: MyProfile,
  },
  {
    path: "/profile/:username",
    Component: ProfileSearch,
  },
  {
    path: "/habits",
    Component: Habits,
  },
  {
    path: "/edit-profile",
    Component: EditProfile,
  },
  {
    path: "/createpost",
    Component: CreatePost,
  },
  {
    path: "/habitAdded",
    Component: HabitAdded,
  },
]);

export default router;
