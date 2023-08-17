import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import axios from 'axios';
import { BASE_URL } from '../../../utils';
import { Video } from '../../../types';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { AuthState } from '../../../store/authStore';
import LikeButton from '@/components/LikeButton';
import Comments from '@/components/Comments';

const Detail = ({ postDetails }: { postDetails: Video }) => {
  const [post, setPost] = useState(postDetails);
  const [playing, setPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const { userProfile } = useSelector((state: AuthState) => state);

  useEffect(() => {
    if (post && videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [post, isMuted]);

  if (!post) return null;

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
  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <div className="relative flex-1 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black">
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p className="cursor-pointer" onClick={() => router.back()}>
            <MdOutlineCancel className="text-white text-[35px]" />
          </p>
        </div>
        <div className="relative">
          <div className="lg:h-[100vh] h-[60vh]">
            <video
              ref={videoRef}
              loop
              onClick={handlePlay}
              src={post.video.asset.url}
              className="h-full cursor-pointer"
            ></video>
          </div>
          <div className="absolute top-[45%] left-[45%] cursor-pointer">
            {!playing && (
              <button onClick={handlePlay}>
                <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
              </button>
            )}
          </div>
        </div>

        <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer">
          {isMuted ? (
            <HiVolumeOff
              onClick={() => setIsMuted(false)}
              className="text-white text-2xl lg:text-4xl md:text-3xl"
            />
          ) : (
            <HiVolumeUp
              onClick={() => setIsMuted(true)}
              className="text-white text-2xl lg:text-4xl md:text-3xl"
            />
          )}
        </div>
      </div>

      <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
        <div className="lg:mt-20 mt-10">
          <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
            <div className="ml-4 md:w-20 md:h-20 w-16 h-16">
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
                <div className="mt-3 flex flex-col gap-2">
                  <p className="flex gap-2 items-center md:text-lg font-bold text-primary">
                    {post.postedBy.userName}{' '}
                    <GoVerified className="text-blue-500 text-lg" />
                  </p>
                  <p className="-mt-1 capitalize font-medium text-xs text-gray-500 hidden md:block">
                    {post.postedBy.userName}
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <p className="px-6 text-lg text-gray-600">{post.caption}</p>

          <div className="mt-10 px-10">{userProfile && <LikeButton />}</div>
          <Comments />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/posts/${id}`);
  return {
    props: {
      postDetails: data,
    },
  };
};

export default Detail;
