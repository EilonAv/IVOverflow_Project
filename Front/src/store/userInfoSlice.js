import { createSlice } from "@reduxjs/toolkit"

export const userInfoSlice = createSlice({
    name: 'userInformation',
    initialState: {
          user: {
              "_id": "",
              "nickname": "",
              "fullname": "",
              "email": ""
          }
    },
    reducers: {
      userSetReducer: (state,action ) => {
          console.log(action);
          state.user = action.payload
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { userSetReducer } = userInfoSlice.actions

  export const selectUser = (state) => {
  return state.userInfo.user }

  export default userInfoSlice.reducer