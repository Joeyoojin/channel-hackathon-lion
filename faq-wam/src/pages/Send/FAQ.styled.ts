import styled from '@emotion/styled'

export const Container = styled.div`
  width: auto;
  height: auto;
  padding: 20px;
  background-color: white;
  border-radius: 30px;
  display: inline-flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 45px;
  position: relative;
  max-height: 380px;
  overflow-y: auto; /* 상대 위치로 설정 */
`

export const Header = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  padding-top: 10px;
  padding-bottom: 10px;

  .title {
    color: #ff7b00;
    font-size: 32px;
    font-weight: 900;
    font-family: 'Noto Sans KR', sans-serif;
  }

  .icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
    position: absolute;
    top: 5px;
    right: 10px; /* 우측 상단에 배치 */
    margin-right: 20px;
  }
`

export const CloseIcon = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: #ff7b00;
  text-align: center;
  line-height: 24px;
  cursor: pointer;
  margin-right: 20px;

  &:hover {
    color: #e06a00;
  }
`

export const FAQItem = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: start;
  align-items: start;
`

export const BoldText = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 18px;
  font-weight: 900;
  color: #ff7b00;
`

export const NormalText = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 15px;
  font-weight: normal;
  color: black;
  padding-right: 5px;
`

export const ButtonWrapper = styled.div`
  width: 345px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`

export const ApplyButton = styled.div`
  height: 46px;
  padding: 10px;

  background-color: #ff7b00;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  .button-text {
    text-align: center;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: white;
  }
`
