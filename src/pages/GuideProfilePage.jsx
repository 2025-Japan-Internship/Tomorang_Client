import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import GuideTabCard from "../components/GuideTabCard";
import GuideTabMenu from "../components/GuideTabMenu";
import PostCardList from "../components/postCardList";
import ReviewCard from "../components/ReviewCard1";
import guideData from "../data/guideData.json";
import postData from "../data/postData.json";
import reviewData from "../data/reviews.json";

export default function GuideProfilePage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("코스");

  const guide = guideData.find((g) => String(g.id) === String(id));

  if (!guide) {
    return (
      <ErrorBox>
        <p>가이드 정보를 찾을 수 없습니다.</p>
        <p style={{ fontSize: 12, color: "#999" }}>URL id: {id}</p>
      </ErrorBox>
    );
  }

  const guidePosts = postData.filter((p) => guide.postIds.includes(p.postId));
  const guideReviews = reviewData.filter((review) =>
    guide.postIds.includes(review.postId)
  );

  return (
    <PageWrapper>
      <Header coment={guide.nickname} />

      <GuideTabCard guide={guide} />

      <TabSection>
        <GuideTabMenu activeTab={activeTab} onTabChange={setActiveTab} />
      </TabSection>

      {/* $activeTab prop을 넘겨서 '리뷰' 탭일 때만 배경을 회색으로 만듭니다 */}
      <ContentArea $activeTab={activeTab}>
        {activeTab === "코스" && (
          <ListWrapper>
            {guidePosts.length > 0 ? (
              guidePosts.map((post) => (
                <PostCardList key={post.postId} post={post} />
              ))
            ) : (
              <PlaceholderText>등록된 코스가 없습니다. 🥲</PlaceholderText>
            )}
          </ListWrapper>
        )}

        {activeTab === "리뷰" && (
          <ListWrapper>
            {guideReviews.length > 0 ? (
              guideReviews.map((review) => (
                <ReviewCard key={review.reviewId} review={review} />
              ))
            ) : (
              <PlaceholderText>아직 작성된 리뷰가 없습니다. ⭐</PlaceholderText>
            )}
          </ListWrapper>
        )}

        {activeTab === "정보" && (
          <InfoWrapper>
            <InfoSection>
              <SectionTitle>가이드 설명</SectionTitle>
              <SectionContent>{guide.description}</SectionContent>
            </InfoSection>
            
            <InfoSection>
              <SectionTitle>추가 정보</SectionTitle>
              <AddInfoList>
                <AddInfoItem>가입일: {guide.joinedAt}</AddInfoItem>
                <AddInfoItem>국적: {guide.nationality}</AddInfoItem>
              </AddInfoList>
            </InfoSection>
          </InfoWrapper>
        )}
      </ContentArea>
    </PageWrapper>
  );
}

/* ── Styled Components ── */

const PageWrapper = styled.div`
  width: 390px;
  margin: 0 auto;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const TabSection = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 0 0;
  background-color: #fff;
  border-bottom: 1px solid #EAEAEA;
`;

const ContentArea = styled.div`
  flex: 1;
  /* 🔥 오직 '리뷰' 탭일 때만 회색(#F3F4F3) 배경, 나머지는 모두 흰색(#fff) */
  background-color: ${({ $activeTab }) => ($activeTab === "리뷰" ? "#F3F4F3" : "#fff")}; 
  padding-bottom: 40px;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0;
  gap: 12px;
`;

const PlaceholderText = styled.div`
  text-align: center;
  padding: 60px 0;
  color: #999;
  font-size: 14px;
`;

const ErrorBox = styled.div`
  width: 390px;
  margin: 100px auto;
  text-align: center;
  line-height: 1.6;
`;

/* ── 정보 탭 전용 Styled Components ── */

const InfoWrapper = styled.div`
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.h3`
  color: #111;
font-feature-settings: 'liga' off, 'clig' off;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: 22px; /* 137.5% */
`;

const SectionContent = styled.p`
  color: #4E4E4E;
font-feature-settings: 'liga' off, 'clig' off;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 19px; /* 135.714% */
letter-spacing: 0.3px;
`;

const AddInfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AddInfoItem = styled.div`
  font-size: 15px;
  color: #555;
`;