'use client'
import React from "react";
import styles from "./Spinner.module.css";
import { useStateContex } from "@redux/StateProvider";
import { Backdrop } from "@components/Backdrop";


export const SpinnerOverlay = () => {
    const { showLoaderOverlay } = useStateContex();
    return (
        <div className={`${showLoaderOverlay ? 'flex' : 'hidden'}  z-[10000]`}>
            <div className={`flex items-center justify-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-52 h-52 z-[100`}>
                <div className={styles.spin}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
                <Backdrop />
        </div>
    );
};
