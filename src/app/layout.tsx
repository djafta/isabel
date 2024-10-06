'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { createTheme, ThemeProvider } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
	palette: {
		primary: {
			main: "#006400",
		}
	}
})
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (

		<html lang="en">
			<body className={inter.className}>
				<ThemeProvider theme={theme}>
					{children}
				</ThemeProvider>

			</body>
		</html>
	);
}
