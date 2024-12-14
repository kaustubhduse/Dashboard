import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  name: string;
  email: string;
  region: string; 
  createdAt: string;
  status: 'active' | 'inactive';
}

interface UserState {
  users: User[];
  filteredUsers: User[];
  loading: boolean;
}

const initialState: UserState = {
  users: [],
  filteredUsers: [],
  loading: false,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Fetch users from the db.json file
    fetchUsersSuccess(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
      state.filteredUsers = action.payload;
    },
    deleteUser(state, action: PayloadAction<number>) {
      const userId = action.payload;
      // Remove the user from both the users and filteredUsers arrays
      state.users = state.users.filter(user => user.id !== userId);
      state.filteredUsers = state.filteredUsers.filter(user => user.id !== userId);
    },
    // Filter users by name or email
    filterUsers(state, action: PayloadAction<string>) {
      const searchTerm = action.payload.toLowerCase();
      const searchRegex = new RegExp(searchTerm, 'i'); // Case-insensitive regex

      state.filteredUsers = state.users.filter(
        user =>
          searchRegex.test(user.name) || searchRegex.test(user.email)
      );
    },
    // save the filtered users
    saveFilteredUsers(state, action: PayloadAction<User[]>) {
      state.filteredUsers = action.payload;
    }
  },
});

// Thunk to handle user deletion and increment the deletedUsers count
export const deleteUserThunk = (userId: number) => (dispatch: any) => {
  dispatch(deleteUser(userId));  
  // Dispatch delete action
};

export default userSlice.reducer;
export const { fetchUsersSuccess, deleteUser, filterUsers, saveFilteredUsers } = userSlice.actions;
