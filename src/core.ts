
const RE = /([-+])? *(\d+)?:([0-5]?[0-9])?/

export function calculate(value: string): number {
    let at = 0;
    let minutes = 0;
    
    while (at < value.length) {
        let m = RE.exec(value.slice(at));
        if (!m) break;
        
        let positive = m[1] !== '-',
            hour = parseInt(m[2] || '0', 10),
            minute = parseInt(m[3] || '0', 10);
        
        minutes += (hour * 60 + minute) * (positive ? 1 : -1);
        at += m[0].length;
    }
    return minutes;
}

export function formatHours(minutes: number) {
    return (minutes > -1 ? '' : '-') +
        (Math.floor(Math.abs(minutes / 60)) + ":") +
        (Math.abs(minutes % 60) + '').padStart(2, '0');
}
