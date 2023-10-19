'use client'

type TimeArray = string[];

export const useTimeArray = (): TimeArray => {
    const getCurrentTime = (): string => {
        const currentTime = new Date();
        const currentMinutes = currentTime.getMinutes();
        const currentHours = currentTime.getHours();

        let roundedMinutes = Math.ceil(currentMinutes / 15) * 15;

        if (roundedMinutes === 60) {
            roundedMinutes = 0;
        }

        return `${currentHours}:${roundedMinutes < 10 ? "0" + roundedMinutes : roundedMinutes}`;
    };

    const getTimeArray = (): TimeArray => {
        const currentTime = getCurrentTime();
        const [currentHours, currentMinutes] = currentTime.split(':').map(Number);
        const timeArray: TimeArray = [];

        let minutes = currentMinutes;
        let hours = currentHours;

        if (currentMinutes < 15) {
            minutes = 15;
        } else if (currentMinutes < 30) {
            minutes = 30;
        } else if (currentMinutes < 45) {
            minutes = 45;
        } else {
            minutes = 0;
            hours += 1;
        }

        while (hours < 23 || (hours === 23 && minutes === 0)) {
            const time = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`;
            timeArray.push(time);

            minutes += 15;
            if (minutes === 60) {
                hours += 1;
                minutes = 0;
            }
        }

        return timeArray;
    }

    return getTimeArray();
};