import { useMachine } from "@xstate/react";
import { createMachine } from "xstate"

const stepMachine = createMachine<'hola'>({
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

const Message: React.FC = () => {
	const [state, send] = useMachine(stepMachine);

	return <div>
		<button onClick={() => send('next')}>next</button>
		<button onClick={() => send('previous')}>previous</button>
		<div>
			{state.value === 'name' && <div>name</div>}
			{state.value === 'message' && <div>message</div>}
			{state.value === 'email' && <div>email</div>}
		</div>
	</div>	
}

export default Message