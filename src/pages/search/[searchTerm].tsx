import React, { useState } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import { BASE_URL } from '../../../utils';
import { Video } from '../../../types';
import { useSelector } from 'react-redux/es/exports';
import { AuthState } from '../../../store/authStore';

const Search = ({ videos }: { videos: Video[] }) => {
  const users = useSelector((state: AuthState) => state.users);
  const [isAccounts, setIsAccounts] = useState(true);
  const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
  const isVideos = isAccounts ? 'text-gray-400' : 'border-b-2 border-black';
  const router = useRouter();
  const { searchTerm } = router.query;
  const searchedAccounts = users.filter((user) =>
    user.userName.toLowerCase().includes((searchTerm as string).toLowerCase())
  );
  return (
    <div>
      <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
          onClick={() => setIsAccounts(true)}
        >
          Accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
          onClick={() => setIsAccounts(false)}
        >
          Videos
        </p>
      </div>
      {isAccounts ? (
        <div className="md:mt-16">
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user) => (
              <Link key={user._id} href={`/profile/${user._id}`}>
                <div className="flex gap-3 p-2 pb-4 mb-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200">
                  <div>
                    <Image
                      src={user.image}
                      width={50}
                      height={50}
                      className="rounded-full"
                      alt="ProfilePicture"
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
            ))
          ) : (
            <NoResults text={`No accounts results for ${searchTerm}`} />
          )}
        </div>
      ) : (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
          {videos.length > 0 ? (
            videos.map((video) => <VideoCard key={video._id} post={video} />)
          ) : (
            <NoResults text={`No video results for ${searchTerm}`} />
          )}{' '}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);
  return {
    props: {
      videos: res.data,
    },
  };
};

export default Search;
