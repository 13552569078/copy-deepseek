import { useState } from "react";
import { Popover } from "antd";
import { Input, message } from "antd";

import IconSend from "@/assets/chat/chat-send.svg";
import loadingIcon from "@/assets/chat/loading.png";

interface MyComponentProps {
  send: (s: string) => void; // 发送消息
  loading: boolean; // 是否加载中 回复及流式回复
  deepthinking: boolean; // 是否开启深度思考
  changeDeepthinking: () => void; // 变更开启深度思考
  stopChat: () => void; // 停止聊天
}

const { TextArea } = Input;

const DeepseekInput: React.FC<MyComponentProps> = ({
  send,
  loading,
  deepthinking,
  changeDeepthinking,
  stopChat,
}) => {

  // 回车 发送问题
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (loading) {
      message.warning("正在回答请稍后提问");
      return;
    }
    if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey) {
      e.preventDefault(); // 阻止默认的回车行为
      send(value);
      setValue("");
    }
  };

  const sendMessage = () => {
    if (loading) {
      message.warning("正在回答请稍后提问");
      return;
    }
    send(value);
    setValue("");
  };

  return (
    <div className="w-full min-h-36 bg-white rounded-2xl px-3 py-2 border-[1px]  border-solid border-[#E4E9ED] flex flex-col justify-between">
      <div className="mb-2.5">
        <TextArea
          placeholder="有什么问题，我可以帮您"
          autoSize={{ minRows: 2, maxRows: 6 }}
          style={{ border: 0, outline: 0, boxShadow: "none" }}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="flex justify-between">
        {/* 左侧按钮 */}
        <div>
          <div
            className={`cursor-pointer flex items-center border-[1px]  border-solid py-1 px-3 rounded-full ${deepthinking
              ? "border-[#CCD8FC] bg-[#E9EDFA]"
              : "border-[#E4E9ED] bg-[#FFFFFF]"
              }`}
            onClick={changeDeepthinking}
          >
            <span
              className={`ml-1 text-[14px]  ${deepthinking ? "text-[#2C54D1]" : null
                }`}
            >
              深度思考(R1)
            </span>
          </div>
        </div>
        {/* 右侧发送 */}
        <div className="flex items-center">
          {/* 仅仅本地知识有文件上传 */}
          <div
            className={`flex items-center h-full cursor-pointer`}
          >
          </div>
          {loading ? (
            <Popover content="停止问答" title={null}>
              <img
                src={loadingIcon}
                alt="loading"
                className="w-[36px] cursor-pointer"
                onClick={stopChat}
              ></img>
            </Popover>
          ) : (
            <span onClick={sendMessage}>
              <img src={IconSend} width={34}
                height={34} className="cursor-pointer" alt=""></img>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeepseekInput;
