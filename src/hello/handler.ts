import "reflect-metadata";
import { Handler } from 'aws-lambda';
// import { dbConnect } from "../database"


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
