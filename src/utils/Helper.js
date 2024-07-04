import moment from "moment"
import CryptoJS from "crypto-js"
import { CRYPTO_JS_KEY, MAP_KEY } from '../constants/Contants'

export const convertTimeToFormatText = (dataDate) => {
    let fmt = 'DD/MM/YYYY, hh:mm:ss a';
    let date = new Date(dataDate);
    let m = moment.utc(date.toLocaleString(), fmt);
    let localtime = m.local().format(fmt)

    let currentTime = new Date();
    let c = moment.utc(currentTime.toLocaleString(), fmt);
    let cTime = c.format(fmt)

    let startDate = moment(cTime, fmt);
    let endDate = moment(localtime, fmt);

    let SECONDS = startDate.diff(endDate, "second");
    let MINUTES = startDate.diff(endDate, "minute");
    let HOURS = startDate.diff(endDate, "hour");
    let DAYS = startDate.diff(endDate, "day");

    let convTime
    if (SECONDS < 30) {
        convTime = "Just now";
    } else if (SECONDS < 60) {
        const prefix = SECONDS === 1 ? " second ago" : " seconds ago";
        convTime = Math.round(SECONDS) + prefix;
    } else if (MINUTES < 60) {
        const prefix = MINUTES === 1 ? " minute ago" : " minutes ago";
        convTime = Math.round(MINUTES) + prefix;
    } else if (HOURS < 24) {
        const prefix = HOURS === 1 ? " hour ago" : " hours ago";
        convTime = Math.round(HOURS) + prefix;
    } else if (DAYS >= 7) {
        if (DAYS > 360) {
            const prefix = Math.round((DAYS / 360)) === 1 ? " year ago" : " years ago";
            convTime = Math.round((DAYS / 360)) + prefix;
        } else if (DAYS > 30) {
            const prefix = Math.round((DAYS / 30)) === 1 ? " month ago" : " months ago";
            convTime = Math.round((DAYS / 30)) + prefix;
        } else {
            const prefix = Math.round((DAYS / 7)) === 1 ? " week ago" : " weeks ago";
            convTime = Math.round((DAYS / 7)) + prefix;
        }
    } else if (DAYS < 7) {
        const prefix = DAYS === 1 ? " day ago" : " days ago";
        convTime = DAYS + prefix;
    }
    return convTime;
}

export const googleMapImage = (lat, long) => {
    const link = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=13&size=500x300&maptype=roadmap&markers=color:red%7Clabel:%7C${lat},${long}&key=${MAP_KEY}`
    return link;
}

export const convertStoryDuration1000 = (time) => {
    const [hour, minute, sec] = time.split(':');
    if (hour !== "00") {
        return `${(hour * 3600)} + ${(minute * 60)} + ${(sec)}`;
    }
    if (minute !== "00") {
        return `${minute * 60} + ${sec} `;
    }
    return `${sec} `;
}

// encrypt ID for link
export const encryptID = (id)=>{
    var encodedData = CryptoJS.AES.encrypt(`${id}`, CRYPTO_JS_KEY)
    var dataString = encodedData.toString().replace(/\//g, 'TriFtEl')
    return dataString
}   

// decrypt ID for link
export const decryptID = (id)=>{
    let u_id = id.toString().replace('TriFtEl', '/')
    var decry_oth_user_id = CryptoJS.AES.decrypt(`${u_id}`, CRYPTO_JS_KEY).toString(CryptoJS.enc.Utf8)
    return decry_oth_user_id
}