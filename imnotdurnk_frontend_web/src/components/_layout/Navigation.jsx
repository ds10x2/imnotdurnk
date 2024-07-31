import IconButton from '@/components/_button/IconButton.jsx';
import { useNavigate } from 'react-router-dom';
import useNavigationStore from '../../stores/useNavigationStore.js';
import * as St from './Navigation.style.js';

const Navigation = () => {
    const { navigation } = useNavigationStore((state) => state);
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        if (path === '-1') {
            navigate(-1);
        } else if (path) {
            navigate(path);
        }
    };

    return (
        <St.NavContainer $isVisible={navigation.isVisible}>
            {navigation.icon1 && (
                <IconButton
                    iconname={navigation.icon1.iconname}
                    isRed={navigation.icon1.isRed}
                    onClick={() => handleNavigation(navigation.icon1.path)}
                />
            )}
            <h4>{navigation.title}</h4>
            {navigation.icon2 && (
                <IconButton
                    iconname={navigation.icon2.iconname}
                    isRed={navigation.icon2.isRed}
                    onClick={() => handleNavigation(navigation.icon2.path)}
                />
            )}
        </St.NavContainer>
    );
};

export default Navigation;
