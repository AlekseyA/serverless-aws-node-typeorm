import "reflect-metadata";
import { Handler } from 'aws-lambda';
import { User } from "./entity/User";
import { dbConnect } from "../database"



export const createUser: Handler = async (event: any) => {
	try {
		const { firstName, lastName, age } = JSON.parse(event.body);
		const connection = await dbConnect(__dirname);
		const user = new User();
		user.firstName = firstName;
		user.lastName = lastName;
		user.age = age;
		await connection.manager.save(user);
		await connection.close();
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
	const connection = await dbConnect(__dirname);
	const userRepository = connection.getRepository(User);
	users = await userRepository.find();
	await connection.close();
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
	const connection = await dbConnect(__dirname);
	const userRepository = connection.getRepository(User);
	user = await userRepository.findOne(id);
	await connection.close();
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
