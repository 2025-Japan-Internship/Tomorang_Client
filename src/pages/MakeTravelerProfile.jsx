import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProgressBar from "../components/ProgressBar";
import StartComent from "../components/StartComent";
import NextButton from "../components/NextButton1";
import DefaultProfileIcon from "../assets/defaultProfile.svg"; // 기본 프로필 이미지
import ImageIcon from "../assets/imageIcon.svg";           // 카메라 아이콘
import RemoveIcon from "../assets/removeIcon.svg";

/**
 * 호출 방법:
 * <CreateProfile interests={["맛집", "애니메이션", "풍경"]} />
 * interests: 이전 페이지(SelectInterest)에서 선택한 관심사 배열
 * 
 *react-router 사용 시
navigate("/create-profile", { state: { interests: selected } });

// CreateProfile에서 받기
import { useLocation } from "react-router-dom";
const { state } = useLocation();
<CreateProfile interests={state?.interests ?? []} />

 */
function MakeTravelerProfile({ interests = [] }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [profileImage, setProfileImage] = useState(null);
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [tags, setTags] = useState(state?.interests ?? []);

  const fileInputRef = useRef(null);

  const handleImageClick = () => fileInputRef.current?.click();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfileImage(URL.createObjectURL(file));
  };

    const handleRemoveTag = (tag) => {
    if (tags.length <= 1) return; // 마지막 하나는 삭제 불가
    setTags((prev) => prev.filter((t) => t !== tag));
    };

  const isValid = nickname.trim().length > 0;

  const handleNext = () => {
    const payload = { profileImage, nickname, bio, interests: tags };
    console.log("백엔드 전송 payload:", payload);
    navigate("/welcome");
    // TODO: API 호출
  };

  return (
    <Wrapper>
      <Top>
        <ProgressBar step={4} />
      </Top>

      <Middle>
        <StartComent coment={"프로필을 만들어 볼까요?"} />
      </Middle>

      <Content>
        {/* 프로필 이미지 */}
        <ProfileArea>
          <ProfileCircle onClick={handleImageClick}>
            <ProfileImg
              src={profileImage || DefaultProfileIcon}
              alt="프로필"
              $isDefault={!profileImage}
            />
          </ProfileCircle>
          <CameraBtn onClick={handleImageClick}>
            <img src={ImageIcon} alt="사진 변경" width={24} height={24} />
          </CameraBtn>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </ProfileArea>

        {/* 닉네임 */}
        <FieldLabel>닉네임</FieldLabel>
        <Input
          type="text"
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          maxLength={20}
        />

        {/* 한마디 */}
        <FieldLabel>한마디</FieldLabel>
        <Input
          type="text"
          placeholder="안녕하세요 잘 부탁..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxLength={50}
        />

        {/* 관심사 태그 */}
        {tags.length > 0 && (
          <>
            <FieldLabel>관심사</FieldLabel>
            <TagRow>
              {tags.map((tag) => (
                <Tag key={tag}>
                    {tag}
                    <TagRemove src={RemoveIcon} alt="제거" onClick={() => handleRemoveTag(tag)} />
                </Tag>

              ))}
            </TagRow>
          </>
        )}
      </Content>

      <Bottom>
        <NextButton isValid={true} onClick={handleNext} />
      </Bottom>
    </Wrapper>
  );
}

/* ─── Styled Components ─── */

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px 0;
  box-sizing: border-box;
  font-family: "Pretendard", sans-serif;
`;

const Top = styled.div`
  display: flex;
  justify-content: center;
`;

const Middle = styled.div`
  padding: 2.9375rem 0 2.25rem;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 1.3125rem;
`;

const ProfileArea = styled.div`
  position: relative;
  width: 110px;
  height: 110px;
  align-self: center;
  margin-bottom: 1.5rem;
`;

const ProfileCircle = styled.div`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  border: 2px solid #C5F598;
  overflow: hidden;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CameraBtn = styled.div`
  position: absolute;
  bottom: -5px;
  right: -5px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #C5F598;
  border: 1.5px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  object-fit: cover;
  cursor: pointer;
`;

const FieldLabel = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
  color: #111;
  margin: 1.25rem 1rem 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  height: 52px;
  border-radius: 10px;
  border: 1px solid #DADADA;
  padding: 0 14px;
  box-sizing: border-box;
  font-family: "Pretendard", sans-serif;
  font-size: 0.875rem;
  color: #111;
  outline: none;

  &::placeholder {
    color: #ACACAC;
  }

  &:focus {
    border-color: #B1DD89;
  }
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 0.25rem;
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 12px 10px 24px;
  border-radius: 999px;
  border: 1px solid #4E4E4E;
  font-size: 0.875rem;
  font-weight: 500;
  color: #111;
  background: #fff;
`;

const TagRemove = styled.img`
  width: 6.6px;  /* 원하는 크기 */
  height: 6.6px;
  padding: 9.2px;
  cursor: pointer;
  
  &:active {
    opacity: 0.7; /* 클릭 시 살짝 투명 */
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: center;
  padding: 1.5rem 1.3125rem 0;
`;

export default MakeTravelerProfile;