import styled from '@emotion/styled'

export const Container = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 34px;
  padding: 20px;
  border-radius: 30px;
`

export const Header = styled.div`
  width: 100%;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  margin-bottom: 10px;
`

export const Title = styled.div`
  color: #ff7b00;
  font-size: 30px;
  font-weight: 900;
  font-family: 'Noto Sans KR', sans-serif;
`

export const IconPlaceholder = styled.div`
  width: 24px;
  height: 24px;
  position: relative;
`

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

export const LabelContainer = styled.div`
  width: 100%;
  height: 22px;
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  align-self: center;
  justify-content: center;
  align-items: center;
`

export const Label = styled.div`
  width: 100%;
  color: black;
  font-size: 15px;
  font-weight: 500;
  font-family: 'Noto Sans KR';
  align-self: center;
`
