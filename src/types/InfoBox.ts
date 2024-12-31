export interface InfoBox {
    coordinates: [number, number, number],
    name: string,
    key: number,
    images?: string[],
    text?: string
    color?: string
    component?: () => JSX.Element
}