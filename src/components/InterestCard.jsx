import styled from "styled-components";
import experienceImage from "../assets/interestImages/experienceBackground.svg"
import activityImage from "../assets/interestImages/activityBackground.svg"
import healingImage from "../assets/interestImages/healingBackground.svg"
import shopingImage from "../assets/interestImages/shopingBackground.svg"
import viewingImage from "../assets/interestImages/viewingBackground.svg"
import sightImage from "../assets/interestImages/sightBackground.svg"
import animationImage from "../assets/interestImages/animationBackground.svg"
import restaurantImage from "../assets/interestImages/restaurantBackground.svg"

const CARD = 138; // px

// 스크린샷 기준 절대 좌표 (left, top) — 카드 중심 기준
// 전체 그리드 너비 ~360px 기준
const ITEMS = [
  { id: "체험",      label: "체험",       image: experienceImage, left: 106, top: -10   },
  { id: "힐링",      label: "힐링",       image: healingImage, left: 12,   top: 103  },
  { id: "풍경",      label: "풍경",       image: sightImage, left: 199, top: 102  },
  { id: "액티비티",  label: "액티비티",   image: activityImage, left: 109, top: 215 },
  { id: "애니메이션",label: "애니메이션", image: animationImage, left: 17,   top: 327 },
  { id: "쇼핑",      label: "쇼핑",       image: shopingImage, left: 204, top: 330 },
  { id: "맛집",      label: "맛집",       image: restaurantImage, left: 112, top: 441 },
  { id: "탐방",      label: "탐방",       image: viewingImage, left: 19,   top: 552 },
];

const GRID_HEIGHT = 480 + CARD; // 마지막 top + 카드 높이

function InterestSelect({ selected = [], onToggle }) {
  return (
    <Grid>
      {ITEMS.map(({ id, label, image, left, top }) => {
        const isSelected = selected.includes(id);
        return (
          <Card
            key={id}
            style={{ left, top }}
            $selected={isSelected}
            $image={image}
            onClick={() => onToggle(id)}
          >
            {/* 이미지 레이어 — 선택 시 숨김 */}
            {image && !isSelected && (
              <>
                <ImgLayer src={image} alt={label} />
                 <Overlay />
              </>
            )}
            <Label $light={!!image && !isSelected}>{label}</Label>
          </Card>
        );
      })}
    </Grid>
  );
}

/* ─── Styled Components ─── */

const Grid = styled.div`
  position: relative;
  width: 100%;
  height: ${GRID_HEIGHT}px;
`;

const Card = styled.div`
  position: absolute;
  width: ${CARD}px;
  height: ${CARD}px;
  border-radius: 40px;
  transform: rotate(-45deg);
  overflow: hidden;
  cursor: pointer;
  background-color: ${({ $selected, $image }) =>
    $selected ? "#C5F598" : $image ? "#aaa" : "#C5F598"};

  display: flex;
  align-items: center;
  justify-content: center;

  transition: background-color 0.2s ease;

  /* 선택 시 드롭쉐도우 블러 15 스프레드 0 */
  box-shadow: ${({ $selected }) =>
    $selected ? "0px 0px 15px 0px rgba(197, 245, 152, 0.3)" : "none"};
    
  /* &:active {
    transform: rotate(-45deg) scale(0.95);
  }
    */
`;

const ImgLayer = styled.img`
  position: absolute;
  inset: -21%;
  width: 142%;
  height: 142%;
  object-fit: cover;
  transform: rotate(45deg);
  transform-origin: center center;
`;

/* 이미지 위 반투명 어두운 오버레이 */
const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
`;

const Label = styled.span`
  position: relative;
  z-index: 1;
  transform: rotate(45deg);
  font-family: "Pretendard", sans-serif;
  font-size: 0.875rem;
  font-weight: ${({ $light }) => ($light ? "400": "600")};
  color: ${({ $light }) => ($light ? "#fff" : "#111")};
  text-align: center;
  white-space: pre-wrap;
  word-break: keep-all;
  line-height: 1.3;
`;

export default InterestSelect;