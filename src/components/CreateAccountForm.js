import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, TextField } from '@mui/material';

function CreateAccountForm(props) {
	const initialValues = {
		email: '',
		password: '',
		firstName: '',
		lastName: '',
	};

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
	const handleSubmit = async values => {
		console.log('Values === ');
		console.log(values);

		// Update Backend: axios post req to User

		// Update Slice?

		// Log in the user with this newly made account?
		// Redirect user to homepage? Or redirect to login page?
	};

	const errorStyle = { color: 'tomato' };
	return (
		<div>
			<h2>Create an Account</h2>
			<h4>
				Create an account and take advantage of a faster checkout and other
				benefits.
			</h4>
			<Formik
				initialValues={initialValues}
				validate={handleValidation}
				onSubmit={handleSubmit}
			>
				<Form>
					{/* <Field type="email" name="email" placeholder="Email" /> */}
					<TextField
						name="email"
						type="email"
						label="email"
						variant="outlined"
					/>

					<ErrorMessage
						name="email"
						// 'render' is used to apply style to render error message div
						render={msg => <div style={errorStyle}>{msg}</div>}
					/>

					<Field type="password" name="password" />
					<ErrorMessage
						name="password"
						render={msg => <div style={errorStyle}>{msg}</div>}
					/>

					<Button type="submit" variant="contained">
						Submit
					</Button>
				</Form>
			</Formik>
		</div>
	);
}

export default CreateAccountForm;
