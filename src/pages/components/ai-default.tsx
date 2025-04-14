import React from "react";
import Aiuser from "@/assets/svg/deepseek.svg";
const AiChat: React.FC = () => {
  return (
    <div
      className="mb-8 text-normal overflow-hidden"
      style={{ width: "calc(100% - 52px)" }}
    >
      <div className="flex items-center mt-[18px] justify-start w-full">
        <img src={Aiuser} className="mr-[8px] w-[44px] border-[#eae7e7] border-solid border-[1px] rounded-full p-1" alt=""></img>
        <div className="w-full flex-col flex text-[#000] font-bold ml-2">
          您好，有什么问题可以帮您, 你可以要我生成表格，文字 和代码
        </div>
      </div>
    </div>
  );
};

export default AiChat;
