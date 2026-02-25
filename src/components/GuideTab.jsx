import React from "react";
import styled from "styled-components";

const LEVEL_MAP = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
};

function LevelDots({ level }) {
  const filled = LEVEL_MAP[level] || 1;
  return (
    <DotsRow>
      {[0, 1, 2].map((i) => (
        <svg key={i} width="5" height="5" viewBox="0 0 5 5">
          <circle cx="2.5" cy="2.5" r="2.5" fill={i < filled ? "#C5F598" : "#D9D9D9"} />
        </svg>
      ))}
    </DotsRow>
  );
}

export default function GuideTab({ guide }) {
  return (
    <PageBg>
      <Card>
        {/* 상단: 이름/소개/응답시간 + 프로필 이미지 */}
        <TopRow>
          <InfoGroup>
            <Name>{guide.nickname}</Name>
            <Bio>{guide.bio}</Bio>
            <AnswerTime>{guide.answertime}</AnswerTime>
          </InfoGroup>
          <Avatar src={guide.profileImage} alt="profile" />
        </TopRow>

        {/* 관심사 태그 */}
        <TagRow>
          {guide.interests.map((interest) => (
            <InterestTag key={interest}>#{interest}</InterestTag>
          ))}
        </TagRow>

        {/* 언어 태그 */}
        <TagRow>
          {guide.languages.map((lang) => (
            <LangTag key={lang.code}>
              <LangCode>{lang.code}</LangCode>
              <LevelDots level={lang.level} />
            </LangTag>
          ))}
        </TagRow>

        {/* 구분선 */}
        <Divider />

        {/* 통계 */}
        <StatsRow>
          <StatItem>
            <StatNum>{guide.likeCount}개</StatNum>
            <StatLabel>좋아요</StatLabel>
          </StatItem>
          <VerticalLine />
          <StatItem>
            <StatNum>{guide.postIds.length}개</StatNum>
            <StatLabel>코스</StatLabel>
          </StatItem>
          <VerticalLine />
          <StatItem>
            <StatNum>{guide.rating.toFixed(1)}점</StatNum>
            <StatLabel>리뷰</StatLabel>
          </StatItem>
        </StatsRow>
      </Card>
    </PageBg>
  );
}

/* ── Styled Components ── */

const PageBg = styled.div`
  background-color: #F3F4F3;
  padding: 12px 0 20px;
  min-height: 100%;
`;

const Card = styled.div`
  width: 348px;
  border-radius: 12px;
  background: #fff;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-sizing: border-box;
  margin: 0 auto;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Name = styled.span`
  color: #111;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px; /* 137.5% */
  letter-spacing: 0.3px;
`;

const Bio = styled.span`
  color: #ACACAC;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 157.143% */
  letter-spacing: 0.3px;
`;

const AnswerTime = styled.span`
  color: #B1DD89;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 183.333% */
  letter-spacing: 0.3px;
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  background: #d9d9d9;
  flex-shrink: 0;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const InterestTag = styled.span`
  background: #C5F598;
  color: #111111;
  font-size: 12px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 20px;
`;

const LangTag = styled.div`
  display: flex;
  padding: 5px 8px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  border-radius: 50px;
  background: #111;
`;

const LangCode = styled.span`
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1px;
`;

const DotsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #F0F0F0;
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex: 1;
`;

const VerticalLine = styled.div`
  width: 1px;
  height: 80px;
  background: #F3F4F3;
`;

const StatNum = styled.span`
  font-size: 22px;
  font-weight: 700;
  color: #111;
`;

const StatLabel = styled.span`
  font-size: 12px;
  color: #999;
`;