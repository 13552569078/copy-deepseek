import React, { useState, useRef, useEffect } from "react";
import { message } from "antd";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useImmer } from "use-immer";
import { GlobalAPI } from "@/constants/index";
import OpenAI from "openai";

import { SESSION_GROUP, SESSION_GROUP_ACTIVE_KEY } from "./components/mock";
import {
    SliderBar,
    DeepseekInput,
    AiChatDefault,
    UserChat,
    AiChat,
    Loading,
} from "./components/index";

const ADD_CHAT_ITEM = {
    answer: "",
    question: "",
    type: "",
    id: "",
    done: false, // 是否完成 默认是false
};

const Homepage: React.FC = () => {
    // 会话历史记录的

    const [sessionId, setSessionId] = useState<string>(SESSION_GROUP_ACTIVE_KEY);

    const [QA_LIST, SET_QA_LIST] = useImmer<any[]>([]);

    const getSesseionHistoryList = async (id: string) => {
        setSessionId(() => id);
        // console.log(此处可以获取对应id的会话历史)
        // console.log(id)
    };

    const newChat = () => {
        console.log("newChat");
    };

    const deleteSession = async (id: string) => {
        // console.log("deleteSession")
    };

    // 添加询问问题
    const [loading, setLoading] = useState(false); // 接口处理 加载loading
    const [answering, setAnswering] = useState(false); // 处理 流式状态

    const chatRef = useRef<HTMLDivElement>(null);
    const openaiRef = useRef<any>(null);

    const [deepthinking, setDeepthinking] = useState(false);

    // 添加询问
    const addQuestion = (q: string) => {
        SET_QA_LIST((prevCount) => {
            prevCount.push({
                ...ADD_CHAT_ITEM,
                question: q.trim(),
            });
        });
    };

    // 聊天滚动底部
    const goChatBottom = async () => {
        const node = chatRef.current;
        if (node) {
            // 滚动到DOM节点的底部
            node.scroll({
                top: node.scrollHeight,
                behavior: "smooth",
            });
        }
    };

    const send = async (q: string) => {
        if (!q) return;
        // 加载中不允许再次提问
        if (loading || answering) {
            message.warning("请等待上一个问题回答完成后再提问！");
            return false;
        }

        addQuestion(q);

        // 滚动底部
        setTimeout(() => {
            goChatBottom();
        }, 100);

        // 加载框
        setLoading(true);
        setAnswering(false);

        // 创建新的 AbortController 实例
        currentCtrl.current = new AbortController();

        const params = {
            messages: [{ role: "user", content: q }],
            model: "deepseek-chat",
            stream: true,
            signal: currentCtrl.current.signal, // 传递 AbortController 的 signal 属性
        };

        if (params.messages.length > 0) {
            try {

                const response = await openaiRef.current.chat.completions.create(
                    params
                );
                for await (const part of response) {
                    setLoading(false);
                    setAnswering(true);
                    console.log(part)
                    SET_QA_LIST((prevCount) => {
                        prevCount[prevCount.length - 1].answer =
                            prevCount[prevCount.length - 1].answer +
                            part.choices[0].delta.content;
                    });
                    goChatBottom();
                }

                setLoading(false);
                setAnswering(false);
                SET_QA_LIST((prevCount) => {
                    prevCount[prevCount.length - 1].done = true;
                });

            } catch (error) {
                setLoading(false);
                setAnswering(false);
            }
        }
    };

    const currentCtrl = useRef<any>(null);
    // 手动停止流式返回的函数
    const stopStreaming = () => {
        if (currentCtrl.current) {
            currentCtrl.current.abort();
            SET_QA_LIST((prevCount) => {
                prevCount[prevCount.length - 1].done = true;
            });
            // 取消加载框
            setLoading(false);
            setAnswering(false);
            message.success("已停止生成");
        }
    };

    const initOpenAI = () => {
        openaiRef.current = new OpenAI({
            baseURL: "https://api.deepseek.com",
            apiKey: GlobalAPI.config?.VITE_DEEPSEEK_KEY,
            dangerouslyAllowBrowser: true,
        });
    };

    useEffect(() => {
        initOpenAI();
    }, []);

    return (
        <div className="w-full h-full flex overflow-x-hidden">
            <SliderBar
                sessionList={SESSION_GROUP}
                changeSession={getSesseionHistoryList}
                newChat={newChat}
                deleteOk={deleteSession}
                activeKey={sessionId}
            ></SliderBar>
            <div className="w-full h-full flex-1 p-4 flex flex-col justify-between">
                <div className="flex-1 min-h-0 min-w-0 overflow-auto flex-col gap-4 pb-24" ref={chatRef}>
                    <AiChatDefault></AiChatDefault>
                    {QA_LIST.map((item, index) => {
                        return (
                            <div key={index}>
                                {item.question && <UserChat message={item} />}
                                {
                                    item?.answer && <AiChat
                                        done={item?.done}
                                        message={item}
                                    />
                                }
                            </div>
                        );
                    })}
                    {loading && !answering && <Loading></Loading>}
                </div>
                <DeepseekInput
                    send={send}
                    loading={loading || answering}
                    deepthinking={deepthinking}
                    changeDeepthinking={() => setDeepthinking(!deepthinking)}
                    stopChat={stopStreaming}
                ></DeepseekInput>
            </div>
        </div>
    );
};

export default Homepage;
