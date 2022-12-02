import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function CreateAccountForm(props) {
	const initialValues = {
		email: '',
		password: '',
		firstName: '',
		lastName: '',
	};

	const handleValidation = values => {
		const errors = {};

		// Check values here.
		if (!values.email) errors.email = 'Required';
		if (!values.password) errors.password = 'Required;';
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

	return (
		<div>
			<h2>Create an Account</h2>
			<Formik
				initialValues={initialValues}
				validate={handleValidation}
				onSubmit={handleSubmit}
			>
				<Form>
					<Field type="email" name="email" placeholder="Email" />
					<ErrorMessage name="email" component="div" />
					<Field type="password" name="password" />
					<ErrorMessage name="password" component="div" />
					<button type="submit">Submit</button>
				</Form>
			</Formik>
		</div>
	);
}

export default CreateAccountForm;
