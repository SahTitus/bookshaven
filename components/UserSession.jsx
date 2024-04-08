'use client'
import { userData } from '@redux/features/authSlice';
import { useAppDispatch } from '@redux/store';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'

export const UserSession = () => {
    const session = useSession();
    const dispatch = useAppDispatch()

    useEffect(() => {
        const { status, data } = session;

        if (status === "authenticated" && data?.user?.email) {
            dispatch(userData(data.user));
        }

    }, [session]);

    return (
        <div></div>
    )
}
