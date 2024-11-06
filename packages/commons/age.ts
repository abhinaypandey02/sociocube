export function getAge(d:Date){
    return Math.floor(
        (Date.now() - d.getTime()) / 3.15576e10,
    )
}
export const MIN_AGE=13
export const MAX_AGE=120