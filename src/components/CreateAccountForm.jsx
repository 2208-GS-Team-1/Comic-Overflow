import React from 'react';
import { Formik } from 'formik';
import { Field } from 'pg-protocol/dist/messages';

function CreateAccountForm(props) {
	const initialValues = {
		email: '',
		password: '',
		firstName: '',
		lastName: '',
	};

	return (
		<div>
			hello world
			{/* <Formik initialValues={initialValues}>
				<Form>
					<Field type="email" name="email" />
					<Field type="password" name="password" />
					<button type="submit">Submit</button>
				</Form>
			</Formik> */}
		</div>
	);
}

export default CreateAccountForm;
