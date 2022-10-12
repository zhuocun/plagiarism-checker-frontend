import React from "react";
import watermark from "../../assets/images/watermark.png"
import styles from "./Watermark.module.css"


interface PropsType {
    left?: string
    top?: string
}

export const Watermark: React.FC<PropsType> = ({left = "50%", top = "50%"}) => {


    return (
        <div>
            <img src={watermark} alt="" className={styles["watermark"]}
                 style={{left, top}}
            />
        </div>

    )
}
