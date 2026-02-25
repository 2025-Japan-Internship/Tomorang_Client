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

export default function GuideTabCard({ guide }) {
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

/* ── Styled Components ── */

const PageBg = styled.div`
  /* 배경을 흰색으로 통일 */
  background-color: #fff; 
  min-height: 100%;
`;

const Card = styled.div`
  /* 고정 너비를 없애고 가로를 꽉 채워 배경과 합쳐지게 함 */
  width: 100%; 
  background: #fff;
  padding: 24px 20px 0 20px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; /* 이미지처럼 상단 정렬보다 중앙 정렬이 깔끔함 */
`;

const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Name = styled.span`
  color: #111;
  font-family: Pretendard;
  font-size: 20px; /* 이름 강조를 위해 크기 키움 */
  font-weight: 700;
  line-height: 1.2;
`;

const Bio = styled.span`
  color: #999; /* 조금 더 연한 회색으로 변경 */
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 500;
`;

const AnswerTime = styled.span`
  color: #B1DD89;
  font-family: Pretendard;
  font-size: 13px;
  font-weight: 500;
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  background: #f3f4f3; /* 빈 이미지일 때 색상 */
  flex-shrink: 0;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
  padding-bottom: 10px;
`;

const InterestTag = styled.span`
  background: #C5F598;
  color: #111111;
  font-size: 13px;
  font-weight: 500;
  padding: 6px 14px;
  border-radius: 20px;
`;

const LangTag = styled.div`
  display: flex;
  padding: 6px 12px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 50px;
  background: #111;
`;

const LangCode = styled.span`
  color: #C5F598;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.01px;
`;

const DotsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #F3F4F3; /* 더 연한 선으로 변경 */
  margin: 10px 0;
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 20px;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1;
`;

const VerticalLine = styled.div`
  width: 1px;
  height: 60px;
  background: #F3F4F3;
`;

const StatNum = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: #111;
`;

const StatLabel = styled.span`
  font-size: 14px;
  color: #999;
`;