import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LogoIcon from "../assets/logoIcon.svg";

function WelcomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/main"); // 다음 페이지 미구현
    }, 3000);

    return () => clearTimeout(timer); // 언마운트 시 클린업
  }, []);


  return (
    <Wrapper>
      <CenterBox>
        <Logo src={LogoIcon} alt="로고" />
        <Title>가입을 축하드려요</Title>
        <SubText>함께 여행 할 수 있어 기뻐요</SubText>
      </CenterBox>
    </Wrapper>
  );
}

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: #C5F598;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Pretendard", sans-serif;
`;

const CenterBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  animation: ${fadeUp} 0.6s ease forwards;
`;

const Logo = styled.img`
  width: 4.8843rem;
  height: auto;
  margin-bottom: 4px;
`;

const Title = styled.h1`
  font-size: 1.3125rem;
  font-weight: 700;

  color: #111;
  margin: 0;
  letter-spacing: 0.02rem;
`;

const SubText = styled.p`
  font-size: 0.875rem;
  font-weight: 400;
  color: #444;
  margin: 0;
  letter-spacing: -0.02rem;
`;

export default WelcomePage;