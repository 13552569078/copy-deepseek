import React, { createContext } from "react";
import Aiuser from "@/assets/svg/deepseek.svg";
import MarkdownAi from "./markdown-ai";


interface MyComponentProps {
  message: any;
  done: boolean;
}

// 创建上下文
const AiContext = createContext({
  done: false,
});

const AiChat: React.FC<MyComponentProps> = ({ message, done }) => {

  return (
    <div
      className="mb-8 text-normal overflow-hidden"
    >
      <div className="flex items-start mt-[18px] justify-start w-full">
        <img src={Aiuser} className="mr-[8px] w-[44px] border-[#eae7e7] border-solid border-[1px] rounded-full p-1" alt=""></img>
        <div className="w-full flex-col flex text-[#000] font-bold ml-2">
          <AiContext.Provider value={{ done: message?.done }}>
            <MarkdownAi
              done={done}
              markdownstr={message?.answer}
            ></MarkdownAi>
          </AiContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default AiChat;

export { AiContext }