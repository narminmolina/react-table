import { Button, TextInput } from '@mantine/core';
import { LoginContext } from 'contexts/LoginContext';
import { useContext } from 'react';

const hardCodedUsers = [{ email: 'user@gmail.com', password: '123456' }];

export const Login = () => {
	const loginContext = useContext(LoginContext);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const target = event.target as HTMLFormElement;
		const { value: email } = target.elements.namedItem('email') as HTMLInputElement;
		const { value: password } = target.elements.namedItem('password') as HTMLInputElement;

		if (!hardCodedUsers.find(user => user.email === email && user.password === password)) {
			alert('Invalid email or password');
			return;
		}

		loginContext?.login();

		console.log('logged in', loginContext?.isUserLoggedIn);
	};

	return (
		<form className="login-form" onSubmit={handleSubmit}>
			<TextInput type="email" name="email" label="Email" placeholder="Please enter email" required />
			<TextInput type="password" name="password" label="Password" placeholder="Please enter password" required />
			<Button type="submit" color="indigo">
				Login
			</Button>
		</form>
	);
};
