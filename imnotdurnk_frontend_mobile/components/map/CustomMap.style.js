import { View } from 'react-native';
import MapView from 'react-native-maps';
import { styled } from 'styled-components/native';

const Container = styled.View`
    flex: 1;
    border-radius: 20px;
    overflow: hidden;
`;

const StyledMap = styled(MapView)`
    flex: 1;
    min-height: 340px;
    width: 100%;
`;

// 지도 우측 하단에 들어가는 버튼
const FloatingButtonBottomRight = styled(View)`
    position: absolute;
    bottom: 20px;
    right: 20px;
    z-index: 1;
`;

export { Container, FloatingButtonBottomRight, StyledMap };
