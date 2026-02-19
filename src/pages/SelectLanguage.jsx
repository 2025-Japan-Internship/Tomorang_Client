import styled from "styled-components";
import NextButton from "../components/NextButton1";
import ProgressBar from "../components/ProgressBar";
import StartComent from "../components/StartComent";

function SelectLanguage() {
  return (
    <Wrapper>
      <Top>
        <ProgressBar step={2} />
      </Top>

      <Middle>
        <Greeting>
          <StartComent coment={'처음만났네요,<br/>반가워요'} />
        </Greeting>
        <Title>하하</Title>
      </Middle>

      <Bottom>
        <NextButton isValid={true} />
      </Bottom>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 95vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 상/중/하 배치 */
  padding: 24px 0px 24px 0px;
`;

const Top = styled.div`
  display: flex;
  justify-content: center; /* 상단 가로 중앙 */
`;

const Middle = styled.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  align-items: flex-start; /* 왼쪽 정렬 */
  justify-content: flex-start; /* 위쪽에 붙이기 */
  gap: 16px;
  flex: 1; /* Middle이 남은 공간 다 차지하게 */
  padding-top: 2.9375rem; /* optional: 위쪽 여백 조금 줌 */
`;


const Greeting = styled.div`
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: center; /* 하단 가로 중앙 */
`;

export default SelectLanguage;
