import styled from "styled-components";

export default function ContentBlocks({ blocks }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <Wrapper>
      {blocks.map((block, idx) => {
        if (block.type === "text") {
          return <BlockText key={idx}>{block.value}</BlockText>;
        }
        if (block.type === "image") {
          return <BlockImage key={idx} src={block.value} alt={`content-${idx}`} />;
        }
        return null;
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 21px;
  padding: 0 16px 24px;
`;

const BlockText = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: #333;
  text-align: center;
`;

const BlockImage = styled.img`
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
`;