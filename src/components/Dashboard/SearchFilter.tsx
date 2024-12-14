import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterUsers } from '../redux/slices/userSlice';

interface SearchFilterProps {
  userFound: (found: boolean) => void; 
}

const SearchFilter: React.FC<SearchFilterProps> = ({ userFound }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  
  const filteredUsers = useSelector((state: any) => state.users.filteredUsers);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    dispatch(filterUsers(term));
  };

  useEffect(() => {
    const usersToDisplay = filteredUsers.filter((user: any) => {
      const nameMatch = user.name.search(searchTerm) !== -1;
      const emailMatch = user.email.search(searchTerm) !== -1;
      return nameMatch || emailMatch;
    });

    userFound(usersToDisplay.length > 0); // Notify the parent about the results
  }, [searchTerm, filteredUsers, userFound]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search users(by name or email)"
        className="p-2 rounded-lg border border-gray-300 lg:w-[40%] w-full mb-4"
      />
    </div>
  );
};

export default SearchFilter;
