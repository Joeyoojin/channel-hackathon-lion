import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as S from './InterviewTime.styled'

function InterviewTime() {
  const navigate = useNavigate()
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const handleSubmit = () => {
    if (selectedTime) {
      localStorage.setItem('interviewTimeSelected', selectedTime)
      navigate('/interview1')
    } else {
      alert('시간을 선택해주세요.')
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
