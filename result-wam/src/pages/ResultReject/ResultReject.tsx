import { useEffect } from 'react'
import { setSize } from '../../utils/wam'
import * as S from './ResultReject.styled'

function ResultReject() {
  useEffect(() => {
    setSize(385, 200)
  }, [])

  return (
    <S.Container>
      <S.Header>
        <S.Title>결과 안내</S.Title>
      </S.Header>

      <S.ResultContainer>
        <S.ResultText>
          멋쟁이사자처럼 13기에 지원해주셔서 감사합니다.
          <br />
          <br />
          지원자님의 인상적인 경력과 뛰어난 역량에도 불구하고, 예상보다 많은
          지원자와 제한된 선발 인원으로 안타깝게도
          <S.HighlightText>
            <br />
            13기 합격 소식을 전해드리지 못하게 되었습니다.
          </S.HighlightText>
          <br />
          <br />
          다시 한 번 시간을 내어 멋쟁이사자처럼에 지원해주셔서 감사합니다. 추후
          좋은 기회에 다시 만나뵐 수 있기를 기대하며, <br />
          멋쟁이사자처럼에 보여주신 열정에 깊은 감사를 드립니다.
        </S.ResultText>
      </S.ResultContainer>
    </S.Container>
  )
}

export default ResultReject
