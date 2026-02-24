import styled from "styled-components";

export default function Section({ title, children, showMore = true, onMore }) {
  return (
    <Wrapper>
      <Header>
        <Title>{title}</Title>
        {showMore && (
          <MoreBtn onClick={onMore}>더보기 ›</MoreBtn>
        )}
      </Header>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 24px 0px 12px 21px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
`;

const Title = styled.span`
  font-family: Pretendard, sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #111;
  letter-spacing: -0.1%;
  line-height: 100%;
  padding-left: 8px;
`;

const MoreBtn = styled.button`
  font-family: Pretendard, sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #4e4e4e;
  letter-spacing: -0.1%;
  line-height: 100%;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 21.5px 0 0;
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
`;