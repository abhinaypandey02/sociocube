export function getAge(d:Date){
    return Math.floor(
        (Date.now() - d.getTime()) / 3.15576e10,
    )
}
export const MIN_AGE=13
export const MAX_AGE=120

export const AGE_RANGES = [
    {
        title:'<20',
        minimum:0,
        maximum:20
    },
    {
        title:'21 - 30',
        minimum:21,
        maximum:30

    },
    {
        title:'31 - 40',
        minimum:31,
        maximum:40

    },
    {
        title:'40+',
        minimum:41,
        maximum:200

    },
]

export function getAgeRange(d:Date){
    const age = getAge(d)
    for(const range of AGE_RANGES.toReversed()){
        if(age>=range.minimum && age<=range.maximum) return range
    }
    return AGE_RANGES[0]
}