import { useState } from 'react';
import * as St from './Modal.style';

import Button from '@/components/_common/Button';

const Modal = ({ contents, ButtonText }) => {
    const [isModalOpened, setIsModalOpened] = useState(true);

    return (
        <>
            {isModalOpened && (
                <St.ModalBackground onClick={() => setIsModalOpened(false)}>
                    <St.ModalContainer>
                        <img src="src/assets/images/bezel.svg" alt="Bezel" />
                        <div>{contents}</div>
                        <Button text={ButtonText} size={'large'} isRed={true} />
                    </St.ModalContainer>
                </St.ModalBackground>
            )}
        </>
    );
};

export default Modal;