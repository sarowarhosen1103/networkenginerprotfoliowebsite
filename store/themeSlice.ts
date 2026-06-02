import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  accentColor: string;
  mode: "dark" | "light";
}

// Initial state, checking window/localStorage if available on client, default to dark
const initialState: ThemeState = {
  accentColor: "#00f2ff", // Default cyan
  mode: "dark",          // Default dark mode
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setAccentColor: (state, action: PayloadAction<string>) => {
      state.accentColor = action.payload;
    },
    setThemeMode: (state, action: PayloadAction<"dark" | "light">) => {
      state.mode = action.payload;
    },
  },
});

export const { setAccentColor, setThemeMode } = themeSlice.actions;
export default themeSlice.reducer;
