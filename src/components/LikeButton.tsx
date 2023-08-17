import React, { useState, useEffect } from 'react';
import { MdFavorite } from 'react-icons/md';
import { useSelector } from 'react-redux/es/exports';
import { AuthState } from '../../store/authStore';

interface IProps {
  likes: {
    postedBy: { _id: string; userName: string; image: string };
    _ref?: string;
  }[];
  handleLike: () => void;
  handleDislike: () => void;
}

const LikeButton = ({ likes, handleLike, handleDislike }: IProps) => {
  const { userProfile } = useSelector((state: AuthState) => state);
  const [liked, setLiked] = useState(false);
  const filterLikes = likes?.filter((item) => item._ref === userProfile?._id);
  useEffect(() => {
    if (filterLikes?.length) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [likes, filterLikes]);
  return (
    <div className="flex gap-6">
      <div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
        {liked ? (
          <div
            className="bg-primary rounded-full p-2 md:p-4 text-[#E62725]"
            onClick={handleDislike}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        ) : (
          <div
            className="bg-primary rounded-full p-2 md:p-4"
            onClick={handleLike}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        )}
        <p className="text-lg font-semibold">{likes?.length | 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;
