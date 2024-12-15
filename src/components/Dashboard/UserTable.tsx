import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersSuccess, deleteUserThunk, } from '../redux/slices/userSlice';
import { RootState, AppDispatch } from '../redux/store';
import { incrementDeletedUsers, decrementTotalUsers, decrementActiveUsers } from '../redux/slices/analyticsSlice';
import Pagination from './Pagination';
import UserDetailsModal from './UserDetailsModal';
import SearchFilter from './SearchFilter';
import mockData from '../db.json';
import { FaEye, FaTrash } from 'react-icons/fa';

const UserTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { filteredUsers } = useSelector((state: RootState) => state.users);
  const deletedUsers = useSelector((state: RootState) => state.analytics.deletedUsers);

  const [isUserFound, setIsUserFound] = useState(true); 
  
  const findUserHandler = (found: boolean) => {
    setIsUserFound(found); 
  };

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  useEffect(() => {
    if (filteredUsers.length === 0 && mockData.users.length > 0) {
      const users = mockData.users.map(user => ({
        ...user,
        status: user.status as "active" | "inactive"
      }));
      dispatch(fetchUsersSuccess(users));
    }
  }, [dispatch, filteredUsers]);

  const handleDelete = (id: number) => {
    dispatch(deleteUserThunk(id));
    dispatch(incrementDeletedUsers());
    dispatch(decrementTotalUsers());

    const userIndex = mockData.users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      const isActive = mockData.users[userIndex].status === "active";
      mockData.users.splice(userIndex, 1);
      if (isActive) {
        dispatch(decrementActiveUsers());
      }
    }
  };

  const handleOpenModal = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="lg:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">User Dashboard</h1>
      <p className="text-lg mb-4">
        <strong>Deleted Users:</strong> {deletedUsers}
      </p>
      <SearchFilter userFound={findUserHandler} />
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3 text-sm sm:text-base">Name</th>
              <th className="p-3 text-sm sm:text-base">Email</th>
              <th className="p-3 text-sm sm:text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isUserFound ? (
              currentUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-400">
                  <td className="p-3 text-sm sm:text-base">{user.name}</td>
                  <td className="p-3 text-sm sm:text-base">{user.email}</td>
                  <td className="p-3">
                    <div className="flex flex-col sm:flex-row sm:space-x-6">
                      <button
                        onClick={() => handleOpenModal(user)}
                        className="bg-blue-500 text-white py-2 px-3 rounded-lg transform transition-all duration-300 hover:scale-110 hover:bg-blue-600 hover:shadow-xl mb-2 sm:mb-0 justify-center items-center"
                      >
                        <FaEye className="text-white text-lg" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 text-white py-2 px-3 rounded-lg transform transition-all duration-300 hover:scale-110 hover:bg-red-600 hover:shadow-xl mt-2 sm:mt-0"
                      >
                        <FaTrash className="text-white text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center p-3 text-red-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={filteredUsers.length}
        paginate={paginate}
        currentPage={currentPage}
      />

      {isModalOpen && (
        <UserDetailsModal
          user={selectedUser}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default UserTable;
