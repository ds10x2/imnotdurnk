import useNavigationStore from '@/stores/useNavigationStore';
import { useEffect } from 'react';
import ReactCalendar from '../components/calendar/ReactCalendar';

const CalendarView = () => {
    const setNavigation = useNavigationStore((state) => state.setNavigation);

    useEffect(() => {
        setNavigation({
            isVisible: true,
            icon1: { iconname: 'address' },
            title: '캘린더',
            icon2: { iconname: 'plus' },
        });
    }, [setNavigation]);

    return (
        <div>
            <ReactCalendar />
        </div>
    );
};

export default CalendarView;