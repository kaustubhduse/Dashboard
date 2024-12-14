import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AnalyticsState {
  totalUsers: number;
  activeUsers: number;
  deletedUsers: number;
}

const initialState: AnalyticsState = {
  totalUsers: 50,
  activeUsers: 25,
  deletedUsers: 0,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    // Update metrics based on the new data
    updateMetrics(_, action: PayloadAction<AnalyticsState>) {
      return action.payload;
    },
    incrementDeletedUsers(state) {
      state.deletedUsers += 1;
    },
    decrementTotalUsers(state) {
      state.totalUsers -= 1;
    },
    decrementActiveUsers(state) {
      state.activeUsers -= 1;
    },

    // New action to delete a user
    deleteUser(state) {
      state.deletedUsers += 1;
      state.totalUsers -= 1;
      state.activeUsers -= 1; 
    },
  },
});

export const { updateMetrics, incrementDeletedUsers, decrementTotalUsers, decrementActiveUsers, deleteUser } = analyticsSlice.actions;
export default analyticsSlice.reducer;
