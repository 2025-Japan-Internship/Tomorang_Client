/**
 * ReservationContext.jsx
 * 
 * 예약 데이터를 전역으로 관리합니다.
 * JSON 파일을 초기값으로 쓰고, 상태 변경(투어 완료, 리뷰 저장)은
 * 메모리 내에서 처리합니다. 실제 API 연동 시 아래 TODO 부분만 교체하세요.
 * 
 * 사용법:
 * 1. App.jsx 루트에 <ReservationProvider> 감싸기
 * 2. 컴포넌트에서 useReservations() 훅으로 사용
 * 
 * App.jsx 예시:
 * import { ReservationProvider } from "./context/ReservationContext";
 * 
 * function App() {
 *   return (
 *     <ReservationProvider>
 *       <Router> ... </Router>
 *     </ReservationProvider>
 *   );
 * }
 */

import { createContext, useContext, useState } from "react";
import initialReservations from "../../data/reservations.json";

const ReservationContext = createContext(null);

export function ReservationProvider({ children }) {
  const [reservations, setReservations] = useState(initialReservations);

  /**
   * 투어 완료 처리 + 리뷰 저장
   * @param {number} reservationId
   * @param {Object} review - { rating, answers, content, images, createdAt }
   */
  const completeAndSaveReview = async (reservationId, review) => {
    // TODO: 실제 API 연동
    // await fetch(`/api/reservations/${reservationId}/complete`, {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ review }),
    // });

    // 메모리 상태 업데이트
    setReservations((prev) =>
      prev.map((r) =>
        r.reservationId === reservationId
          ? {
              ...r,
              status: "COMPLETED",
              myReview: {
                rating: review.rating,
                content: review.content,
                images: review.images ?? [],
                answers: review.answers ?? {},
                createdAt: review.createdAt ?? new Date().toISOString(),
              },
            }
          : r
      )
    );
  };

  return (
    <ReservationContext.Provider value={{ reservations, completeAndSaveReview }}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservations() {
  const ctx = useContext(ReservationContext);
  if (!ctx) throw new Error("useReservations must be used within ReservationProvider");
  return ctx;
}