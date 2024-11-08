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
  gap: 45px;
  overflow-y: auto;
  max-height: 380px;
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

export const InputContainer = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const InputLabel = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #ff7b00;
  font-family: 'Noto Sans KR', sans-serif;
`

export const Input = styled.input`
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

export const NextButton = styled.button`
  width: 100%;
  height: 46px;
  padding: 10px;
  background-color: #ff7b00;
  border-radius: 10px;
  color: white;
  border: none;
  cursor: pointer;
  text-align: center;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 18px;
  font-weight: 600;

  &:hover {
    background-color: #e06a00;
  }

  &:active {
    background-color: #cc5d00;
  }
`
