import React from "react";

import Aiuser from "@/assets/svg/deepseek.svg";
import LoadIcon from "@/assets/chat/load.png";

const Loading: React.FC = () => {
  return (
    <div className="flex items-start mt-[18px] justify-start">
      <img src={Aiuser} width={44} height={44} className="mr-2 border-[#eae7e7] border-solid border-[1px] rounded-full p-1"></img>
      <div className="border-radius-lg  pt-[10px] pb-[6px] px-[10px]">
        <img src={LoadIcon} alt="" className="h-[30px]"></img>
      </div>
    </div>
  );
};

export default Loading;
