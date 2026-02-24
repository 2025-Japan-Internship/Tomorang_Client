{/* <InputField label="비밀번호"type="password"placeholder="비밀번호를 입력하세요"/> */}
import React from "react";
import styled from "styled-components";

function InputField({ label, type = "text", placeholder }) {
  return (
    <Wrapper>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput type={type} placeholder={placeholder} />
    </Wrapper>
  );
}

export default InputField;

/* 스타일 */

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledLabel = styled.label`
  color: #4E4E4E;
  font-size: 12px;
  font-weight: 700;
  margin-left: 16px;
`;

const StyledInput = styled.input`
  width: 348px;
  height: 56px;
  border: 1px solid #DADADA;
  border-radius: 12px;
  padding: 17px 20px;
  box-sizing: border-box;
  color: #ACACAC;
  font-family: Pretendard;
  font-size: 14px;

  &::placeholder {
    color: #BCBCBC;
  }

  &:focus {
    outline: 1px solid #94B872;
  }
`;
