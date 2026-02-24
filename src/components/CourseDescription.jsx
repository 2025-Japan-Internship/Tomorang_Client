import { useState } from "react";
import styled from "styled-components";
import Greenstar from "../assets/greenstar.svg";
import Graystar from "../assets/graystar.svg";
import Flag from "../assets/flag.svg";
import Heart from "../assets/heart.svg";
import Filledheart from "../assets/fillheart.svg";

export default function CourseDescription({ post }) {
  const [liked, setLiked] = useState(false);
  const [flagged, setFlagged] = useState(false);

  if (!post) return null;

  const originalPriceNum = Number(post.price.replace(/,/g, ""));
  const discountedPrice = post.discountRate > 0
    ? Math.round(originalPriceNum * (1 - post.discountRate / 100))
    : originalPriceNum;

  const renderStars = (rating) => {
    const filledCount = Math.floor(rating);
    return Array.from({ length: 5 }, (_, i) => (
      <StarImg key={i} src={i < filledCount ? Greenstar : Graystar} alt="star" />
    ));
  };

  const subImages = post.images.slice(1);
  const hasMoreThanThree = subImages.length >= 4;
  

  const visibleSubImages = subImages.slice(0, 4); 
  const displayExtraCount = subImages.length - 3; 

  return (
    <Card>
      <MainImageWrapper>
        <MainImage src={post.images[0]} alt={post.title} />
        <FlagButton onClick={() => setFlagged(!flagged)}>
          <FlagIcon src={flagged ? Greenstar : Flag} alt="flag" />
        </FlagButton>
      </MainImageWrapper>

      <Body>
        <TitleRow>
          <TitleGroup>
            <Title>{post.title}</Title>
            <Subtitle>{post.subtitle}</Subtitle>
          </TitleGroup>
          <SaveButton onClick={() => setLiked(!liked)}>
            <HeartIcon src={liked ? Filledheart : Heart} alt="heart" />
            <SaveText>저장</SaveText>
          </SaveButton>
        </TitleRow>

        <PriceRatingRow>
          <PriceGroup>
            {post.discountRate > 0 && (
              <OriginalPrice>{originalPriceNum.toLocaleString()}원</OriginalPrice>
            )}
            <CurrentPriceArea>
              {post.discountRate > 0 && <SaleLabel>SALE</SaleLabel>}
              <CurrentPrice>{discountedPrice.toLocaleString()}원</CurrentPrice>
            </CurrentPriceArea>
          </PriceGroup>

          <RatingGroup>
            <Stars>{renderStars(post.rating)}</Stars>
            <RatingNumber>{post.rating.toFixed(1)}</RatingNumber>
          </RatingGroup>
        </PriceRatingRow>
      </Body>


      <SubImageRow>
        {visibleSubImages.map((img, idx) => (
          <SubImageWrapper key={idx}>
            <SubImage src={img} alt={`sub-${idx}`} />
            {idx === 3 && hasMoreThanThree && (
              <ExtraOverlay>
                {displayExtraCount}+
              </ExtraOverlay>
            )}
          </SubImageWrapper>
        ))}
      </SubImageRow>
    </Card>
  );
}

// --- Styled Components ---

const Card = styled.div`
  width: 390px;
  margin: 0 auto;
  padding: 0 24px 24px 24px;
  background: #fff;
  font-family: "Pretendard", sans-serif;
  box-sizing: border-box;
`;

const MainImageWrapper = styled.div`
  position: relative;
  width: 345px;
  height: 220px;
  margin-bottom: 21px;
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`;

const FlagButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #fff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const FlagIcon = styled.img`
  width: 11.667px;
  height: 14px;
`;

const Body = styled.div`
  margin-bottom: 20px;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.h2`
    color: #111;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 122.222% */
`;

const Subtitle = styled.p`
    color: #4E4E4E;
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 183.333% */
`;

const SaveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 20px;
  justify-content: center;
  padding: 6px 14px;
  cursor: pointer;
`;

const HeartIcon = styled.img`
  width: 12px;
  height: 11px;
`;

const SaveText = styled.span`
    color: #4E4E4E;
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px; /* 183.333% */
letter-spacing: -0.7px;
`;

const PriceRatingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const PriceGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const OriginalPrice = styled.span`
  font-size: 12px;
  color: #ccc;
  text-decoration: line-through;
  margin-bottom: 2px;
`;

const CurrentPriceArea = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const SaleLabel = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #8ADF5C;
`;

const CurrentPrice = styled.span`
  font-size: 20px;
  font-weight: 800;
  color: #111;
`;

const RatingGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding-bottom: 4px;
`;

const Stars = styled.div`
  display: flex;
  gap: 1px;
`;

const StarImg = styled.img`
  width: 14px;
  height: 14px;
`;

const RatingNumber = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

const SubImageRow = styled.div`
  display: flex;
  gap: 16px;
`;

const SubImageWrapper = styled.div`
  position: relative;
  flex: 1;
  aspect-ratio: 1 / 1;
  border-radius: 12px;
  overflow: hidden;
`;

const SubImage = styled.img`
  width: 76px;
  height: 76px;
  object-fit: cover;
`;

const ExtraOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(59, 53, 53, 0.70);
  /* backdrop-filter: blur(2px);  */
  color: #FFF;  
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px; /* 137.5% */
  display: flex;
  align-items: center;
  justify-content: center;
`;