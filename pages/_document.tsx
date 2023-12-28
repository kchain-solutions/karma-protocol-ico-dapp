import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
	static async getInitialProps( ctx ) {
		const initialProps = await Document.getInitialProps( ctx )
		return { ...initialProps }
	}

	render() {
		return (
			<Html lang="en">
				<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
				<Head>
					<link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
					<style>{`
            body {
              background-color: #4B4685;
            }
          `}</style>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
