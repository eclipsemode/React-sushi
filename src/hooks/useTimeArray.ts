'use client'

type TimeArray = string[];

export const useTimeArray = (): TimeArray => {
    const getCurrentTime = (): string => {
        const currentTime: Date = new Date();
        const currentMinutes: number = currentTime.getMinutes();
        const currentHours: number = currentTime.getHours();

        let roundedMinutes: number = Math.ceil(currentMinutes / 15) * 15;

        if (roundedMinutes === 60) {
            roundedMinutes = 0;
        }

        return `${currentHours}:${roundedMinutes < 10 ? "0" + roundedMinutes : roundedMinutes}`;
    };

    const getTimeArray = (): TimeArray => {
        const currentTime: string = getCurrentTime();
        const [currentHours, currentMinutes]: number[] = currentTime.split(':').map(Number);
        const timeArray: TimeArray = [];

        let minutes: number = currentMinutes;
        let hours: number = currentHours;

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

        if (hours < 10 || (hours < 10 && minutes < 30)) {
            hours = 10;
            minutes = 30;
        }

        while (hours < 23 || (hours === 23 && minutes === 0)) {
            const time: string = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`;
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