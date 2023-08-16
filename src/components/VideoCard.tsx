import React, { useState, useEffect, useRef } from 'react';
import { Video } from '../../types';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';

interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
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
                  style={{ width: '100%', height: '100%' }}
                />
              </>
            </Link>
          </div>
          <div>
            <Link href="/">
              <p className="flex gap-2 items-center md:text-lg font-bold text-primary">
                {post.postedBy.userName}{' '}
                <GoVerified className="text-blue-500 text-lg" />
              </p>
            </Link>
          </div>
        </div>
      </div>

      <div className="lg:ml-20 flex gap-4 relative">
        <div className="rounded-3xl flex flex-col items-center bg-gray-200">
          <Link href={`/detail/${post._id}`}>
            <video
              loop
              ref={vieoRef}
              className="lg:w-[700px] lg:h-[530px]  md:h-[500px] md:w-[600px] h-[400px] w-[425px] rounded-2xl cursor-pointer"
              src={post.video.asset.url}
            ></video>
          </Link>

          <div className="flex items-center cursor-pointer gap-5 my-2 w-[70px] md:w-[100px] lg:justify-between">
            {isPlaying ? (
              <BsFillPauseFill
                onClick={handlePlay}
                className="text-black text-2xl lg:text-4xl md:text-3xl"
              />
            ) : (
              <BsFillPlayFill
                onClick={handlePlay}
                className="text-black text-2xl lg:text-4xl md:text-3xl"
              />
            )}
            {isMuted ? (
              <HiVolumeOff
                onClick={handleMute}
                className="text-black text-2xl lg:text-4xl md:text-3xl"
              />
            ) : (
              <HiVolumeUp
                onClick={handleMute}
                className="text-black text-2xl lg:text-4xl md:text-3xl"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
