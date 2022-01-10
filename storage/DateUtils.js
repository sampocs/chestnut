export const getCurrentWeek = () => {
    const sunday = new Date();
    const dowOffset = sunday.getDay();
    sunday.setDate(sunday.getDate() - dowOffset);
    
    return sunday
}

export const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}` 
}

export const addWeek = (startDate, numDays) => {
    startDate.setDate(startDate.getDate() + (numDays * 7));
    return startDate
}