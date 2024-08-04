import { useCallback, useState } from 'react';
import useCalendarNavigation from '../../hooks/useCalendarNavigation';
import useCalendarStore from '../../stores/useCalendarStore';
import CalendarStatusBar from './CalendarStatusBar';
import EventCard from './EventCard';
import * as St from './MainCalendar.style';
import ReactCalendar from './ReactCalendar';

const MainCalendar = () => {
    const [view, setView] = useState('month'); // 초기 값 month 뷰

    // TODO: 여유 생기면 selectedDate도 전역에 저장하고, '오늘' 버튼 만들기
    const [selectedDate, setSelectedDate] = useState(new Date()); // 초기 값 오늘

    const { eventListOnSelectedDate, statusOnDate } = useCalendarStore();

    const { navigate } = useCalendarNavigation();

    const handleItemClick = useCallback(
        (date) => {
            const adjustedDate = new Date(date);
            adjustedDate.setDate(date.getDate() + 1); // 일자 +1 조정

            const formattedDate = adjustedDate.toISOString().split('T')[0]; // 날짜를 YYYY-MM-DD 형식으로 변환
            navigate(`/calendar/${formattedDate}`);
        },
        [navigate],
    );

    return (
        <St.MainContainer>
            <ReactCalendar
                onChangeView={setView}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            />
            <CalendarStatusBar />
            {view === 'month' && (
                <EventCard
                    alcoholLevel={statusOnDate?.alcoholLevel}
                    onItemClick={handleItemClick}
                    selectedDate={selectedDate}
                    fromCalendar={true}
                >
                    {eventListOnSelectedDate.length > 0 ? (
                        <>
                            {eventListOnSelectedDate.slice(0, 3).map((e) => {
                                return (
                                    <St.EventCardTitle
                                        key={e.id}
                                        $alcoholLevel={
                                            statusOnDate?.alcoholLevel
                                        }
                                    >
                                        - {e.title}
                                    </St.EventCardTitle>
                                );
                            })}
                            {eventListOnSelectedDate.length > 3 && (
                                <St.EventCardMorePlan
                                    $alcoholLevel={statusOnDate?.alcoholLevel}
                                >
                                    (이외 {eventListOnSelectedDate.length - 3}
                                    개의 일정이 있습니다.)
                                </St.EventCardMorePlan>
                            )}
                        </>
                    ) : (
                        <h3>일정 없음</h3>
                    )}
                </EventCard>
            )}
        </St.MainContainer>
    );
};

export default MainCalendar;