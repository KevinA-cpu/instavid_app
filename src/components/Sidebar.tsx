import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GoogleLogin } from '@react-oauth/google';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import Discover from './Discover';
import SuggestedAccounts from './SuggestedAccounts';
import SidebarFooter from './SidebarFooter';

const Sidebar = () => {
  const [showSideBar, setShowSideBar] = useState(true);
  const [userProfile, setUserProfile] = useState(false);

  const normalLink =
    'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#E62725] rounded';

  return (
    <div>
      <div
        className="block xl:hidden m-2 ml-4 mt-3 text-xl cursor-pointer"
        onClick={() => setShowSideBar((prev) => !prev)}
      >
        {showSideBar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSideBar && (
        <div className="xl:w-[400px] xl:border-0 p-3 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100">
          <div className="xl:border-b-2 border-gray-200 xl:pb-3">
            <Link href="/">
              <div className={normalLink}>
                <p className="text-2xl">
                  <AiFillHome />
                </p>
                <span className="text-xl hidden xl:block">For You</span>
              </div>
            </Link>
          </div>

          <Discover />
          <SuggestedAccounts />
          <SidebarFooter />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
