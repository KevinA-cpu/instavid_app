import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { SanityAssetDocument } from '@sanity/client';
import { client } from '../../utils/client';
import { topics } from '../../utils/constants';
import { useSelector } from 'react-redux/es/exports';
import { AuthState } from '../../store/authStore';
import { BASE_URL } from '../../utils';

const Upload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [wrongFileType, setWrongFileType] = useState(false);
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);
  const { userProfile } = useSelector((state: AuthState) => state);
  const router = useRouter();
  const uploadVideo = async (e: any) => {
    setIsLoading(true);
    setWrongFileType(false);
    const file = e.target.files[0];
    const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];

    if (fileTypes.includes(file?.type)) {
      client.assets
        .upload('file', file, {
          contentType: file.type,
          filename: file.name,
        })
        .then((asset) => {
          setVideoAsset(asset);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setWrongFileType(true);
    }
  };

  const handlePost = async () => {
    if (caption && videoAsset?._id && category) {
      setSavingPost(true);
      const document = {
        _type: 'post',
        caption,
        video: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: videoAsset._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: 'postedBy',
          _ref: userProfile?._id,
        },
        topic: category,
      };
      await axios.post(`${BASE_URL}/api/posts`, document);
      router.push('/');
    }
  };

  const handleDiscard = () => {
    setSavingPost(false);
    setVideoAsset(undefined);
    setCaption('');
  };

  return (
    <div className="flex h-full w-full absolute left-0 top-[78px] mb-10 pt-10 lg:pt-20 bg-white justify-center">
      <div className="bg-[#F8F8F8] rounded-lg xl:h-[80vh] w-[60%] flex gap-6 flex-wrap justify-between items-center p-14 pt-6">
        <div>
          <div>
            <p className="text-2xl font-bold">Upload Video</p>
            <p className="text-lg text-gray-400">
              Post a video to your account
            </p>
          </div>
          <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[600px] h-[460px] pb-16 cursor-pointer hover:border-red-300 hover:bg-gray-100">
            {isLoading ? (
              <p className="mt-16 text-lg text-gray-400">Uploading...</p>
            ) : (
              <div className="flex flex-col justify-center items-center">
                {videoAsset ? (
                  <div>
                    <video
                      src={videoAsset.url}
                      loop
                      controls
                      className="rounded-xl h-[450px] mt-16 bg-black"
                    ></video>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="mt-[3.25rem] flex flex-col items-center justify-center">
                        <p className="font-bold text-xl">
                          <FaCloudUploadAlt className="text-6xl text-gray-300" />
                        </p>
                        <p className="text-xl font-semibold">Upload video</p>
                      </div>
                      <p className="text-gray-400 text-center mt-10 text-sm leading-10">
                        MP4 or WebM or Ogg <br />
                        720x1280 or higher <br />
                        Up to 10 minutes <br />
                        less than 2gb
                      </p>
                      <p className="bg-[#E62725] text-center mt-10 rounded text-white text-lg font-medium p-2 w-52 outline-none">
                        Select file
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload-video"
                      onChange={uploadVideo}
                      className="w-0 h-0"
                    />
                  </label>
                )}
              </div>
            )}
            {wrongFileType && (
              <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[250px]">
                Wrong file type
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 pb-10">
          <label className="text-lg font-medium">Caption</label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="rounded outline-none text-lg border-2 border-gray-200 p-2"
          />
          <label className="text-lg font-medium">Choose a Category</label>
          <select
            className="outline-none border-2 border-gray-200 text-lg capitalize lg:p-4 p-2 rounded cursor-pointer"
            onChange={(e) => setCategory(e.target.value)}
          >
            {topics.map((topic) => (
              <option
                key={topic.name}
                value={topic.name}
                className="outline-none capitalize bg-white text-gray-700 text-lg p-2 hover:bg-slate-300"
              >
                {topic.name}
              </option>
            ))}
          </select>
          <div className="flex gap-6 mt-10">
            <button
              onClick={handleDiscard}
              type="button"
              className="border-gray-300 border-2 text-lg font-medium p-2 rounded w-28 lg:w-44 outline-none"
            >
              Discard
            </button>
            <button
              onClick={handlePost}
              type="button"
              className="bg-[#E62725] text-white text-lg font-medium p-2 rounded w-28 lg:w-44 outline-none"
            >
              {savingPost ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
