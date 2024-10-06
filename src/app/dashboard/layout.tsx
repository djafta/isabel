'use client';

import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PrivateLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isAuth, setAuth] = useState(false);
    const router = useRouter();

    const getCookie = (name: string): string | undefined => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
    };

    useEffect(() => {
        (async () => {
            const code = getCookie('wedding-auth-cookie');

            if (code) {
                try {
                    const response = await fetch('/api/auth', {
                        body: JSON.stringify({ code }),
                        method: 'POST',
                        headers: new Headers({ 'Content-type': 'Application/Json' })
                    })

                    if (response.status === 200) {
                        const { ok } = await response.json();

                        if (ok) {
                            setAuth(true);
                        }
                    } else {
                        router.replace('/signin')
                    }
                } catch {
                    setAuth(false)
                    router.replace('/signin')
                }
            }else{
                router.replace('/signin')
            }
        })()
    }, [])

    return (
        isAuth ?
            <>
                {children}
            </>
            :
            <div className="fixed left-0 top-0 w-full h-full flex items-center justify-center">
                <CircularProgress />
            </div>
    );
}
