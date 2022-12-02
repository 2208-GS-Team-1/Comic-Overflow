import React from 'react';
import CreateAccountForm from './CreateAccountForm.jsx';
import { Box } from '@mui/material';

function CreateAccountContainer() {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<h2>Create an Account</h2>
			<h4>
				Create an account and take advantage of a faster checkout and other
				benefits.
			</h4>
			<CreateAccountForm />
		</Box>
	);
}

export default CreateAccountContainer;
