import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { useSelector } from 'react-redux/es/exports';
import { AuthState } from '../../store/authStore';
import NoResults from './NoResults';

interface IProps {
  comment: string;
  comments: {
    comment: string;
    _key: string;
    postedBy: {
      _ref: string;
    };
  }[];
  setComment: React.Dispatch<React.SetStateAction<string>>;
  addComment: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void>;
  isPostingComment: boolean;
}

const Comments = ({
  comment,
  comments,
  setComment,
  addComment,
  isPostingComment,
}: IProps) => {
  const userProfile = useSelector((state: AuthState) => state.userProfile);
  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[475px]">
        {comments?.length ? (
          <div> comments </div>
        ) : (
          <NoResults text="No comments yet!" />
        )}
      </div>
      {userProfile && (
        <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-24">
          <form className="flex gap-4">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add comment"
              className="bg-primary px-6 py-4 text-lg font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
            />
            <button
              onClick={addComment}
              type="submit"
              className="text-gray-400 px-6 py-4 text-lg font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 rounded-lg"
            >
              {isPostingComment ? 'Commenting...' : 'Comment'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
