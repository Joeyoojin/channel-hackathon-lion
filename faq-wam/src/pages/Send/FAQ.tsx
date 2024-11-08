import * as Styled from './FAQ.styled'
import { useEffect } from 'react'
import { setSize } from '../../utils/wam'

const FAQ = () => {
  useEffect(() => {
    setSize(385, 482)
  }, [])

  return (
    <Styled.Container>
      <Styled.Header>
        <div className="title">자주 묻는 질문</div>
        <div className="icon" />
      </Styled.Header>

      <Styled.FAQItem>
        <Styled.BoldText>1. 개발이 처음이어도 괜찮을까요?</Styled.BoldText>
        <Styled.NormalText>
          네! 서울대 멋쟁이사자처럼은 웹개발이 처음인 분들도 함께하실 수 있도록
          커리큘럼을 구성하고 있습니다. 개발에 대한 의지만 있다면 누구든 따라갈
          수 있으니, 걱정말고 지원해주세요!
        </Styled.NormalText>
      </Styled.FAQItem>

      <Styled.FAQItem>
        <Styled.BoldText>
          2. 공식활동은 언제, 얼마나 자주 이뤄지나요?
        </Styled.BoldText>
        <Styled.NormalText>
          매주 토요일 오후 2시~6시에 정기 세미나가 열리고 월/화 오후 7~9시에는
          코딩데이가 진행됩니다. 세미나는 매주 필수로 참여해야 하며, 코딩데이는
          월요일/화요일 중 각자 가능한 요일에 참여하실 수 있습니다.
        </Styled.NormalText>
      </Styled.FAQItem>

      <Styled.FAQItem>
        <Styled.BoldText>3. 2학기에도 리크루팅을 진행하나요?</Styled.BoldText>
        <Styled.NormalText>
          서울대학교 멋쟁이사자처럼은 매년 1학기에만 리크루팅을 진행하며 최소
          활동 단위는 1년, 두 학기 연속 활동입니다. 그러니 고민 중이시라면 이번
          리크루팅을 놓치지 마세요!
        </Styled.NormalText>
      </Styled.FAQItem>

      <Styled.ButtonWrapper>
        <Styled.ApplyButton>
          <div className="button-text">지원하기</div>
        </Styled.ApplyButton>
      </Styled.ButtonWrapper>
    </Styled.Container>
  )
}

export default FAQ
