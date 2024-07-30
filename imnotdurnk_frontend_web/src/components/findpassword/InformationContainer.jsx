import * as St from './InformationContainer.style';
import Button from '@/components/_button/Button.jsx';
const InformationContainer = () => {
    return (
        <St.InformationContainer>
            <St.StyledH2>이메일을 확인해주세요.</St.StyledH2>
            <St.StyledMessage>
                입력하신 이메일로 새 비밀번호를 보냈습니다.
            </St.StyledMessage>
            <St.StyledMessage>
                새로 발급된 비밀번호로 로그인하고,
                <br /> 비밀번호를 수정하세요!
            </St.StyledMessage>
            <Button text="로그인 하러 가기" size="big" isRed="true" />
            <St.StyledMessagewhenNotSent>
                새 비밀번호가 전송되지 않았나요?
            </St.StyledMessagewhenNotSent>
        </St.InformationContainer>
    );
};

export default InformationContainer;