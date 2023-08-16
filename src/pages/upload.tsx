import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { SanityAssetDocument } from '@sanity/client';
import { client } from '../../utils/client';
import { topics } from '../../utils/constants';

const Upload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [wrongFileType, setWrongFileType] = useState(false);
  const uploadVideo = async (e: any) => {
    setIsLoading(true);
    const file = e.target.files[0];
    const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];

    if (fileTypes.includes(file.type)) {
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

  return (
    <div className="flex h-full w-full absolute left-0 top-[78px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center">
      <div className="bg-white rounded-lg xl:h-[80vh] w-[60%] flex gap-6 flex-wrap justify-between items-center p-14 pt-6">
        <div>
          <div>
            <p className="text-2xl font-bold">Upload Video</p>
            <p className="text-lg text-gray-400">
              Post a video to your account
            </p>
          </div>
          <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[520px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
            {isLoading ? (
              <p className="text-lg text-gray-400">Uploading...</p>
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
                      <div className="flex flex-col items-center justify-center">
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
            value=""
            onChange={() => {}}
            className="rounded outline-none text-lg border-2 border-gray-200 p-2"
          />
          <label className="text-lg font-medium">Choose a Category</label>
          <select
            className="outline-none border-2 border-gray-200 text-lg capitalize lg:p-4 p-2 rounded cursor-pointer"
            onChange={() => {}}
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
              onClick={() => {}}
              type="button"
              className="border-gray-300 border-2 text-lg font-medium p-2 rounded w-28 lg:w-44 outline-none"
            >
              Discard
            </button>
            <button
              onClick={() => {}}
              type="button"
              className="bg-[#E62725] text-white text-lg font-medium p-2 rounded w-28 lg:w-44 outline-none"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;