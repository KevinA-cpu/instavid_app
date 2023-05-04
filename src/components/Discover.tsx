import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { topics } from "../../utils/constants";

const Discover = () => {
  const router = useRouter();
  const { topicQuery } = router.query;

  return (
    <div className="xl:border-b-2 xl:border-gray-200 pb-6">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
        Popular Topics
      </p>
      <div className="flex flex-wrap gap-3">
        {topics.map((topic) => (
          <Link href={`/?topicQuery=${topic.name}`} key={topic.name}>
            <div
              className={`flex items-center justify-center gap-2 bg-gray-100 rounded-xl px-4 py-2 
            cursor-pointer hover:bg-gray-200 xl:rounded-full
            xl:border-2 ${
              topicQuery === topic.name
                ? "xl:border-[#E62725] text-[#F52725]"
                : "xl:border-gray-300 text-gray-500"
            }`}
            >
              <span className="font-bold text-2xl xl:text-md">
                {topic.icon}
              </span>
              <span className="font-medium text-md hidden xl:block capitalize">
                {topic.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
