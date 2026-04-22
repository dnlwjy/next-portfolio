export function pricingLogic(a: any) {
    if (typeof a === "number") {
            if (a > 0) return `$${a}`
            if (a === 0 ) return "FREE"
            if (a < 0 ) throw new Error('price cannot be negative')
    }
    if (typeof a === "string") {
        if (a.toLowerCase() === "free") return "FREE"
        if (a === "0") return "FREE"
    }
    // fallback
    throw new Error('isi yang bener woy');
}