import React, { useState, useEffect, useRef } from "react";
import { Video } from "../../types";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="md:w-16 md:h-16 w-10 h-10">
            <Link href="/">
              <>
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={post.postedBy.image}
                  alt="ProfilePicture"
                  style={{ width: "100%", height: "100%" }}
                />
              </>
            </Link>
          </div>
          <div>
            <Link href="/">
              <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                {post.postedBy.userName}{" "}
                <GoVerified className="text-blue-500 text-md" />
              </p>
            </Link>
          </div>
        </div>
      </div>

      <div className="lg:ml-20 flex gap-4 relative">
        <div
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
          className="rounded-3xl"
        >
          <Link href="/">
            <video
              loop
              className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-200"
              src={post.video.asset.url}
            ></video>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
