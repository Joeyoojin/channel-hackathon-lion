import { useMemo, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import * as S from './InterviewTime.styled'
import { callFunction } from '../../utils/wam'
import { getWamData } from '../../utils/wam'

function InterviewTime() {
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const { name, email, selectedDate } = location.state as { 
    name: string; 
    email: string;
    selectedDate: string;
  }

  const handleSubmit = async () => {
    const appId = useMemo(() => getWamData('appId') ?? '', [])
    const chatId = useMemo(() => getWamData('chatId') ?? '', [])
    const broadcast = useMemo(() => Boolean(getWamData('broadcast') ?? false), [])
    const rootMessageId = useMemo(() => getWamData('rootMessageId'), [])
    const chatType = useMemo(() => getWamData('chatType') ?? '', [])
    const channelId = useMemo(() => getWamData('channelId') ?? '', [])

    if (!selectedTime) {
      alert('시간을 선택해주세요.')
      return
    }

    if (chatType === 'userChat') {
      await callFunction(appId, 'interview-schedule-register', {
        input: {
          channelId: channelId,
          groupId: chatId,
          broadcast,
          rootMessageId,
          username: name,
          email,
          interview_dates: [[
            new Date(selectedDate).toISOString().split('T')[0],
            selectedTime.split('시')[0]
          ]],
        },
      })
      
      localStorage.setItem('interviewTimeSelected', selectedTime)
      navigate('/interview1')
    }
  }

  const handleTimeChange = (time: string) => {
    setSelectedTime(time)
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>면접 일정 신청하기</S.Title>
        <S.IconPlaceholder />
      </S.Header>

      <S.ContentContainer>
        <S.LabelContainer>
          <S.Label>아래에서 참석 가능한 면접 시간을 선택해주세요.</S.Label>
        </S.LabelContainer>

        <S.TimeListContainer>
          {[
            '14시 00분',
            '14시 30분',
            '15시 00분',
            '15시 30분',
            '16시 00분',
          ].map((time, index) => (
            <S.TimeItem key={index}>
              <input
                type="radio"
                id={`time-${index}`}
                name="interview-time"
                value={time}
                onChange={() => handleTimeChange(time)}
                checked={selectedTime === time}
              />
              <label htmlFor={`time-${index}`}>
                <S.TimeText>{time}</S.TimeText>
              </label>
            </S.TimeItem>
          ))}
        </S.TimeListContainer>
      </S.ContentContainer>

      <S.ConfirmButton onClick={handleSubmit}>
        <S.ButtonText>확인</S.ButtonText>
      </S.ConfirmButton>
    </S.Container>
  )
}

export default InterviewTime
