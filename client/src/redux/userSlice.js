import { createSlice} from '@reduxjs/toolkit'


const userSlice = createSlice({
    name: 'user',
    initialState: {
      name: "",
      email: "",
      userId: "",
      phone: ""
    },
    reducers: {
        update:  (state,action) => {
          state.name = action.payload.name;
          state.email = action.payload.email;
          state.userId = action.payload.userId;
          state.phone = action.payload.phone;
        },
        signout:  (state) => {
          state.name = "";
          state.email = "";
          state.userId = "";
          state.phone = "";
        },

      }
    })


    export const {update,signout} = userSlice.actions;

    export default userSlice.reducer;