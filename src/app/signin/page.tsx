'use client';

import { Button, FormControl, FormHelperText, FormLabel, Input, LinearProgress } from "@mui/material";
import { useCallback, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { PDF } from "@/app/dashboard/pdf";

export default function Page() {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSignIn = useCallback(async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);
		const target = event.currentTarget;
		const data = new FormData(target);
		const code = data.get('code');

		if (code) {
			try {
				const response = await fetch('/api/auth', {
					body: JSON.stringify({ code }),
					method: 'POST',
					headers: new Headers({'Content-type': 'Application/Json'})
				})

				if (response.status === 200) {
					const { ok } = await response.json();

					if (ok) {
						document.cookie = `wedding-auth-cookie=${code}`
						router.push('/dashboard');
					}
				}
			} finally {
				target.reset();
				setLoading(false)
			}
		}

	}, [router]);

	return (
		<main className={'fixed left-0 top-0 w-full h-full flex md:bg-slate-100 p-2'}>
			<div className={'md:relative bg-white m-auto w-full max-w-4xl rounded-3xl p-3 md:p-10'}>
				<div className={'absolute top-0 left-0 w-full h-1 md:h-[2px] md:px-4 lg:px-10'}>
					{
						loading && <LinearProgress className={'h-[inherit] '} />
					}
				</div>
				<div className={'bg-white m-auto w-full rounded-3xl flex flex-col gap-5'}>
					<div className={'flex flex-col gap-5'}>
						<h1 className="text-4xl">Camila & Helder</h1>
					</div>
					<div className={'flex flex-col md:flex-row gap-10 justify-between'}>
						<div>
							<h2 className={'text-3xl'}>Sign in</h2>
							<p className={'text-gray-700 my-3'}>Use suas credênciais</p>
						</div>
						<div className={'self-end w-full md:max-w-sm bg-white'}>
							<form onSubmit={handleSignIn} className={'w-full flex flex-col gap-10'}>
								<FormControl fullWidth>
									<FormLabel>Código</FormLabel>
									<Input placeholder={'0000'} type={'text'}
										name={'code'} />
									<FormHelperText>
										Use seu código de acesso para entrar.
									</FormHelperText>
								</FormControl>
								<div className={'w-full flex items-center justify-end'}>
									<Button variant={'contained'} className={'self-end'}
										type={'submit'}>Continuar</Button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}