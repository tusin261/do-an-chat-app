
const milliseconds_per_day = 1000 * 60 * 60 * 24;
const today = new Date();
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}


function formatDate(value1) {
    const v1 = new Date(value1);
    const diffTime = Math.abs(today - v1);
    const rs = Math.ceil(diffTime / milliseconds_per_day);
    if (rs > 7) {
        return v1.toLocaleDateString("vi-VN");
    } else if (rs <= 1) {
        return "Hom nay, " + formatAMPM(v1);
    } else {
        return `${rs} ngay truoc`;
    }
}

module.exports = { formatAMPM, formatDate };
