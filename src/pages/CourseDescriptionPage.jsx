import React, { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import CourseDescription from "../components/CourseDescription";
import CourseTabMenu from "../components/mainComponents/CourseTabMenu";
import OtherCourse from "../components/OtherCourse";
import postData from "../data/postData.json";

export default function CourseDescriptionPage() { // ← allPosts prop 제거
  const { state } = useLocation();
  const post = state?.post;

  const [activeTab, setActiveTab] = useState("코스설명");

  const filteredOtherPosts = useMemo(() => {
    if (!post) return [];

    return postData.filter((item) =>
      String(item.userId) === String(post.userId) &&
      String(item.postId) !== String(post.postId)
    );
  }, [post]);

  if (!post) return <Error>데이터를 불러올 수 없습니다.</Error>;

  return (
    <PageWrapper>
      <Header coment={post.title} />
      
      <CourseDescription post={post} />
      
      <TabSection>
        <CourseTabMenu activeTab={activeTab} onTabChange={setActiveTab} />
      </TabSection>

      <ContentArea>
        {activeTab === "코스설명" && (
          <>
            <DetailSection>
              <DetailTitle>{post.title}</DetailTitle>
              <Divider />
              <DetailText>
                애니메이션과 게임의 성지, <strong>아키하바라</strong>에서<br />
                진짜 보물 같은 레트로 피규어를 찾고 싶다면?
              </DetailText>
              <DetailMainImg src={post.images[0]} />
            </DetailSection>

            {/* 🌟 가이드의 다른 코스 섹션 */}
            <OtherCourseSection>
               <OtherCourse otherPosts={filteredOtherPosts} />
            </OtherCourseSection>
          </>
        )}

        {activeTab === "리뷰" && <PlaceholderText>준비 중인 리뷰 페이지입니다. ⭐️</PlaceholderText>}
        {activeTab === "가이드" && <PlaceholderText>준비 중인 가이드 페이지입니다. 💡</PlaceholderText>}
      </ContentArea>
    </PageWrapper>
  );
}

// --- Styled Components ---

const PageWrapper = styled.div`
  width: 390px;
  margin: 0 auto;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;

const TabSection = styled.div`
  padding: 0 16px;
`;

const ContentArea = styled.div`
  flex: 1;
`;

const DetailSection = styled.div`
  text-align: center;
  padding: 24px 16px;
`;

const DetailTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Divider = styled.div`
  width: 1px;
  height: 40px;
  background: #111;
  margin: 0 auto 20px;
`;

const DetailText = styled.p`
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 30px;
  strong { font-weight: 800; color: #8ADF5C; }
`;

const DetailMainImg = styled.img`
  width: 100%;
  border-radius: 12px;
  margin-bottom: 20px;
`;

const OtherCourseSection = styled.div`
  border-top: 8px solid #f8f8f8; /* 섹션 구분선 */
`;

const PlaceholderText = styled.div`
  text-align: center;
  padding: 60px 0;
  color: #999;
`;

const Error = styled.div`
  width: 390px;
  margin: 100px auto;
  text-align: center;
`;