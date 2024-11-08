import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setSize } from '../../utils/wam'
import * as S from './ResultPass.styled'

function ResultPass() {
  const navigate = useNavigate()

  useEffect(() => {
    setSize(385, 224)
  }, [])

  return (
    <S.Container>
      <S.Header>
        <S.Title>결과 안내</S.Title>
      </S.Header>

      <S.ResultContainer>
        <S.ResultTextBold>
          축하합니다!
          <br />
          멋쟁이사자처럼 13기 <S.HighlightText>서류평가에 합격</S.HighlightText>
          하셨습니다.
        </S.ResultTextBold>
        <S.ResultText>
          <br />
          <br />
          2차 면접 평가는 2월 15일 ~ 2월 17일에 진행되며, <br />
          개인별 면접 시간은 약 30분입니다. <br /> 아래 버튼을 클릭하여
          희망하시는 면접 일정을 신청해주세요.
        </S.ResultText>
      </S.ResultContainer>

      <S.InterviewButton onClick={() => navigate('/date')}>
        면접 일정 신청하기
      </S.InterviewButton>
    </S.Container>
  )
}

export default ResultPass
