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
      _id: string;
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
  const { userProfile, users } = useSelector((state: AuthState) => state);
  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[475px]">
        {comments?.length ? (
          comments.map((comment, idx) => (
            <>
              {users.map(
                (user) =>
                  user._id ===
                    (comment.postedBy._ref || comment.postedBy._id) && (
                    <div key={user._id} className="p-2 items-center">
                      <Link href={`/profile/${user._id}`}>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8">
                            <Image
                              src={user.image}
                              width={32}
                              height={32}
                              className="rounded-full"
                              alt="ProfilePicture"
                              style={{ width: '100%', height: '100%' }}
                            />
                          </div>

                          <div className="hidden xl:block">
                            <p className="flex gap-1 items-center text-lg font-bold text-primary lowercase">
                              {user.userName.replaceAll(' ', '')}
                              <GoVerified className="text-blue-400" />
                            </p>
                            <p className="capitalize text-gray-400 text-xs">
                              {user.userName}
                            </p>
                          </div>
                        </div>
                      </Link>
                      <div>
                        <p>{comment.comment}</p>
                      </div>
                    </div>
                  )
              )}
            </>
          ))
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
