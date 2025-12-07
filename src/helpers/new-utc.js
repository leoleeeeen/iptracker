export function newUtc(utc) {
    let checkUtc = Number(utc);
    if (!checkUtc) {
        return '00:00';
    }
    return (checkUtc > 0 ? "+" : "-") + ("0" + Math.abs(checkUtc)).slice(-2) + ":00";
}




