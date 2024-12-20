import Modal from '@/components/_modal/Modal';
import CertificationNumberInputContainer from '@/components/checkemail/CertificationNumberInputContainer.jsx';
import InformationMessage from '@/components/checkemail/InformationMessage';
import {
    checkCertificationNumber,
    sendCertificationNumber,
    signup,
} from '@/services/user';
import useModalStore from '@/stores/useModalStore';
import useNavigationStore from '@/stores/useNavigationStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastSuccess } from '../components/_common/alert';
import ModalTextBox from '../components/_modal/ModalTextBox';
import useUserStore from '../stores/useUserStore';

const CheckEmail = () => {
    const { user, setUser, clearUser } = useUserStore((state) => ({
        user: state.user,
        setUser: state.setUser,
        clearUser: state.clearUser,
    }));

    const [alertContents, setAlertContents] = useState('');
    const navigate = useNavigate();
    const [inputCertNum, setInputCertNum] = useState('');
    const [isWrong, setIsWrong] = useState(false);

    // 모달
    const { openModal, closeModal } = useModalStore();
    const modalId = 'signupsuccessModal';
    //모달 열기
    const openSignupSuccessModal = (modalId) => {
        openModal(modalId);
    };
    // 인증번호 전송
    useEffect(() => {
        //  const sendCertNumList = async sendCertificationNumber(user.email);
        const sendEmailVerification = async () => {
            try {
                if (user.email !== '') {
                    const sendResult = await sendCertificationNumber(
                        user.email,
                    );
                }
            } catch (error) {
            }
        };
        sendEmailVerification();
    }, []);

    //재전송하기
    const onClickResendButton = async () => {
        ToastSuccess('인증번호를 전송중입니다.', true);
        const resendResult = await sendCertificationNumber(user.email);
        if (resendResult) {
            ToastSuccess('인증번호가 재전송되었습니다.', true);
        }
    };
    //인증번호 비교하기
    const compareCertificationNumber = async (certNumString) => {
        // 4자리로 변경되면 이걸로 사용
        const comparedResult = await checkCertificationNumber(
            user.email,
            certNumString,
        );
        if (comparedResult.isSuccess) {
            const signupResult = await signup(
                user.name,
                user.email,
                user.phone,
                user.password,
            );
            if (signupResult.isSuccess) {
                openSignupSuccessModal(modalId);
                clearUser();
            }
        } else {
            setIsWrong(true);
            setAlertContents('인증코드가 틀립니다.');
        }
    };
    //네비
    const setNavigation = useNavigationStore((state) => state.setNavigation);
    useEffect(() => {
        setNavigation({
            isVisible: true,
            icon1: { iconname: 'backarrow', path: '-1' },
            title: '이메일 인증하기',
            icon2: { iconname: 'empty' },
        });
    }, [setNavigation]);

    return (
        <>
            <InformationMessage email={user.email} />
            <CertificationNumberInputContainer
                email={user.email}
                inputCertNum={inputCertNum}
                setInputCertNum={setInputCertNum}
                onClickResendButton={onClickResendButton}
                compareCertificationNumber={compareCertificationNumber}
                isWrong={isWrong}
                setIsWrong={setIsWrong}
                alertContents={alertContents}
                setAlertContents={setAlertContents}
            />

            <Modal
                modalId={modalId}
                contents={<ModalTextBox text="가입을 완료했습니다." />}
                buttonText={'로그인'}
                onButtonClick={() => {
                    closeModal();
                    navigate('/account');
                }}
            />
        </>
    );
};

export default CheckEmail;
