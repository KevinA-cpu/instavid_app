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
  const [playing, setPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
        setPlaying(false);
      } else {
        videoRef.current.play();
        setPlaying(true);
      }
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

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
              <div className="flex flex-col gap-2">
                <p className="flex gap-2 items-center md:text-lg font-bold text-primary lowercase">
                  {post.postedBy.userName.replaceAll(' ', '')}
                  <GoVerified className="text-blue-500 text-lg" />
                </p>
                <p className="-mt-1 capitalize font-medium text-xs text-gray-500 hidden md:block">
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="lg:ml-20 flex gap-4 relative">
        <div className="rounded-3xl flex flex-col items-center bg-gray-200">
          <Link href={`/detail/${post._id}`}>
            <video
              loop
              ref={videoRef}
              className="lg:w-[700px] lg:h-[530px]  md:h-[500px] md:w-[600px] h-[400px] w-[425px] rounded-2xl cursor-pointer"
              src={post.video.asset.url}
            ></video>
          </Link>

          <div className="flex items-center cursor-pointer gap-5 my-2 w-[70px] md:w-[100px] lg:justify-between">
            {playing ? (
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
                onClick={() => setIsMuted(false)}
                className="text-black text-2xl lg:text-4xl md:text-3xl"
              />
            ) : (
              <HiVolumeUp
                onClick={() => setIsMuted(true)}
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
