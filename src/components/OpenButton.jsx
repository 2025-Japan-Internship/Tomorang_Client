// const handleOpen = () => {
//   console.log("상품정보 펼쳐보기 클릭");
// };
// <OpenButton onClick={handleOpen}>상품정보 펼쳐보기</OpenButton>
import styled from "styled-components";
import OpenArrow from "../assets/openarrow.svg";

function OpenButton({ children, onClick }) {
  return (
    <Button onClick={onClick}>
      {children}
      <OpenArrowImg src={OpenArrow} alt="open" />
    </Button>
  );
}

const Button = styled.button`
  width: 100%;
  max-width: 348px;
  height: 56px;
  border-radius: 12px;
  border: 1px solid #C5F598;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  background-color: #FFF;
  color: #C5F598; 
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;

  &:active {
    border: 1px solid #000;
  }
`;
const OpenArrowImg  = styled.img`
  width: 24px;
  height: 24px;
`;

export default OpenButton;