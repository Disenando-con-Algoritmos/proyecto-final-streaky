import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type PostState = {
  description: string;
  image: string;
  category: string;
};

const initialState: PostState = {
  description: "",
  image: "",
  category: "",
};

const SlicePost = createSlice({
  name: "post",
  initialState,
  reducers: {
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setImage: (state, action: PayloadAction<string>) => {
      state.image = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    resetPost: (state) => {
      state.description = "";
      state.image = "";
      state.category = "";
    },
  },
});

export const { setDescription, setImage, setCategory, resetPost } = SlicePost.actions;
export default SlicePost.reducer;
