import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    theme: 'light',
    bgimg: true
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) =>{
            if(state.theme === 'light'){
                state.theme = 'dark';
                state.bgimg = false;
            }
            else{
                state.theme = 'light';
                state.bgimg = true
            }
            
        },

    }
});

export const {toggleTheme} = themeSlice.actions;
export default themeSlice.reducer;