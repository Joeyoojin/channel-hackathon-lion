import styled from '@emotion/styled'

export const Container = styled.div`
  width: 385px;
  height: 402px;
  padding: 20px;
  background-color: white;
  border-radius: 30px;
  display: inline-flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 45px;
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
    width: 24px; /* 6rem converted */
    height: 24px;
    position: relative;
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
