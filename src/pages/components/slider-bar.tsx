import React, { useEffect } from "react";
import { Popover, Divider, Space, type GetProp, Empty, Modal } from "antd";
import IconOpen from "@/assets/chat/history-open.svg";
import IconCloseNewchat from "@/assets/chat/history-close-newchat.svg";
import IconClose from "@/assets/chat/history-close.svg";
import IconOpenNewchat from "@/assets/chat/history-new-newchat.svg";
import { Conversations, type ConversationsProps } from "@ant-design/x";

const groupable: GetProp<typeof Conversations, "groupable"> = {
    title: (group, { components: { GroupTitle } }) =>
        group && (
            <GroupTitle>
                <Space>
                    <h6>{group}</h6>
                </Space>
            </GroupTitle>
        ),
};


const style = {
    width: "100%",
    background: "#fff",
    borderRadius: "0px",
    paddingBottom: "8px",
    paddingTop: "8px",
};

interface MyComponentProps {
    activeKey: string;
    sessionList: any[];
    changeSession: (sessionId: string) => void;
    newChat: () => void;
    deleteOk: (id: string) => void;
}


const SliderBar: React.FC<MyComponentProps> = ({ sessionList, changeSession, activeKey, newChat, deleteOk }) => {
    const [open, setOpen] = React.useState(true);

    const items = sessionList.flatMap(item => {
        return item.list.map(listItem => {
            return { ...listItem, group: item.label, key: listItem.session_id, label: listItem.session_name, };
        });
    });

    // 如果不为空 则默认选中第一个
    useEffect(() => {
        if (items.length) {
            changeSession(items[0]?.key);
        }
    }, [sessionList])

    const menuConfig: ConversationsProps["menu"] = (conversation) => ({
        items: [
            {
                label: "删除",
                key: "delete",
            },
        ],
        onClick: (menuInfo: any) => {
            // 取消事件冒泡
            menuInfo?.domEvent.stopPropagation();
            if (menuInfo.key === "delete") {
                Modal.confirm({
                    title: "是否删除此对话",
                    content: "", // 可以添加一些额外的提示内容
                    okText: "确认",
                    okType: "primary",
                    cancelText: "取消",
                    onOk: () => deleteOk(conversation.key),
                });
            }
        },
    });

    // 传递给父组件 id
    const itemsClick = (v: string) => {
        changeSession(v)
    }

    const close = () => {
        setOpen(false);
    };


    return (
        <div
            className={`h-full transition-width duration-75  ease-in-out ${open ? "w-[280px]" : "w-[60px]"
                } ${open ? "overflow-auto" : "overflow-hidden"
                }`}
        >
            {/* 缩小的 */}
            {!open && (
                <div
                    className={`flex h-full flex-col items-center space-y-5 border-0 border-r  border-[#E4E9ED] border-solid w-full ${open && "hidden"
                        }`}
                >
                    <img
                        src={IconOpen}
                        className="h-[36px] mt-5 cursor-pointer"
                        onClick={() => setOpen(true)}
                    ></img>
                    <Divider />
                    <Popover content="新对话" title={null} placement="right">
                        <img
                            src={IconCloseNewchat}
                            className="h-[56px] mt-4 cursor-pointer"
                            onClick={newChat}
                        ></img>
                    </Popover>
                </div>
            )}
            {/* 展开的 */}
            {open && (
                <div
                    className={`flex w-[280px] h-full flex-col items-center border-0 border-r  border-[#E4E9ED] border-solid`}
                >
                    {/* 顶部新会话 */}
                    <div className="pt-5 px-4 flex items-center justify-between w-full mb-4">
                        <img
                            src={IconClose}
                            className="h-[38px] cursor-pointer"
                            onClick={close}
                        ></img>
                        <div className="h-[70%] w-[1px] bg-[#E4E9ED]"></div>
                        <img
                            src={IconOpenNewchat}
                            // onClick={newChat}
                            className="h-[38px] cursor-pointer"
                        ></img>
                    </div>
                    <Divider style={{ margin: 0 }} />
                    {/* 会话记录 */}
                    {
                        items.length ? <Conversations
                            items={items as any}
                            onActiveChange={(v) => itemsClick(v)}
                            style={style}
                            groupable={groupable}
                            activeKey={activeKey}
                            menu={menuConfig}
                        /> : <Empty className="mt-32" description='暂无会话 ' />
                    }
                </div>
            )}
        </div>
    );
};

export default SliderBar;
