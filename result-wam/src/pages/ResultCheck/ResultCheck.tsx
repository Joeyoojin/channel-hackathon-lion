import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { callFunction, getWamData, setSize } from '../../utils/wam'
import * as S from './ResultCheck.styled'

function ResultCheck() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    setSize(385, 370)
  }, [])

  const appId = useMemo(() => getWamData('appId') ?? '', [])
  const chatId = useMemo(() => getWamData('chatId') ?? '', [])
  const broadcast = useMemo(() => Boolean(getWamData('broadcast') ?? false), [])
  const rootMessageId = useMemo(() => getWamData('rootMessageId'), [])
  const channelId = useMemo(() => getWamData('channelId') ?? '', [])
  const chatType = useMemo(() => getWamData('chatType') ?? '', [])

  const handleSubmit = async (sender: string): Promise<void> => {
    if (chatType === 'userChat') {
      switch (sender) {
        case 'bot': {
          const response = await callFunction(appId, 'result-check', {
            input: {
              channelId: channelId,
              groupId: chatId,
              broadcast,
              rootMessageId,
              username: name,
              email,
            },
          })

          if (response.result) {
            navigate('/result/pass', { 
              state: { name, email } 
            })
          } else {
            navigate('/result/fail')
          }
          break
        }
        default:
          console.error('Invalid message sender')
      }
    }
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>합격자 발표</S.Title>
      </S.Header>

      <S.InputContainer>
        <S.Label>이름</S.Label>
        <S.Input
          placeholder="성함을 입력해주세요"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
      </S.InputContainer>

      <S.InputContainer>
        <S.Label>이메일</S.Label>
        <S.Input
          placeholder="제출하신 이메일 주소를 입력해주세요"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
      </S.InputContainer>

      <S.InterviewButton onClick={() => handleSubmit('bot')}>
        결과 확인하기
      </S.InterviewButton>
    </S.Container>
  )
}

export default ResultCheck
