import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/Home.module.scss';



export default function Filters ({props}) {

    const slider1 = useRef()
    const slider2 = useRef()
    const [lowerVal, setLowerVal] = useState()
    const [upperVal, setUpperVal] = useState()



    return (
        <>
            <span className={`${styles.multiRange}`}>
                <div className={styles.sliderTrack}></div>
                <input className={`${styles.inputRange}`} ref={slider1} onChange={e => handleChangeLower(e.target.value)} type="range" min="0" max="300" defaultValue="25" />
                <input className={`${styles.inputRange}`} ref={slider2} onChange={e => handleChangeUpper(e.target.value)} type="range" min="0" max="300" defaultValue="85" />
            </span>

        </>
    )
}
