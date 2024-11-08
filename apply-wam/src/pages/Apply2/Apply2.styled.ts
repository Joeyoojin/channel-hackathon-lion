/** @jsxImportSource @emotion/react */
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
  gap: 23px;
  max-height: 380px;
  overflow-y: auto;
`

export const Header = styled.div`
  width: 100%;
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

export const QuestionContainer = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const QuestionHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #ff7b00;
  font-family: 'Noto Sans KR', sans-serif;
`

export const QuestionNumber = styled.span`
  color: black;
  font-size: 15px;
  font-weight: bold;
`

export const QuestionText = styled.span`
  font-size: 15px;
  font-weight: bold;
  color: #ff7b00;
  font-family: 'Noto Sans KR', sans-serif;
`

export const TextArea = styled.textarea`
  width: 100%;
  height: 75px;
  padding: 12px;
  border-radius: 15px;
  border: 1px solid #ff7b00;
  outline: none;
  resize: none;
  font-weight: 500;
  font-family: 'Noto Sans KR', sans-serif;

  &:focus {
    border-color: #e06a00;
  }
`

export const PasswordInput = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 15px;
  border: 1px solid #ff7b00;
  outline: none;
  font-family: 'Noto Sans KR', sans-serif;

  &:focus {
    border-color: #e06a00;
  }
`

export const SubmitButton = styled.button`
  width: 100%;
  height: 46px;
  padding: 10px;
  background-color: #ff7b00;
  border-radius: 10px;
  color: white;
  font-size: 18px;
  font-weight: 600;
  font-family: 'Noto Sans KR', sans-serif;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #e06a00;
  }

  &:active {
    background-color: #cc5d00;
  }
`
