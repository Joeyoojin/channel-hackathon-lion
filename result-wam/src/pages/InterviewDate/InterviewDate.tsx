import { useState } from 'react'

import { useNavigate, useLocation } from 'react-router-dom'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import * as S from './InterviewDate.styled'
import './Interview.css'

function InterviewDate() {
  const navigate = useNavigate()

  const location = useLocation()
  const [date, setDate] = useState<Date>(new Date())


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
              navigate('/time', {
                state: {
                  selectedDate: selectedDate.toISOString(),
                  ...location.state
                }
              })
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
