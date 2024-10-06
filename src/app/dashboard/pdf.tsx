import { Document, Page, View, Text, StyleSheet, PDFViewer, Image, Font, Link, Svg } from '@react-pdf/renderer';

export function PDF({ quantity, table, guests }: { quantity: number, table: string, guests: string }) {

	Font.register({
		family: 'Liberation',
		src: '/Liberation.ttf'
	})

	const styles = StyleSheet.create({
		page: {
			flexDirection: 'column',
			backgroundColor: '#ffffff',
			padding: 0,
		},
		header: {
			display: 'flex',
			height: '35%',
			justifyContent: 'flex-end',
			textAlign: 'center',
			fontSize: '12pt'
		},
		body: {
			display: 'flex',
			height: '50%',
			justifyContent: 'center',
			textAlign: 'center',
			fontSize: '12pt',
			gap: '10px'
		},
		footer: {
			display: 'flex',
			flexDirection: 'column',
			height: '50%',
			alignItems: 'center',
			fontSize: '10pt',
			padding: '20px',
			gap: '5px',
			color: 'rgb(0,0,0)'
		},
		section: {
			margin: 0,
			padding: 0,
			flexGrow: 1,
		},
		title: {
			fontSize: 24,
			marginBottom: 20,
		},
		text: {
			marginBottom: 10,
		},
		backgroundImage: {
			position: 'absolute',
			width: '100%',
			height: '100%',
			zIndex: -1,
		},
		underlined: {
			borderBottom: '1px solid #006400',
			maxWidth: '360px',
			marginLeft: '89px',
		}
	});


	return (
		<Document subject={ `${ guests } Invitation` } title={ `${ guests } Invitation` }>
			<Page size={ { width: '539', height: '328' } } orientation={ 'portrait' } style={ styles.page }>
				<Image
					src="/bg.png"
					style={ styles.backgroundImage }
				/>
				<View style={ styles.body }>
					<Text style={ { ...styles.text, ...styles.underlined, marginTop: '50px' } }>
						{ guests }
					</Text>
				</View>
				<View style={ styles.footer }>
					<Text style={ { ...styles.text, fontSize: '12pt' } }>
						a realizar-se no dia 27 de Outubro de 2024, à 14h00, na
						<Link style={ { color: 'rgb(0,100,0)', fontSize: '12pt' } }
						      href='https://maps.app.goo.gl/AsT32mdkN67UXvfB6'>
							{ ' casa da noiva.' }
						</Link>
					</Text>
					<Text style={ { ...styles.text, fontSize: '12pt' } }>
						A sua presença será digna do nosso maior apreço!
					</Text>
					<Text style={ { ...styles.text, fontSize: '12pt' } }>
						Convite válido para { quantity } pessoas (não extensivo a criaças)
					</Text>
					<Text style={ { ...styles.text, fontSize: '12pt' } }>
						Mesa { table }
					</Text>
				</View>
			</Page>
		</Document>
	)
}
