import styled from 'styled-components'

export const Container = styled.div`
  width: auto;
  height: auto;
  padding: 20px;
  background-color: white;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center; /* 모든 항목을 수평 중앙 정렬 */
  gap: 34px;
  max-height: 380px;
  overflow-y: auto;
`

export const Header = styled.div`
  width: 100%;
  height: 26px;
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  padding-top: 10px;
  margin-bottom: 10px;
`

export const Title = styled.div`
  color: #ff7b00;
  font-size: 30px;
  font-weight: 900;
  font-family: 'Noto Sans KR', sans-serif;
  text-align: center; /* 텍스트 중앙 정렬 */
`

export const IconPlaceholder = styled.div`
  width: 24px;
  height: 24px;
  position: relative;
`

export const ContentContainer = styled.div`
  width: 100%;
  height: 202px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center; /* 모든 텍스트 중앙 정렬 */
  gap: 20px;
`

export const LabelContainer = styled.div`
  width: 100%;
  height: 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
  align-items: center; /* 수평 중앙 정렬 */
`

export const Label = styled.div`
  width: 100%;
  color: black;
  font-size: 15px;
  font-family: 'Noto Sans KR';
  text-align: center; /* 텍스트 중앙 정렬 */
`

export const TimeListContainer = styled.div`
  width: 100%;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* 수평 중앙 정렬 */
  gap: 10px;
  margin-bottom: 10px;
`

export const TimeItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  gap: 10px;
`

export const TimeText = styled.div`
  flex: 1;
  color: black;
  font-size: 15px;
  font-family: 'Noto Sans KR';
  text-align: center; /* 텍스트 중앙 정렬 */
`

export const ConfirmButton = styled.button`
  width: 347px;
  height: 46px;
  padding: 12px;
  background-color: #ff7b00;
  border-radius: 10px;
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  gap: 8px;
  cursor: pointer;
  border: none;
`

export const ButtonText = styled.div`
  color: white;
  font-size: 18px;
  font-weight: 500;
  font-family: 'Noto Sans KR';
  text-align: center; /* 텍스트 중앙 정렬 */
`
