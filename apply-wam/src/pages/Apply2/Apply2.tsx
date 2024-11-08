import { useMemo, useState } from 'react'
import { callFunction, getWamData } from '../../utils/wam'
import * as S from './Apply2.styled.ts'
import { useLocation } from 'react-router-dom'

function Apply2() {
  const location = useLocation()
  const { name, email } = location.state || {}

  const [motivation, setMotivation] = useState('')
  const [experience, setExperience] = useState('')
  const [project, setProject] = useState('')

  const appId = useMemo(() => getWamData('appId') ?? '', [])
  const chatId = useMemo(() => getWamData('chatId') ?? '', [])
  // const chatType = useMemo(() => getWamData('chatType') ?? '', [])
  const broadcast = useMemo(() => Boolean(getWamData('broadcast') ?? false), [])
  const rootMessageId = useMemo(() => getWamData('rootMessageId'), [])
  const channelId = useMemo(() => getWamData('channelId') ?? '', [])

  const question1 = '1. 지원 동기를 작성해주세요.'
  const question2 = '2. 관련 경험을 작성해주세요.'
  const question3 =
    '3. 멋쟁이사자처럼에서 자신이 만들고 싶은 프로젝트를 제안해주세요.'

  const handleSubmit = async (): Promise<void> => {
    await callFunction(appId, 'applyAction', {
      input: {
        channelId: channelId,
        groupId: chatId,
        broadcast,
        rootMessageId,
        username: name,
        email,
        resumeData: [
          { Q1: question1, A1: motivation },
          { Q2: question2, A2: experience },
          { Q3: question3, A3: project },
        ],
      },
    })
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>자기소개서 작성하기</S.Title>
      </S.Header>

      <S.QuestionContainer>
        <S.QuestionHeader>
          <S.QuestionText>{question1}</S.QuestionText>
        </S.QuestionHeader>
        <S.TextArea
          value={motivation}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setMotivation(e.target.value)
          }
          placeholder="띄어쓰기 포함 500자 이내로 작성해주세요"
        />
      </S.QuestionContainer>

      <S.QuestionContainer>
        <S.QuestionHeader>
          <S.QuestionText>{question2}</S.QuestionText>
        </S.QuestionHeader>
        <S.TextArea
          value={experience}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setExperience(e.target.value)
          }
          placeholder="띄어쓰기 포함 600자 이내로 작성해주세요"
        />
      </S.QuestionContainer>

      <S.QuestionContainer>
        <S.QuestionHeader>
          <S.QuestionText>{question3}</S.QuestionText>
        </S.QuestionHeader>
        <S.TextArea
          value={project}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setProject(e.target.value)
          }
          placeholder="띄어쓰기 포함 700자 이내로 작성해주세요"
        />
      </S.QuestionContainer>

      <S.SubmitButton onClick={handleSubmit}>제출 완료</S.SubmitButton>
    </S.Container>
  )
}

export default Apply2
