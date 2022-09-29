import { styled } from "@/stitches.config";
import { useMachine } from "@xstate/react";
import { createMachine } from "xstate"

import SendIcon from "@/components/svgs/Send";
import { slate } from "@radix-ui/colors";
import { useRef, useState } from "react";
import Box from "@/components/global/Box";
import Send from "@/components/svgs/Send";
import Image from "next/image";

type StepState = 
	| { value: "name", context: unknown }
	| { value: "message", context: unknown }
	| { value: "email", context: unknown }

type StepEvent =
	| { type: 'next', step: StepState['value'] }
	| { type: 'previous', step: StepState['value'] }

const stepMachine = createMachine<unknown, StepEvent, StepState>({
	id: 'steps-message',
	initial: 'name',
	states: {
		name: {
			on: {
				next: 'message'
			}
		},
		message: {
			on: {
				previous: 'name',
				next: 'email'
			}
		},
		email: {
			on: {
				previous: 'message',
			}
		},
	}
})

const StyledContainer = styled('div', {
	backgroundColor: '$slate2',
	borderRadius: 16,
	padding: "16px 10%"
})

const StyledInput = styled('input', {
	padding: "8px 32px 8px 12px",
	border: '1px solid $slate4',
	backgroundColor: '$slate2',
	borderRadius: 50,

	'&:focus': {
		outlineColor: '$blue8',
		borderColor: '$blue8'
	}
})

const StyledSend = styled(SendIcon, {
	zIndex: 2,
	position: 'relative',
	right: 30
})

// iMessage-like styled input
const Input: React.FC<{
	send: (event: StepEvent) => void
}> = () => {
	const [text, setText] = useState('');

	return (
		<Box>
			<Box as={'form'} css={{
				display: 'flex',
				alignItems: 'center',
				position: 'relative',
			}} onSubmit={() => {
				console.log
			}}>
				<StyledInput
					placeholder="Name"
					value={text}
					onChange={(event) => {
						setText(event.target.value)
					}}
				/>
				<StyledSend width={24} fill={slate.slate5} />
			</Box>
		</Box>
	)
}

const Message: React.FC = () => {
	const [state, send] = useMachine(stepMachine);

	return <StyledContainer>
		State: {String(state.value)}
		<Input send={send}/>
	</StyledContainer>	
}

export default Message