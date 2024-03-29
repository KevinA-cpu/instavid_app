import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';

import { fetchAllUsers, AuthState } from '../../store/authStore';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const SuggestedAccounts = () => {
  const users = useAppSelector((state: AuthState) => state.users);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch, users]);

  return (
    <div className="xl:border-b-2 border-gray-200 pb-4">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
        SuggestedAccounts
      </p>

      <div>
        {users.slice(0, 6).map((user) => (
          <Link key={user._id} href={`/profile/${user._id}`}>
            <div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded">
              <div className="w-8 h-8">
                <Image
                  src={user.image}
                  width={34}
                  height={34}
                  className="rounded-full"
                  alt="ProfilePicture"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>

              <div className="hidden xl:block">
                <p className="flex gap-1 items-center text-lg font-bold text-primary lowercase">
                  {user.userName.replaceAll(' ', '')}
                  <GoVerified className="text-blue-400" />
                </p>
                <p className="capitalize text-gray-400 text-xs">
                  {user.userName}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestedAccounts;
