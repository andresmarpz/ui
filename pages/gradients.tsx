import Title from '@/components/global/Title'
import TextGradient from '@/components/gradients/TextGradient'
import { NextPage } from 'next'
import Head from 'next/head'

const Gradients: NextPage = () => {
    return (
        <>
			<Head>
				<title>Gradients</title>
			</Head>
            <Title size="large" css={{ marginTop: 40 }}>
                Gradients
            </Title>

            <TextGradient gradient="linear-gradient(to right, #30CFD0 0%, #330867 100%)">
                this is a text gradient
            </TextGradient>
        </>
    )
}

export default Gradients
