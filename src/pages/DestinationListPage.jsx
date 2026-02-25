import { useState, useMemo } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import postdata from "../data/postData.json";
import PostCardList from "../components/postCardList.jsx"

export default function DestinationListPage() {
  const { state } = useLocation();
  const lang = "ko";

  const [filter, setFilter] = useState({
    sort: "추천순",
    category: "애니메이션",
  });

  const cityName = state?.cityName?.[lang]?.cityName ?? "여행지";
  const tags = state?.tags?.[lang] ?? [];
  const image = state?.image ?? "";

  const handleFilterChange = (data) => {
    setFilter(data);
  };


  const filteredPosts = useMemo(() => {
    const filtered = postdata.filter((post) =>
      post.tag?.ko?.includes(filter.category)
    );

    return [...filtered].sort((a, b) => {
      if (filter.sort === "추천순") {
        return b.rating - a.rating;
      }

      if (filter.sort === "인기순") {
        return b.reviewCount - a.reviewCount;
      }

      if (filter.sort === "가격순") {
        const priceA = Number(a.price.replace(/,/g, ""));
        const priceB = Number(b.price.replace(/,/g, ""));
        return priceA - priceB;
      }

      return 0;
    });
  }, [filter]);

  return (
    <PageWrapper>
      <Header coment={cityName} />

      <ImageSection>
        <MainImage src={image} alt={cityName} />
        <Gradient />
        <ImageText>
          <TagRow>
            {tags.map((tag) => (
              <Tag key={tag}>#{tag}</Tag>
            ))}
          </TagRow>
          <Question>특색있는 음식 좋아하세요?</Question>
        </ImageText>
      </ImageSection>

      <FilterBar onFilterChange={handleFilterChange} />

      <ListSection>
        {filteredPosts.map((post) => (
          <PostCardList key={post.postId} post={post} />
        ))}
      </ListSection>
    </PageWrapper>
  );
}


const PageWrapper = styled.div`
  width: 390px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;

const ImageSection = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  overflow: hidden;
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Gradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 50%,
    rgba(0, 0, 0, 0.7) 100%
  );
`;

const ImageText = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  z-index: 2;
`;

const TagRow = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  font-size: 14px;
  opacity: 0.9;
`;

const Question = styled.div`
  font-size: 20px;
  font-weight: bold;
  line-height: 1.3;
`;

const ListSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 16px;
  align-items: center;
  flex: 1;
`;