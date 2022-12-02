import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button, TextField } from '@mui/material';
import { flexbox } from '@mui/system';

const validationSchema = yup.object({
	email: yup
		.string('Enter your email')
		.email('Enter a valid email')
		.required('Email is required'),
	password: yup
		.string('Enter your password')
		.min(3, 'Password should be a minimum 3 characters')
		.required('Password is required'),
	confirmPassword: yup
		.string('Confirm password')
		// This is how you look at 'password' and make sure it is the same:
		.oneOf([yup.ref('password'), null], 'Passwords should match'),
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

	return (
		<div>
			<h2>Create an Account</h2>
			<h4>
				Create an account and take advantage of a faster checkout and other
				benefits.
			</h4>

			<Box component="form" onSubmit={formik.handleSubmit}>
				<Box margin={1}>
					<TextField
						name="username"
						type="username"
						label="Username*"
						variant="outlined"
						fullWidth
						value={formik.values.username}
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						error={formik.touched.username && Boolean(formik.errors.username)}
						helperText={formik.touched.username && formik.errors.username}
					/>
				</Box>

				<Box margin={1}>
					<TextField
						name="email"
						type="email"
						label="Email*"
						fullWidth
						variant="outlined"
						value={formik.values.email}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.email && Boolean(formik.errors.email)}
						helperText={formik.touched.email && formik.errors.email}
					/>
				</Box>

				<Box margin={1}>
					<TextField
						name="password"
						type="password"
						label="Password*"
						variant="outlined"
						fullWidth
						value={formik.values.password}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.password && formik.errors.password}
						helperText={formik.touched.password && formik.errors.password}
					/>
				</Box>

				<Box margin={1}>
					<TextField
						name="confirmPassword"
						type="password"
						label="Confirm Password*"
						variant="outlined"
						fullWidth
						value={formik.values.confirmPassword}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.confirmPassword && formik.errors.confirmPassword
						}
						helperText={
							formik.touched.confirmPassword && formik.errors.confirmPassword
						}
					/>
				</Box>

				<Box margin={1}>
					<TextField
						name="firstName"
						type="firstName"
						label="First Name"
						variant="outlined"
						fullWidth
						value={formik.values.firstName}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						helperText={formik.touched.firstName && formik.errors.firstName}
					/>
				</Box>

				<Box margin={1}>
					<TextField
						name="lastName"
						type="lastName"
						label="Last Name"
						variant="outlined"
						fullWidth
						value={formik.values.lastName}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						helperText={formik.touched.lastName && formik.errors.lastName}
					/>
				</Box>

				<Button type="submit" variant="contained">
					Submit
				</Button>
			</Box>
		</div>
	);
}

export default CreateAccountForm;
