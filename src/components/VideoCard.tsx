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
  const [isHover, setIsHover] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const vieoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (vieoRef.current) {
      if (isPlaying) {
        vieoRef.current.pause();
        setIsPlaying(false);
      } else {
        vieoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleMute = () => {
    if (vieoRef.current) {
      if (isMuted) {
        vieoRef.current.muted = false;
        setIsMuted(vieoRef.current.muted);
      } else {
        vieoRef.current.muted = true;
        setIsMuted(vieoRef.current.muted);
      }
    }
  };

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
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="rounded-3xl"
        >
          <Link href="/">
            <video
              loop
              ref={vieoRef}
              className="lg:w-[600px] lg:h-[530px] md:h-[500px] md:w-[600px] h-[400px] w-[425px] rounded-2xl cursor-pointer bg-gray-200"
              src={post.video.asset.url}
            ></video>
          </Link>
          {isHover && (
            <div
              className="absolute bottom-6 cursor-pointer left-3 gap-5 md:left-[3rem] flex
            lg:left-6 lg:justify-between w-[70px] md:w-[100px]"
            >
              {isPlaying ? (
                <BsFillPauseFill
                  onClick={handlePlay}
                  className="text-black text-2xl lg:text-4xl"
                />
              ) : (
                <BsFillPlayFill
                  onClick={handlePlay}
                  className="text-black text-2xl lg:text-4xl"
                />
              )}
              {isMuted ? (
                <HiVolumeOff
                  onClick={handleMute}
                  className="text-black text-2xl lg:text-4xl"
                />
              ) : (
                <HiVolumeUp
                  onClick={handleMute}
                  className="text-black text-2xl lg:text-4xl"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
