import { Pressable } from 'react-native';
import { css, styled } from 'styled-components/native';

const StyledButton = styled(Pressable)`
    display: flex;
    justify-content: center;
    align-items: center;

    width: ${(props) => (props.$isEmpty ? '50.03px' : 'auto')};
    height: ${(props) => (props.$isEmpty ? '27.91px' : 'auto')};

    padding: 1.96px 13.02px;

    border: none;
    border-radius: 45px;

    ${(props) =>
        props.$isEmpty &&
        css`
            pointer-events: none;
            visibility: hidden;
        `}

    background-color: ${(props) =>
        props.$isEmpty
            ? props.theme.colors.white1
            : props.$isRed
              ? props.theme.colors.white2
              : props.theme.colors.red};
`;

export { StyledButton };