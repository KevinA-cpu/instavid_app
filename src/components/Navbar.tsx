import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import Logo from '../../utils/InstaVid.png';
import { createOrGetUser } from '../../utils';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { AuthState } from '../../store/authStore';
import { addUser, removeUser } from '../../store/authStore';

const Navbar = () => {
  const { userProfile } = useSelector((state: AuthState) => state);
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[60px] md:w-[60px]">
          <Image
            src={Logo}
            alt="Logo"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            priority
          />
        </div>
      </Link>

      <div>SEARCH BAR</div>
      <div>
        {userProfile ? (
          <div className="flex items-center gap-5 ">
            <Link href="/upload">
              <button className="border-2 px-2 md:px-4 text-lg font-semibold flex items-center gap-2">
                <IoMdAdd className="text-xl" />{' '}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href="/">
                <>
                  <Image
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                    src={userProfile.image}
                    alt="ProfilePicture"
                  />
                </>
              </Link>
            )}
            <button
              type="button"
              className="px-2"
              onClick={() => {
                googleLogout();
                dispatch(removeUser());
              }}
            >
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => {
              createOrGetUser(response, addUser, dispatch);
            }}
            onError={() => {}}
            width={300}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
