import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button, TextField } from '@mui/material';

const validationSchema = yup.object({
	email: yup
		.string('Enter your email')
		.email('Enter a valid email')
		.required('Email is required'),
	password: yup
		.string('Enter your password')
		.min(3, 'Password should be a minimum 3 characters')
		.required('Password is required'),
	firstName: yup
		.string('Enter your first name')
		.required('First name is required'),
	lastName: yup
		.string('Enter your last name')
		.required('Last name is required'),
});

function CreateAccountForm(props) {
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			firstName: '',
			lastName: '',
		},
		validationSchema: validationSchema,
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
					value={formik.values.email}
					onChange={formik.handleChange}
				/>

				<TextField
					name="password"
					type="password"
					label="Password"
					variant="outlined"
					value={formik.values.password}
					onChange={formik.handleChange}
				/>

				<TextField
					name="firstName"
					type="firstName"
					label="First Name"
					variant="outlined"
					value={formik.values.firstName}
					onChange={formik.handleChange}
				/>

				<TextField
					name="lastName"
					type="lastName"
					label="Last Name"
					variant="outlined"
					value={formik.values.lastName}
					onChange={formik.handleChange}
				/>
				<Button type="submit" variant="contained">
					Submit
				</Button>
			</Box>
		</div>
	);
}

export default CreateAccountForm;
