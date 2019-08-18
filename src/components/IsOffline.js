import React, {useState, useEffect} from 'react'

export default function IsOffline( { children } ) {
    const [onLine, setOnLine] = useState( navigator ? navigator.onLine : true )

    useEffect(() => {
        if(!window) return

        window.addEventListener('online', goOnline)
        window.addEventListener('offline', goOffline)

        return () => {
        window.removeEventListener('online', goOnline)
        window.removeEventListener('offline', goOffline)
        }
    })
    
    const goOnline = () => setOnLine(true)
    const goOffline = () => setOnLine(false)
    

    if (onLine) { return null }
    return <span>{ children }</span>
    
    

}

