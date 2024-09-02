export default function extractTime(dataString:string){ 
    const date= new Date(dataString);
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    return `${hours}:${minutes}`;
}

function padZero(num:number){
    return num.toString().padStart(2, '0');
}