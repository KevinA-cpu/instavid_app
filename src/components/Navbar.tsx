import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Logo from "../../utils/InstaVid.png";
import { createOrGetUser } from "../../utils";

const Navbar = () => {
  const user = false;
  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[50px] md:w-[70px]">
          <Image
            src={Logo}
            alt="Logo"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            priority
          />
        </div>
      </Link>

      <div>SEARCH BAR</div>
      <div>
        {user ? (
          <div> logged in </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => {
              createOrGetUser(response);
            }}
            onError={() => {}}
            width="300"
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
