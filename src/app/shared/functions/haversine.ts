export function haversine(latA:number, lonA:number, latB:number, lonB:number):number {
    latA *= Math.PI / 180
    lonA *= Math.PI / 180
    latB *= Math.PI / 180
    lonB *= Math.PI / 180
    return 6371 * Math.acos (Math.sin (latA) * Math.sin (latB) + Math.cos (latA) * Math.cos (latB) * Math.cos (lonA-lonB))
}

export function distanceToString(d:number):string {
    return (d >= 1)? d.toFixed(3) + ' km' : ( d >= 0.010 )? (d * 1000).toFixed(0) + ' mts' : 'Mesmo local'
}
