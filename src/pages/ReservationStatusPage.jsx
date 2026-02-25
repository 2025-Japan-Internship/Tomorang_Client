/**
 * ReservationStatusPage - 예약 현황 페이지
 *
 * 라우터:
 * <Route path="/reservation-status/:reservationId" element={<ReservationStatusPage />} />
 *
 * status: PENDING | CONFIRMED | REJECTED | COMPLETED
 */

import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useReservations } from "../components/context/ReservationContext";
import postData from "../data/postData.json";
import StatusHeader from "../components/statusComponents/StatusHeader";
import MeetingPointCard from "../components/statusComponents/MeetingPointCard";
import Header from "../components/Header";
import StarFillIcon from "../assets/bookStatusIcons/starFill.svg";
import StarEmptyIcon from "../assets/bookStatusIcons/starEmpty.svg";
import ChatIcon from "../assets/navIcons/message.svg";

export default function ReservationStatusPage() {
  const { reservationId } = useParams();
  const navigate = useNavigate();
  const { reservations } = useReservations();

  const reservation = reservations.find((r) => r.reservationId === Number(reservationId));
  const post = reservation ? postData.find((p) => p.postId === reservation.postId) : null;

  if (!reservation || !post)
    return <Wrapper><div style={{ padding: 40, color: "#ACACAC" }}>예약 정보를 찾을 수 없습니다.</div></Wrapper>;

  const { status, date, time, adults, children, request, meetingPoint, meetingPointAddress, meetingPointLat, meetingPointLng, myReview } = reservation;
  const isConfirmedOrCompleted = status === "CONFIRMED" || status === "COMPLETED";

  const formatDate = (d) => {
    const obj = new Date(d);
    return `${obj.getFullYear()}년 ${obj.getMonth() + 1}월 ${obj.getDate()}일`;
  };

  return (
    <Wrapper>
      <Header coment="예약 현황" />

      <Content>
        {/* ── 상태 헤더 ── */}
        <StatusHeader status={status} />

        <Divider />

        {/* ── 만남 장소 ── */}
        <MeetingPointCard
          locked={!isConfirmedOrCompleted}
          address={meetingPointAddress}
          meetingPoint={meetingPoint}
          lat={meetingPointLat}
          lng={meetingPointLng}
        />

        <Divider />

        {/* ── 예약 신청 정보 ── */}
        <InfoCard>
          <InfoTitle>예약신청 정보</InfoTitle>
          <InfoRow>
            <InfoLabel>날짜</InfoLabel>
            <InfoValue>{formatDate(date)}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>시간</InfoLabel>
            <InfoValue>{time}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>인원 수</InfoLabel>
            <InfoValue>어른 {adults}명 / 어린이 {children}명</InfoValue>
          </InfoRow>
        </InfoCard>

        <Divider />

        {/* ── 요청 사항 ── */}
        <RequestCard>
          <InfoTitle>요청사항</InfoTitle>
          <RequestText>{request}</RequestText>
        </RequestCard>

        <Divider />

        {/* ── COMPLETED: 내 후기 (이미 작성된 경우만) ── */}
        {status === "COMPLETED" && myReview && (
          <>
            <ReviewSection>
              <InfoTitle>나의 후기</InfoTitle>
              <MyReviewCard>
                <MyReviewHeader>
                  <Avatar />
                  <ReviewerRight>
                    <ReviewerName>KIM</ReviewerName>
                    <ReviewerDate>
                      {myReview.createdAt.slice(0, 10).replace(/-/g, ".")} | {time}
                    </ReviewerDate>
                  </ReviewerRight>
                </MyReviewHeader>
                <ReviewStarRow>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <img
                      key={s}
                      src={s <= Math.round(myReview.rating) ? StarFillIcon : StarEmptyIcon}
                      alt="star"
                      width={16}
                      height={16}
                    />
                  ))}
                  <ReviewRatingNum>{myReview.rating}</ReviewRatingNum>
                  <ReviewDateSide>{myReview.createdAt.slice(0, 7).replace("-", ".")}</ReviewDateSide>
                </ReviewStarRow>
                <ReviewContent>{myReview.content}</ReviewContent>
                {myReview.images?.length > 0 && (
                  <ReviewImages>
                    {myReview.images.map((img, idx) => (
                      <ReviewImg
                        key={idx}
                        src={img}
                        alt="review"
                        onError={(e) => { e.target.style.background = "#eee"; e.target.removeAttribute("src"); }}
                      />
                    ))}
                  </ReviewImages>
                )}
              </MyReviewCard>
            </ReviewSection>
            <Divider />
          </>
        )}

        {/* ── 하단 버튼 ── */}
        {status === "PENDING" && (
          <ActionBtn $disabled>채팅하기</ActionBtn>
        )}

        {status === "CONFIRMED" && (
          <>
            <ActionBtn onClick={() => navigate(`/review-write/${reservationId}`)}>
              투어 완료하기
            </ActionBtn>
            <ChatBtn>
              <img src={ChatIcon} alt="chat" width={19} height={15} />
              채팅하기
            </ChatBtn>
          </>
        )}

        {status === "REJECTED" && (
          <ActionBtn onClick={() => navigate("/main")}>다른 코스 찾아보기</ActionBtn>
        )}

        {/* COMPLETED + 후기 미작성 → 리뷰 작성 페이지로 이동 */}
        {status === "COMPLETED" && !myReview && (
          <ActionBtn onClick={() => navigate(`/review-write/${reservationId}`)}>
            후기 등록하기
          </ActionBtn>
        )}
      </Content>
    </Wrapper>
  );
}

