import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';

import { fetchAllUsers, AuthState } from '../../store/authStore';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const SuggestedAccounts = () => {
  const { users } = useAppSelector((state: AuthState) => state);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="xl:border-b-2 border-gray-200 pb-4">
      <p>SuggestedAccounts</p>
    </div>
  );
};

export default SuggestedAccounts;
