import React from "react";
import { footerList1, footerList2, footerList3 } from "../../utils/constants";

const List = ({ list, mt }: { list: string[]; mt: boolean }) => {
  return (
    <div className={`flex flex-wrap gap-2 ${mt && "mt-5"}`}>
      {list.map((item) => (
        <p
          className="text-gray-400 text-sm hover:underline cursor-pointer"
          key={item}
        >
          {item}
        </p>
      ))}
    </div>
  );
};

const SidebarFooter = () => {
  return (
    <div className="mt-6 hidden xl:block">
      <List list={footerList1} mt={false} />
      <List list={footerList2} mt />
      <List list={footerList3} mt />
      <p className="text-gray-400 text-sm mt-5">2023 InstaVid</p>
    </div>
  );
};

export default SidebarFooter;
