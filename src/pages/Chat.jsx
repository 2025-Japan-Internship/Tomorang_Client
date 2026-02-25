import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Mybubble from "../components/chatComponents/Mybubble";
import Otherbubble from "../components/chatComponents/Otherbubble";
import Quickreply from "../components/chatComponents/Quickreply";
import ChatHeader from "../components/chatComponents/ChatHeader";
import MessageInput from "../components/chatComponents/MessageInput";
import ReportSystem from "../components/ReportModal";
import postData from "../data/postData.json";
import AddIcon from "../assets/chatimg/AddIcon.svg";
import SendIcon from "../assets/chatimg/sendIcon.svg";
import ChangeIcon from "../assets/chatimg/Change.svg";

const AUTO_REPLY = {
  id: "auto_reply",
  type: "other",
  message: "良い質問ですね！地元の人は渋谷の路地裏にあるローカルな居酒屋によく行きます。当日、私が特別にご案内しますね！",
  translation: "좋은 질문이에요! 현지인들은 시부야 골목 안에 있는 로컬 이자카야에 자주 가요. 당일에 제가 특별히 안내해드릴게요!",
};

const INITIAL_MESSAGES = [
  {
    id: 1,
    type: "other",
    message: "こんにちは！予約ありがとう😊 待ち合わせ場所は渋谷駅ハチ公像前です！",
    translation: "안녕하세요! 예약 감사해요😊 대합장소는 시부야역 하치코 동상 앞입니다!",
    time: "오전 06:15",
  },
];

export default function Chat() {
  const { postId } = useParams();
  const post = postData.find((p) => p.postId === Number(postId));

  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [autoReplied, setAutoReplied] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const now = new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
    const newMsg = {
      id: Date.now(),
      type: "me",
      message: text.trim(),
      time: now,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputValue("");

    if (!autoReplied) {
      setAutoReplied(true);
      setTimeout(() => {
        const replyTime = new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
        setMessages((prev) => [
          ...prev,
          { ...AUTO_REPLY, id: Date.now(), time: replyTime },
        ]);
      }, 2000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  return (
    <PageWrapper>
      <ChatHeader
        name={post?.userId ?? "가이드"}
        subtitle={post?.title ?? ""}
        onFlag={() => setShowReport(true)}
      />

      <MessageList>
        {messages.map((msg) =>
          msg.type === "me" ? (
            <Mybubble key={msg.id} message={msg.message} time={msg.time} />
          ) : (
            <Otherbubble
              key={msg.id}
              message={msg.message}
              translation={msg.translation}
              time={msg.time}
              changeIcon={ChangeIcon}
            />
          )
        )}
        <div ref={bottomRef} />
      </MessageList>

      <BottomArea>
        <Quickreply onSelect={(text) => setInputValue(text)} />
        <Divider />
        <MessageInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onSend={() => sendMessage(inputValue)}
          onKeyDown={handleKeyDown}
          addIcon={AddIcon}
          sendIcon={SendIcon}
        />
      </BottomArea>

      <ReportSystem
        isOpen={showReport}
        onClose={() => setShowReport(false)}
      />
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 390px;
  height: 100dvh;
  margin: 0 auto;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;

const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const BottomArea = styled.div`
  background-color: #fff;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #F3F4F3;
`;