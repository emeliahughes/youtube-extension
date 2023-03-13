/**
 * Yite object
 */

class Yite {
    constructor(videoID, startTime, endTime, title, source, sourceType, image, description, link, citeType="neither", comment) {
        // all except added is a string
        //this.startTime = "" + this.getTimeAsSeconds(startTime);
        //this.endTime = "" + this.getTimeAsSeconds(endTime);
        this.videoID = videoID;
        this.startTime = "" + startTime;
        this.endTime = "" + endTime;
        this.title = title;
        this.source = source;
        this.sourceType = sourceType;
        this.image = image;
        this.description = description;
        this.link = link;
        this.id = "";
        this.citeType = citeType;
        this.comment = comment;
    }

    /**
     * Takes a time string and parses it into an int.
     * @param {string} timeStr must be formatted HH:MM:SS
     * @returns time in seconds as an int
     */
    getTimeAsSeconds(timeStr) {
        let time = this.checkTimeStrFormatting(timeStr);
        // the date 1/1/1970 is arbitrary, we just need a date for the object.
        let datetime = new Date('1970-01-01T' + time+ 'Z');
        return datetime.getSeconds();
    }

    /**
     * Get input time string based on input.
     * NOTE: Depending on how the React app/input boxes work, this function might not be needed.
     * @param {*} str 
     * @returns 
     */
    checkTimeStrFormatting(str) {
        const regexpFull = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/;
        const regExpMinSec = /^([0-5]?[0-9]):([0-5]?[0-9])$/;
        const regExpSec = /^([0-5]?[0-9])$/;
        if (regexpFull.test(str)) {
            return str;
        } else if (regExpMinSec.test(str)) {
            return "00:" + str;
        } else if (regExpSec.test(str)) {
            return "00:00:" + str;
        } else {
            // see if we can make it impossible to reach here with restrictions on input boxes.
            return "00:00:00";
        }
    }
}

export default Yite;