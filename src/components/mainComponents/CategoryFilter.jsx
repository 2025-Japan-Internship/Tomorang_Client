import { useState } from "react";
import styled from "styled-components";
import AnimeIcon from "../../assets/categoryIcons/animation.svg";
import FoodIcon from "../../assets/categoryIcons/food.svg";
import PhotoIcon from "../../assets/categoryIcons/photo.svg";
import ShopingIcon from "../../assets/categoryIcons/shoping.svg";
import ViewIcon from "../../assets/categoryIcons/view.svg";

const CATEGORIES = [
  { icon: AnimeIcon,   label: "애니메이션", id: "anime" },
  { icon: FoodIcon,    label: "음식",       id: "food" },
  { icon: ViewIcon,    label: "풍경",       id: "nature" },
  { icon: PhotoIcon,   label: "사진",       id: "photo" },
  { icon: ShopingIcon, label: "쇼핑",       id: "shopping" },
];

const Wrapper = styled.div`
  width: 391px;
  background: #f3f4f3;
  margin-left: -1px;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
`;

const Title = styled.div`
  width: 180px;
  margin-left: 21px;
  padding: 12px 8px;
  padding-top: 20px;
  font-size: 18px;
  font-weight: 700;
  color: #111;
  line-height: 1.4;
  white-space: nowrap;
`;

const IconRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 21px;
  margin-top: 0;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const Circle = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 95px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: ${({ $active }) => ($active ? "2px solid #4CAF50" : "none")};
`;

const IconImg = styled.img`
  width: 38px;
  height: 30px;
  object-fit: contain;
`;

const Label = styled.span`
  width: 56px;
  font-size: 11px;
  color: #4e4e4e;
  text-align: center;
  font-weight: ${({ $active }) => ($active ? 700 : 400)};
  white-space: nowrap;
`;

export default function CategoryFilter({ onSelect }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (id) => {
    const next = selected === id ? null : id;
    setSelected(next);
    onSelect?.(next);
  };

  return (
    <Wrapper>
      <Title>취향에 맞춰 찾아볼까요</Title>
      <IconRow>
        {CATEGORIES.map((cat) => {
          const isActive = selected === cat.id;
          return (
            <Item key={cat.id} onClick={() => handleSelect(cat.id)}>
              <Circle $active={isActive}>
                <IconImg src={cat.icon} alt={cat.label} />
              </Circle>
              <Label $active={isActive}>{cat.label}</Label>
            </Item>
          );
        })}
      </IconRow>
    </Wrapper>
  );
}