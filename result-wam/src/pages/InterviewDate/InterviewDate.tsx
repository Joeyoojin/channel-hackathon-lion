import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Calendar, { CalendarProps } from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import * as S from './InterviewDate.styled'
import './Interview.css'

function InterviewDate() {
  const navigate = useNavigate()
  const [date, setDate] = useState<Date | null>(new Date())

  const availableDates = [5, 6, 7, 8, 9]

  const tileDisabled: CalendarProps['tileDisabled'] = ({
    date,
  }: {
    date: Date
  }) => {
    return !availableDates.includes(date.getDate())
  }

  const handleDateChange: CalendarProps['onChange'] = (newDate) => {
    if (newDate instanceof Date) {
      setDate(newDate)
      navigate('/time')
    } else if (Array.isArray(newDate) && newDate.length > 0) {
      setDate(newDate[0])
      navigate('/time')
    } else {
      setDate(null)
    }
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>면접 일정 신청하기</S.Title>
        <S.IconPlaceholder />
      </S.Header>

      <S.ContentContainer>
        <Calendar
          onChange={handleDateChange}
          value={date}
          tileDisabled={tileDisabled}
          locale="ko"
          minDetail="month"
          maxDetail="month"
          formatDay={(_locale: string | undefined, date: Date) =>
            date.getDate().toString()
          }
        />
      </S.ContentContainer>
    </S.Container>
  )
}

export default InterviewDate
