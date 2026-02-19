/*호출방법 <NextButton isValid={true} true: 버튼 활성화 false: 비활성화*/

import styled from "styled-components";

function NextButton({ isValid }) {
  return (
    <Button disabled={!isValid}>
      다음
    </Button>
  );
}

const Button = styled.button`
  width: 100%;
  max-width: 348px;

  height: 56px;
  border-radius: 12px;
  border: none;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ disabled }) =>
    disabled ? "#EDFCDF" : "#C5F598"};

  color: ${({ disabled }) =>
    disabled ? "#FFFFFF" : "#111111"};

  font-family: "Inter", sans-serif;
  font-weight: midium;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0%;

  
  ${({ disabled }) =>
    !disabled &&
    `
      &:active {
        border: 1px solid #000;
      }
    `}
`;

export default NextButton;
