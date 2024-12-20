import Button from '@/components/_button/Button';
import Modal from '@/components/_modal/Modal';
import useUserStore from '@/stores/useUserStore.js';
import { useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useNavigate } from 'react-router-dom';
import { getTestSentence } from '../../services/game';
import useGameStore from '../../stores/useGameStore';
import useModalStore from '../../stores/useModalStore';
import { ToastWarning } from '../_common/alert';
import ModalTextBox from '../_modal/ModalTextBox';
import * as St from './TypingGame.style';
const TypingGame = () => {
    const { user } = useUserStore((state) => ({
        user: state.user,
    }));
    const { setTypingGameResult } = useGameStore();
    const { openModal, closeModal } = useModalStore();
    const modalId = 'typingGameNoticeModal';

    const navigate = useNavigate();
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const closeHandler = (state) => {
        closeModal(modalId);
        setIsVisible(true);
        setIsGameStarted(true);
    };
    const [testText, setTestText] = useState('');
    //const testText = '달나라에서 온 토끼가 땅콩버터를 좋아한다는 소문이 있다.';

    const [inputTyping, setInputTyping] = useState('');
    const handleInputChange = (e) => {
        setInputTyping(e.target.value);
    };
    const getStyledText = () => {
        const typedChars = inputTyping.split(''); // 입력된 문자 배열
        const testChars = testText.split(''); // 주어진 문자 배열

        return testChars.map((char, index) => {
            const typedChar = typedChars[index] || ''; // 입력된 문자가 부족할 경우 빈 문자열

            const isMatch = typedChar === char;
            const isSpace = testChars[index] === ' ';
            const isPast = index < typedChars.length;

            let color = 'var(--color-green3)'; // 기본 색상
            if (isPast) {
                if (isMatch) {
                    color = 'var(--color-green1)'; // 맞는 글자
                } else {
                    color = 'var( --color-red)'; // 틀린 글자
                }
            }
            return (
                <St.StyledSpan
                    key={index}
                    $isSpace={isSpace}
                    $isPast={isPast}
                    $color={color}
                >
                    {char}
                </St.StyledSpan>
            );
        });
    };
    const onClickRemoveButton = () => {
        setInputTyping('');
    };
    const calculateGameScore = () => {
        // e.prventDefault();
        const testTextArray = testText.split('');
        const inputTextArray = inputTyping.split('');

        let matchCount = 0;

        // 공백도 포함해서 문자 비교
        for (let i = 0; i < testTextArray.length; i++) {
            if (inputTextArray[i] === testTextArray[i]) {
                matchCount++;
            }
        }
        // setInputTyping('');

        return (matchCount / testTextArray.length) * 100;
    };

    const handleFinishGame = async () => {
        ToastWarning('게임 끝', true);

        const gameScore = await calculateGameScore();

        setTypingGameResult({
            score: gameScore,
        });

        navigate('/game/game-result', {
            state: {
                gameName: '타이핑',
                gameScore: gameScore,
            },
        });
    };

    useEffect(() => {
        const getTestText = async () => {
            const getTestTextResult = await getTestSentence();
            setTestText(getTestTextResult);
        };
        getTestText();
        openModal(modalId);
    }, [openModal]);

    return (
        <St.TypingGameContainer>
            <St.TitleContainer>
                <St.Title>아래의 글을 따라 입력해주세요!</St.Title>
                <St.SubTitle>오타 정도로 취했는지 판단해드릴게요.</St.SubTitle>
            </St.TitleContainer>
            <St.TimerBox>
                {' '}
                <CountdownCircleTimer
                    duration={20}
                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[20, 10, 5, 0]}
                    size={120}
                    isSmoothColorTransition={true}
                    isPlaying={isGameStarted}
                    onComplete={handleFinishGame}
                >
                    {({ remainingTime }) => remainingTime}
                </CountdownCircleTimer>
            </St.TimerBox>
            <St.TestTextDiv $isVisible={isVisible}>
                {' '}
                {getStyledText()}
            </St.TestTextDiv>
            <St.TypingGameInput
                type="text"
                value={inputTyping}
                onChange={handleInputChange}
                name="inputTyping"
                autoComplete="off"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault(); // 기본 폼 제출 방지
                        handleFinishGame(); // 엔터 키가 눌릴 때 handleFinishGame 호출
                    }
                }}
            />
            <St.ButtonBox>
                <Button
                    text="다 지우기"
                    size="medium"
                    isRed={false}
                    onClick={onClickRemoveButton}
                />
                <Button
                    text="제출하기"
                    size="medium"
                    isRed={true}
                    onClick={handleFinishGame}
                />
            </St.ButtonBox>
            <Modal
                isGame={true}
                modalId="typingGameNoticeModal"
                contents={
                    <ModalTextBox text="20초 안에 주어진 문장을 입력하세요!" />
                }
                buttonText={'시작하기'}
                onButtonClick={closeHandler}
            />
        </St.TypingGameContainer>
    );
};

export default TypingGame;
