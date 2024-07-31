import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useCalendarStore from '../stores/useCalendarStore';
import useNavigationStore from './../stores/useNavigationStore';

const useCalendarNavigation = () => {
    const setNavigation = useNavigationStore((state) => state.setNavigation);
    const { setSelectedDate } = useCalendarStore();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.startsWith('/calendar/')) {
            const [year, month, day] = location.pathname
                .split('/')[2]
                .split('-');
            const selected = new Date(year, month - 1, day);
            setSelectedDate(selected);
            setNavigation({
                isVisible: true,
                icon1: { iconname: 'backarrow', path: '/calendar' },
                title: `${year}년 ${month}월 ${day}일`,
                icon2: { iconname: 'plus' },
            });
        } else {
            setNavigation({
                isVisible: true,
                icon1: { iconname: 'address', path: '/' },
                title: '캘린더',
                icon2: { iconname: 'plus' },
            });
        }
    }, [location, setSelectedDate, setNavigation]);

    return { navigate };
};

export default useCalendarNavigation;