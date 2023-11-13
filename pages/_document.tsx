import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
	static async getInitialProps( ctx ) {
		const initialProps = await Document.getInitialProps( ctx )
		return { ...initialProps }
	}

	render() {
		return (
			<Html lang="en">
				<Head>
					<link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
					<style>{`
            body {
              background-color: #5d56a3;
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
