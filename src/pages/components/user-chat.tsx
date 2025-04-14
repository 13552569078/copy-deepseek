import React from "react";

import MeUser from "@/assets/chat/me-user.svg";

interface MyComponentProps {
  message: any;
}

const UserChat: React.FC<MyComponentProps> = ({ message }) => {
  return (
    <div className="flex items-start justify-end text-normal text-[16px]">
      <div
        className="border-radius-lg py-[12px] px-[16px]"
      >
        {message?.question?.trim()}
      </div>
      <img src={MeUser} className="ml-[8px] bg w-[44px]"></img>
    </div>
  );
};

export default UserChat;
