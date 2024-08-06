import Button from '@/components/_button/Button';
import useMyPageNavigation from '../../hooks/useMyPageNavigation';
import * as St from './ProfileCreateVoice.style';
const ProfileCreateVoice = () => {
    useMyPageNavigation();
    return (
        <St.ProfileCreateContainer>
            <St.InfoContainer>
                <St.Title>음성을 들려주세요!</St.Title>
                <St.SubTitle>음주 전과 후 목소리를 분석할게요.</St.SubTitle>
            </St.InfoContainer>
            <St.RecordContainer>
                <St.InputContainer>
                    <St.StyledIcon src="src/assets/icons/size_24/Icon-voice.svg" />
                    <St.RecordMessage>
                        다시 녹음하고 싶으시면 버튼을 다시 눌러주세요
                    </St.RecordMessage>
                </St.InputContainer>
                <St.ButtonBox>
                    <Button text="Skip" size="medium" isRed="false" />
                    <Button text="Next" size="medium" isRed="true" />
                </St.ButtonBox>
            </St.RecordContainer>
        </St.ProfileCreateContainer>
    );
};

export default ProfileCreateVoice;
