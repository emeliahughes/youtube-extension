function convertTimeToSeconds(time) {
    let hourMinuteSecond = time.split(":").reverse();
    let timeInSeconds = 0;

    if (hourMinuteSecond.length == 3) {
        timeInSeconds += parseInt(hourMinuteSecond[2]) * 3600;
    }
    
    if (hourMinuteSecond.length >= 2) {
        timeInSeconds += parseInt(hourMinuteSecond[1]) * 60;
    }

    let seconds = parseInt(hourMinuteSecond[0]);

    if (isNaN(seconds)) {
        return 0;
    }
    timeInSeconds += seconds;

    return timeInSeconds;
}

export default convertTimeToSeconds;
