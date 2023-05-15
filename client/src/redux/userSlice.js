import { createSlice} from '@reduxjs/toolkit'


const userSlice = createSlice({
    name: 'user',
    initialState: {
      name: "",
      email: "",
      userId: ""
    },
    reducers: {
        update:  (state,action) => {
          state.name = action.payload.name;
          state.email = action.payload.email;
          state.userId = action.payload.userId;
        }
      }
    })


    export const {update} = userSlice.actions;

    export default userSlice.reducer;