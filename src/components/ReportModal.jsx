import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

// --- Animations ---
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const slideUp = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

const slideDown = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(100%); }
`;

// --- Styled Components ---

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(18, 20, 25, 0.60);
  backdrop-filter: blur(3px);
  z-index: 999;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  /* 닫힐 때 애니메이션 처리를 위해 단순 transition보다 state 연동 추천 */
  animation: ${props => props.isClosing ? fadeOut : fadeIn} 0.3s ease-in-out forwards;
`;

const Modal = styled.div`
  width: 390px;
  height: 508px;
  background: #FFF;
  border-radius: 24px 24px 0 0;
  padding-top: 56px; /* 엑스버튼 공간 확보 */
  position: relative;
  box-shadow: 0px -4px 20px rgba(0, 0, 0, 0.1);
  animation: ${props => props.isClosing ? slideDown : slideUp} 0.4s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 24px; right: 24px;
  width: 25px; height: 25px;
  background: #F1F1F1; /* 배경색 예시 */
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 12.241px;
    height: 12.241px;
    /* transform: rotate(-45deg); // 이미지가 대각선이 아니라면 사용 */
  }
`;

const TitleArea = styled.div`
  padding: 0 24px 24px 24px;
  h2 {
    color: #111;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.018px;
    margin: 0 0 8px 0;
  }
  p {
    color: #ACACAC;
    font-size: 14px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0.3px;
    margin: 0;
  }
`;

const ReasonItem = styled.div`
  width: 390px;
  height: 60px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  box-sizing: border-box;
  
  /* 첫 번째 부적절한 내용 배경색 적용 */
  background: ${props => props.isFirst ? '#C5F598' : 'transparent'};

  span {
    color: #111;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: -0.014px;
  }

  .arrow {
    display: flex;
    width: 12px;
    height: 12px;
    padding: 5px;
    justify-content: center;
    align-items: center;
  }
`;

// 토스트 팝업 (상단 중앙)
const Toast = styled.div`
  position: fixed;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  width: 348px;
  height: 72px;
  background: #C5F598;
  border-radius: 82px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.4s ease-out, ${fadeOut} 0.4s ease-in 2.6s forwards;

  p {
    width: 199px;
    color: #111;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    line-height: 19px;
    margin: 0;
  }
`;

// --- Main Component ---

const ReportSystem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const reasons = [
    "부적절한 내용 또는 사진",
    "허위 정보/ 과장된 설명",
    "불쾌한 언행",
    "사기 의심",
    "안전 문제 우려",
    "기타"
  ];

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 400); // 애니메이션 시간과 동일하게 설정
  };

  const handleReportAction = () => {
    // 1. 창 닫기 애니메이션 시작
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      // 2. 창이 완전히 닫힌 후 토스트 띄우기
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 400);
  };

  return (
    <>
      <button onClick={handleOpen} style={{ margin: '50px' }}>신고하기 테스트 버튼</button>

      {isOpen && (
        <Overlay isClosing={isClosing} onClick={handleClose}>
          <Modal isClosing={isClosing} onClick={(e) => e.stopPropagation()}>
            <CloseBtn onClick={handleClose}>
              <img src="../asset/close.png" alt="close" />
            </CloseBtn>
            
            <TitleArea>
              <h2>신고 사유 선택</h2>
              <p>이 게시물을 신고하는 사유를 선택해주세요.</p>
            </TitleArea>

            {reasons.map((text, index) => (
              <ReasonItem 
                key={index} 
                isFirst={index === 0} 
                onClick={handleReportAction}
              >
                <span>{text}</span>
                <div className="arrow">
                  <img src="../asset/arrow_right.png" alt="arrow" />
                </div>
              </ReasonItem>
            ))}
          </Modal>
        </Overlay>
      )}

      {showToast && (
        <Toast>
          <p>신고가 정상적으로 접수되었습니다. 해당가이드는 숨김처리 됩니다.</p>
        </Toast>
      )}
    </>
  );
};

export default ReportSystem;