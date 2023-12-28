import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//* Create action
export const createUser = createAsyncThunk("createUser", async (user, { rejectWithValue }) => {
  try {
    const response = await axios.post('https://65869718468ef171392e6d08.mockapi.io/crud', user);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// * read action
export const getAllUsers = createAsyncThunk("getAllUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('https://65869718468ef171392e6d08.mockapi.io/crud');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// * delete action
export const deleteUsers = createAsyncThunk("deleteUser", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`https://65869718468ef171392e6d08.mockapi.io/crud/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

//* updated action
export const updateUser = createAsyncThunk("updateUser", async (user, { rejectWithValue }) => {
  console.log((user))
  try {
    const response = await axios.put(`https://65869718468ef171392e6d08.mockapi.io/crud/${user.id}`, user);
    // console.log("api",user.id)
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    users: [],
    loading: false,
    error: null,
    searchUser:[]
  },
  reducers: {
    setSearchUser: (state, action) => {
      state.searchUser = action.payload; // Update searchUser with payload data
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUsers.fulfilled, (state, action) => {
        state.loading = false;
        const {id} = action.payload
        state.users = state.users.filter((user)=> user.id !== id)
      })
      .addCase(deleteUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        // console.log( 'action', action.payload)
        state.users = state.users.map((user)=>(
          user.id === action.payload.id ? action.payload : user 
        ))
      })  
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export default userSlice.reducer;
export const {setSearchUser} = userSlice.actions