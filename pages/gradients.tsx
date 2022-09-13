import TextGradient from "@/components/gradients/TextGradient";
import { NextPage } from "next";

const Gradients: NextPage = () => {
	return <>
		<h1>Gradients!</h1>

		<TextGradient gradient="linear-gradient(to right, #30CFD0 0%, #330867 100%)">this is a text gradient</TextGradient>
	</>
}

export default Gradients