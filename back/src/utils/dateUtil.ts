
export function timestampToDate(timestamp: number): Date {
    return new Date(timestamp);  
}

export function sqliteToDate(dateString: string): Date {
    return new Date(dateString); 
}