import Image from 'next/image';
import axios from 'axios';
import { Video } from '../../types';
import VideoCard from '../components/VideoCard';
import NoResults from '@/components/NoResults';
import { BASE_URL } from '../../utils';

interface IProps {
  videos: Video[];
}

export default function Home({ videos }: IProps) {
  return (
    <div className="flex flex-col gap-10 h-full">
      {videos.length ? (
        videos.map((video: Video) => <VideoCard post={video} key={video._id} />)
      ) : (
        <NoResults text={'No videos can be found.'} />
      )}
    </div>
  );
}

export const getServerSideProps = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/posts`);

  return {
    props: {
      videos: data,
    },
  };
};
