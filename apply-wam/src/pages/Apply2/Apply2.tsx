import { useEffect, useState } from 'react'
import { setSize } from '../../utils/wam'
import * as S from './Apply2.styled'

function Apply2() {
  const [motivation, setMotivation] = useState('')
  const [experience, setExperience] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    setSize(385, 686)
  }, [])

  const handleSubmit = () => {
    // TODO: Implement form submission
    console.log('Form submitted')
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>자기소개서 작성하기</S.Title>
      </S.Header>

      <S.QuestionContainer>
        <S.QuestionHeader>
          <S.QuestionText>
            1. 멋쟁이사자처럼 13기에 지원한 동기를 적어주세요.
          </S.QuestionText>
        </S.QuestionHeader>
        <S.TextArea
          value={motivation}
          onChange={(e) => setMotivation(e.target.value)}
          placeholder="띄어쓰기 포함 500자 이내로 작성해주세요"
        />
      </S.QuestionContainer>

      <S.QuestionContainer>
        <S.QuestionHeader>
          <S.QuestionText>
            2. 협업 과정에서 자신의 장점이 드러났던 경험과 단점을 극복했던
            경험을 하나씩 소개해주세요.
          </S.QuestionText>
        </S.QuestionHeader>
        <S.TextArea
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          placeholder="띄어쓰기 포함 600자 이내로 작성해주세요"
        />
      </S.QuestionContainer>

      <S.QuestionContainer>
        <S.QuestionHeader>
          <S.QuestionText>
            지원서 수정 및 결과 확인에 사용될 비밀번호를 정해주세요.
          </S.QuestionText>
        </S.QuestionHeader>
        <S.PasswordInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요"
        />
      </S.QuestionContainer>

      <S.SubmitButton onClick={handleSubmit}>제출 완료</S.SubmitButton>
    </S.Container>
  )
}

export default Apply2
