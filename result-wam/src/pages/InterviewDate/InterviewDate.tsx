import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import * as S from './InterviewDate.styled'
import './Interview.css'
import { MouseEvent } from 'react'

function InterviewDate() {
  const navigate = useNavigate()
  const [date, setDate] = useState<Date>(new Date())

  const availableDates = [5, 6, 7, 8, 9]

  const tileDisabled = ({ date }: { date: Date }) => {
    return !availableDates.includes(date.getDate())
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>면접 일정 신청하기</S.Title>
        <S.IconPlaceholder />
      </S.Header>

      <S.ContentContainer>
        <Calendar
          onChange={(
            newDate: Date | Date[] | null,
            _event: MouseEvent<HTMLButtonElement>
          ) => {
            if (
              newDate instanceof Date ||
              (Array.isArray(newDate) &&
                newDate.length === 1 &&
                newDate[0] instanceof Date)
            ) {
              const selectedDate = Array.isArray(newDate) ? newDate[0] : newDate
              setDate(selectedDate)
              navigate('/time')
            }
          }}
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
