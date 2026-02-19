import styled from "styled-components";
import NextButton from "../components/NextButton1";

function SelectLanguage() {
  return (
    <Wrapper>
      <Title>언어 선택 페이지</Title>
      <NextButton isValid={true} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;

`;


const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

export default SelectLanguage;
