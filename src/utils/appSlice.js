import { createSlice } from "@reduxjs/toolkit";

const initialDarkMode = localStorage.getItem('isDark') === 'true';
const appSlice = createSlice({
    name : "app",
    initialState : {
        isMenuOpen : true,
        isFixed : false,
        isDark : initialDarkMode,
    },
    reducers:{
        toggleMenu :(state) => {
            state.isMenuOpen = !state.isMenuOpen;
            // console.log("value of "+state.isMenuOpen);
        },
        closeMenu : (state) =>{
            state.isMenuOpen = false;
        },
        isScroll :(state,action) =>{
            state.isFixed =action.payload;
        },
        isDarky: (state, action) => {
            state.isDark = action.payload;
            // Save to local storage
            localStorage.setItem('isDark', action.payload);
        }

    },
});

export const {toggleMenu , closeMenu ,isScroll ,isDarky } = appSlice.actions;
export default appSlice.reducer;