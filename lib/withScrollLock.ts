import { useEffect } from "react"

export const withScrollLock = (locked: boolean) => {
    useEffect(() => {
        document.body.style.overflow = locked ? "hidden" : ""
        return () => { document.body.style.overflow = "" }
    }, [locked])
}
