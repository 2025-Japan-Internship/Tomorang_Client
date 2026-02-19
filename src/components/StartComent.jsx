/*호출방법 <StartComent coment={'처음만났네요,<br/>반가워요'}/> */

import styled from "styled-components";
import Logo from "../assets/logoIcon.svg";

function StartComent({coment}) {
  return (
    <Wrapper>
      <Image src={Logo} alt="로고" />
      <TextWrapper>
        <p dangerouslySetInnerHTML={{ __html: coment }} />
      </TextWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column; /* 위-아래 배치 */
  gap: 1.0031rem; /* 로고와 글 사이 간격 */
  margin-left: 1.8125rem;
`;

const Image = styled.img`
  width: 2.2956rem;
  height: auto;
`;

const TextWrapper = styled.div`
  p {
    font-family: 'Pretendard', sans-serif;
    font-weight: 700;
    font-size: 28px;
    line-height: 100%;
    color: #000;
  }
`;

export default StartComent;
