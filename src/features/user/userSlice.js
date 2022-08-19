import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    userNameSurname: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setUserNameSurname: (state, action) => {
            state.userNameSurname = action.payload
        }
    }
})

export const {setUserNameSurname} = userSlice.actions;
export const selectUserNameSurname = (state) => state.user.userNameSurname;
export default userSlice.reducer;
