import styled from '@emotion/styled'

export const Container = styled.div`
  width: auto;
  padding: 20px;
  background: white;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  gap: 45px;
  border-radius: 30px;
  max-height: 380px;
  overflow-y: auto;
`

export const Header = styled.div`
  width: 100%;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
`

export const Title = styled.div`
  color: #ff7b00;
  font-size: 30px;
  font-weight: 900;
  font-family: 'Noto Sans KR', sans-serif;
`

export const ResultContainer = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

export const ResultText = styled.div`
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  align-self: flex-start;
  font-family: 'Noto Sans KR';
  color: black;
`

export const ResultTextBold = styled.div`
  text-align: center;
  font-size: 17px;
  font-weight: 600;
  align-self: flex-start;
  font-family: 'Noto Sans KR';
  color: black;
`

export const HighlightText = styled.span`
  color: #ff7b00;
  font-weight: 600;
`
