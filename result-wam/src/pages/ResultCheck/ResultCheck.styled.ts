import styled from '@emotion/styled'

export const Container = styled.div`
  width: auto;
  height: auto;
  padding: 20px;
  background: white;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  gap: 60px;
`

export const Header = styled.div`
  width: 100%;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
`

export const Title = styled.div`
  color: #ff7b00;
  font-size: 30px;
  font-weight: 900;
  font-family: 'Noto Sans KR', sans-serif;
`

export const InputContainer = styled.div`
  width: 347px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const Label = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #ff7b00;
  font-family: 'Noto Sans KR', sans-serif;
  padding-left: 3px;
`

export const SubText = styled.span`
  color: black;
  font-size: 15px;
  font-weight: normal;
  font-family: 'Noto Sans KR';
`

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ff7b00;
  border-radius: 15px;
  color: #757575;
  font-size: 12px;
  font-family: 'Noto Sans KR';

  &::placeholder {
    color: #757575;
  }
`

export const InterviewButton = styled.button`
  width: 100%;
  height: 46px;
  padding: 12px;
  background-color: #ff7b00;
  border-radius: 10px;
  border: none;
  color: white;
  font-size: 18px;
  font-weight: 600;
  font-family: 'Noto Sans KR';
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`
