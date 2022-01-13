import "reflect-metadata";
import { Handler } from 'aws-lambda';
import { User } from "./entity/User";
import { dbConnect } from "./entity"



export const createUser: Handler = async (event: any) => {
	try {
		const { firstName, lastName, age } = JSON.parse(event.body);
		const connection = await dbConnect();
		const user = new User();
		user.firstName = firstName;
		user.lastName = lastName;
		user.age = age;
		await connection.manager.save(user);
	} catch (error) {
		console.log(error);
	}
	return {
		statusCode: 200,
		body: JSON.stringify(
			{
				message: "Hi from create path",
			},
			null,
			2
		),
	};
}

export const getUsers: Handler = async () => {
	let users: User[];
	const connection = await dbConnect();
	const userRepository = connection.getRepository(User);
	users = await userRepository.find();

	return {
		statusCode: 200,
		body: JSON.stringify(
			{
				message: "Hi from get users path",
				users
			},
			null,
			2
		),
	};
};

export const getUserById = async (event: any) => {
	const id = event.pathParameters.id;
	let user: User;
	const connection = await dbConnect();
	const userRepository = connection.getRepository(User);
	user = await userRepository.findOne(id);

	return {
		statusCode: 200,
		body: JSON.stringify(
			{
				message: "Hi from get user by id",
				user
			},
			null,
			2
		),
	};
};

export const baseReq: Handler = async () => {
	return {
		statusCode: 200,
		body: JSON.stringify(
			{
				message: "Hi from base path"
			},
			null,
			2
		),
	};
}

export const helloReq: Handler = async () => {
	return {
		statusCode: 200,
		body: JSON.stringify(
			{
				message: "Hi from hello path"
			},
			null,
			2
		),
	};
}