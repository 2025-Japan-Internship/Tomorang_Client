/*
호출방법
  const handleNext = () => {
    navigate("/make-traveler-profile", { state: { interests: selected } });
  };
*/

/* <ReserveButton isValid={true} onClick={handleNext} /> */
import styled from "styled-components";

function ReserveButton({ isValid, onClick }) {
  return (
    <Button disabled={!isValid} onClick={isValid ? onClick : undefined}>
      예약하기
    </Button>
  );
}

const Button = styled.button`
  width: 100%;
  max-width: 348px;
  height: 56px;
  border-radius: 12px;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #C5F598;

  color: #111;

  font-family: "Pretendard", sans-serif;
  font-weight: 500;
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

export default ReserveButton;