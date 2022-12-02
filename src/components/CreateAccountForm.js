import React from 'react';
import { useFormik } from 'formik';
import { Box, Button, TextField } from '@mui/material';

function CreateAccountForm(props) {
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			firstName: '',
			lastName: '',
		},
		onSubmit: async values => {
			console.log(values);
			// Update Backend: axios post req to User
			// Update Slice?
			// Log in the user with this newly made account?
			// Redirect user to homepage? Or redirect to login page?
		},
	});

	/**
	 *
	 * Checks if values, which is an object with each field as keys, are valid.
	 * Returns an errors object, where keys are the fields that have errors,
	 * and their associated values are the error message as a string.
	 *
	 */
	const handleValidation = values => {
		const errors = {};
		// Check values here.
		if (!values.email) errors.email = 'Required';
		if (!values.password) errors.password = 'Required';
		return errors;
	};

	return (
		<div>
			<h2>Create an Account</h2>
			<h4>
				Create an account and take advantage of a faster checkout and other
				benefits.
			</h4>

			<Box component="form" onSubmit={formik.handleSubmit}>
				{/* <Field type="email" name="email" placeholder="Email" /> */}
				<TextField
					name="email"
					type="email"
					label="Email"
					variant="outlined"
					onChange={formik.handleChange}
					value={formik.values.email}
				/>

				<TextField
					name="password"
					type="password"
					label="Password"
					variant="outlined"
					onChange={formik.handleChange}
					value={formik.values.password}
				/>

				<Button type="submit" variant="contained">
					Submit
				</Button>
			</Box>
		</div>
	);
}

export default CreateAccountForm;
