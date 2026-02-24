import React, { useState } from "react";
import styled from "styled-components";

function MailInput({ label, onChange }) {
  const [local, setLocal] = useState("");
  const [domain, setDomain] = useState("");

  const handleLocal = (e) => {
    const newLocal = e.target.value;
    setLocal(newLocal);
    onChange({ target: { value: newLocal && domain ? newLocal + "@" + domain : "" } });
  };
  
  const handleDomain = (e) => {
    const newDomain = e.target.value;
    setDomain(newDomain);
    onChange({ target: { value: local && newDomain ? local + "@" + newDomain : "" } });
  };

  return (
    <Wrapper>
      <StyledLabel>{label}</StyledLabel>
      <InputRow>
        <HalfInput
          type="text"
          placeholder="이메일을 입력하세요"
          value={local}
          onChange={handleLocal}
        />
        <At>@</At>
        <DomainInput
          type="text"
          placeholder="gmail.com"
          value={domain}
          onChange={handleDomain}
        />
      </InputRow>
    </Wrapper>
  );
}

export default MailInput;

const Wrapper = styled.div`
  margin-left:21px;
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

const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
`;

const HalfInput = styled.input`
  width: 160px;
  height: 56px;
  border: 1px solid #DADADA;
  border-radius: 12px;
  padding: 17px 20px;
  box-sizing: border-box;
  font-size: 14px;

  &::placeholder {
    color: #BCBCBC;
  }

  &:focus {
    outline: 1px solid #C5F598;
  }
`;

const DomainInput = styled(HalfInput)`
  width: 140px;
`;

const At = styled.span`
  font-size: 16px;
  color: #8E8E8E;
`;