/* ─── Styled Components ─── */

const Wrapper = styled.div`
  max-width: 390px;
  margin: 0 auto;
  min-height: 100vh;
  background: #fff;
  font-family: "Pretendard", sans-serif;
`;

const Content = styled.div`
  padding: 16px 21px 48px;
  display: flex;
  flex-direction: column;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #F3F4F3;
  margin: 20px 0;
`;

const InfoCard = styled.div`
  border-radius: 12px;
  border: 1px solid #DADADA;
  background: #FFF;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InfoTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
  letter-spacing: -0.016px;
  color: #4E4E4E;
  margin-bottom: 4px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoLabel = styled.div`
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.49px;
  color: #4E4E4E;
`;

const InfoValue = styled.div`
  font-weight: 600;
  font-size: 14px;
  letter-spacing: -0.49px;
  color: #111;
  text-align: right;
`;

const RequestCard = styled.div`
  border-radius: 12px;
  border: 1px solid #DADADA;
  background: #FFF;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RequestText = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #4E4E4E;
`;

/* 내 후기 */
const ReviewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MyReviewCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MyReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #DADADA;
  flex-shrink: 0;
`;

const ReviewerRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const ReviewerName = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #111;
`;

const ReviewerDate = styled.div`
  font-weight: 500;
  font-size: 12px;
  color: #ACACAC;
`;

const ReviewStarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ReviewRatingNum = styled.span`
  font-weight: 500;
  font-size: 12px;
  color: #4E4E4E;
  margin-left: 2px;
`;

const ReviewDateSide = styled.span`
  font-weight: 500;
  font-size: 12px;
  color: #DADADA;
  margin-left: 4px;
`;

const ReviewContent = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #4E4E4E;
  white-space: pre-line;
`;

const ReviewImages = styled.div`
  display: flex;
  gap: 8px;
`;

const ReviewImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  background: #eee;
`;

/* 버튼 */
const ActionBtn = styled.button`
  width: 348px;
  height: 56px;
  border-radius: 12px;
  background: ${({ $disabled }) => ($disabled ? "#EDFCDF" : "#C5F598")};
  border: none;
  cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};
  font-family: "Pretendard", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: ${({ $disabled }) => ($disabled ? "#ACACAC" : "#111")};
  margin-top: 8px;
  align-self: center;
`;

const ChatBtn = styled.button`
  width: 348px;
  height: 56px;
  border-radius: 12px;
  background: #fff;
  border: 1.5px solid #DADADA;
  cursor: pointer;
  font-family: "Pretendard", sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #111;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  align-self: center;
`;