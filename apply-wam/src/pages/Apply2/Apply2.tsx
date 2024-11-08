import { useEffect, useState } from 'react'
import { setSize } from '../../utils/wam'
import * as S from './Apply2.styled'

function Apply2() {
  const [motivation, setMotivation] = useState('')
  const [experience, setExperience] = useState('')

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
            3. 멋쟁이사자처럼에서 자신이 만들고 싶은 프로젝트를 제안해주세요.
          </S.QuestionText>
        </S.QuestionHeader>
        <S.TextArea
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          placeholder="띄어쓰기 포함 700자 이내로 작성해주세요"
        />
      </S.QuestionContainer>

      <S.SubmitButton onClick={handleSubmit}>제출 완료</S.SubmitButton>
    </S.Container>
  )
}

export default Apply2
