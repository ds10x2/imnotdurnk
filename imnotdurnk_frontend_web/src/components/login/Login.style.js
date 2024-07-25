import { styled } from 'styled-components';

export const LoginContainer = styled.div`
    display: flex;
    width: 329px;
    padding: 0px 33px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 19px;
`;

export const SubTitle = styled.h3`
    color: var(----color-green3, #252f2c);

    font-size: 14px;
    line-height: normal;
`;
export const MainTitle = styled.h1`
    color: var(----color-green3, #252f2c);

    font-size: 32px;
    line-height: normal;
`;
export const LoginSubQuestionContainer = styled.div`
    display: flex;
    width: 263px;
    height: 16px;
    justify-content: space-between;
    align-items: center;
`;
export const ForgetPasswordMessage = styled.h6`
    color: var(----color-green3, #252f2c);
    text-align: right;
    font-size: 8px;
    line-height: normal;
`;