/**
 * CounterInput - 인원 카운터 컴포넌트
 *
 * 사용법:
 * <CounterInput
 *   label="성인"
 *   description="만 13세 이상"
 *   value={adults}
 *   onChange={setAdults}
 *   min={0}
 *   max={10}
 * />
 */

import styled from "styled-components";

export default function CounterInput({ label, description, value, onChange, min = 0, max = 99 }) {
  return (
    <Row>
      <LabelArea>
        <Label>{label}</Label>
        {description && <Desc>{description}</Desc>}
      </LabelArea>
      <Counter>
        <CountBtn onClick={() => onChange(Math.max(min, value - 1))}>－</CountBtn>
        <CountNum>{value}</CountNum>
        <CountBtn onClick={() => onChange(Math.min(max, value + 1))}>＋</CountBtn>
      </Counter>
    </Row>
  );
}

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const LabelArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Label = styled.div`
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.49px;
  color: #111;
`;

const Desc = styled.div`
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  font-size: 10px;
  letter-spacing: -0.35px;
  color: #ACACAC;
`;

const Counter = styled.div`
  width: 108px;
  height: 39px;
  border-radius: 100px;
  background: #F3F4F3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  box-sizing: border-box;
`;

const CountBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #111;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CountNum = styled.div`
  width: 39px;
  height: 39px;
  border-radius: 100px;
  background: #C5F598;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.49px;
  color: #111;
`;