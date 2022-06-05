const MongoClient = require("mongodb").MongoClient;
const User = require("./user")

describe("User Account Management", () => {
	let client;
	beforeAll(async () => {
		client = await MongoClient.connect(
			"mongodb+srv://m001-student:satu1234@sandbox.5ovvl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
			{ useNewUrlParser: true },
		);
		User.injectDB(client);
	})

	afterAll(async () => {
		await client.close();
	})

	// test("New user registration", async () => {
	// 	const res = await User.register("tah", "password")
	// 	expect(res).toBe(1)
	// })

	// test("Duplicate username", async () => {
	// 	const res = await User.register("test", "test")
	// 	expect(res).toBe(0)
	// })

	//test("User login invalid username", async () => {
//		const res = await User.login("nizam11", "test1")
//		expect(res).toBe(null)
//	})

	// test("User login invalid password", async () => {
	// 	const res = await User.login("test", "test12")
	// 	expect(res).toBe(0) 
	// })

	// test("User login successfully", async () => {
	// 	const res = await User.login("test", "test")
	// 	expect(res).toBe(1)
	// })

	// test('should run', () => {
	// });
});