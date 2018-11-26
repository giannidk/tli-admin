export function makeShortDate(date){
    const longDate = new Date(date);
    const shortDate = (`${longDate.getDate()}-${longDate.getMonth()+1}-${longDate.getFullYear()}`);
    return shortDate;
}
