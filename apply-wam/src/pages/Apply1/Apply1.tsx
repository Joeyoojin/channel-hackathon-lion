import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import * as S from './Apply1.styled.ts'

function Apply1() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [department, setDepartment] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleNext = () => {
    navigate('/apply2', {
      state: {
        name,
        email,
      },
    })
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>개인 정보 입력하기</S.Title>
      </S.Header>

      <S.InputContainer>
        <S.InputLabel>이름</S.InputLabel>
        <S.Input
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          placeholder="이름을 입력해주세요"
        />
      </S.InputContainer>

      <S.InputContainer>
        <S.InputLabel>학과 및 학번</S.InputLabel>
        <S.Input
          value={department}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDepartment(e.target.value)
          }
          placeholder="'학과/학번' 형식으로 입력해주세요"
        />
      </S.InputContainer>

      <S.InputContainer>
        <S.InputLabel>이메일</S.InputLabel>
        <S.Input
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          placeholder="이메일 주소를 입력해주세요"
        />
      </S.InputContainer>

      <S.InputContainer>
        <S.InputLabel>전화번호</S.InputLabel>
        <S.Input
          value={phoneNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPhoneNumber(e.target.value)
          }
          placeholder="전화번호를 '-' 없이 입력해주세요"
        />
      </S.InputContainer>

      <S.NextButton onClick={handleNext}>다음</S.NextButton>
    </S.Container>
  )
}

export default Apply1
