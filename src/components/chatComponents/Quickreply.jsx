import React from "react";
import styled from "styled-components";

const DEFAULT_REPLIES = [
  "여기 사람들은 어디가서 먹어요?",
  "오늘 일정 확인하고 싶어요",
  "몇 시에 만나요?",
  "어디서 만나요?",
  "준비물이 있나요?",
];

export default function QuickReply({ replies = DEFAULT_REPLIES, onSelect }) {
  return (
    <Row>
      {replies.map((text, i) => (
        <Button key={i} onClick={() => onSelect && onSelect(text)}>
          {text}
        </Button>
      ))}
    </Row>
  );
}

const Row = styled.div`
  display: flex;
  gap: 8px;
  padding: 10px 16px;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const Button = styled.button`
  flex-shrink: 0;
  border-radius: 60px;
  border: 1px solid #B1DD89;
  background: #C5F598;
  padding: 4px 14px;
  cursor: pointer;
  white-space: nowrap;
  color: #588F23;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 500;
  line-height: 22px;
`;