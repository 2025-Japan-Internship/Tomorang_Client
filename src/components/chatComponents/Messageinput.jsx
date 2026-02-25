import React from "react";
import styled from "styled-components";

export default function MessageInput({ value, onChange, onSend, onKeyDown, addIcon, sendIcon }) {
  return (
    <Wrapper>
      <CircleBtn>
        <img src={addIcon} alt="add" width={20} height={20} />
      </CircleBtn>
      <InputBox
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="메세지 입력"
      />
      <CircleBtn onClick={onSend}>
        <img src={sendIcon} alt="send" width={20} height={20} />
      </CircleBtn>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px 24px;
  background: #fff;
`;

const CircleBtn = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 81px;
  border: 1px solid #DADADA;
  background: #F3F4F3;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  padding: 0;
`;

const InputBox = styled.input`
  flex: 1;
  height: 42px;
  border-radius: 81px;
  border: 1px solid #DADADA;
  background: #F3F4F3;
  padding: 0 16px;
  outline: none;
  color: #111;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 500;
  line-height: 22px;
  &::placeholder { color: #ACACAC; }
  box-sizing: border-box;
`;