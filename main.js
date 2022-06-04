const MongoClient = require("mongodb").MongoClient;
const User = require("./user");

MongoClient.connect(
	// TODO: Connection 
	"mongodb+srv://m001-student:satu1234@sandbox.5ovvl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
	{ useNewUrlParser: true },
).catch(err => {
	console.error(err.stack)
	process.exit(1)
}).then(async client => {
	console.log('Connected to MongoDB');
	User.injectDB(client);
})

const express = require('express')
const app = express()
const port = process.env.PORT || 3002

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'MyVMS API for Hotel',
			version: '1.0.0',
		},
	},
	apis: ['./main.js'], // files containing annotations as above
};
const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
	res.send('Hello World')
})

app.get('/hello', (req, res) => {
	res.send('Hello BENR2423')
})

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id: 
 *           type: string
 *         username: 
 *           type: string
 *         phone: 
 *           type: string
 */

/**
 * @swagger
 * /login:
 *   post:
 *     description: User Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               username: 
 *                 type: string
 *               password: 
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid username or password
 */
app.post('/login', async (req, res) => {
	console.log(req.body);

	let user = await User.login(req.body.username, req.body.password);
	console.log(user.status);
	if (user.status == ('Invalid Username' || "invalid Password")) {
		res.status(401).send("Invalid username or password");
		return
	}

	res.status(200).json({
		_id: user._id,
		username: user.username,
	});
})

/**
 * @swagger
 * /register:
 *   post:
 *     description: User Register
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               username: 
 *                 type: string
 *               password: 
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful Register new user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid username or password
 */


 app.post('/register', async (req, res) => {
	console.log(req.body);

	const reg = await User.register(req.body.username, req.body.password, req.body.phone);
	console.log(reg);

	res.json({reg})
})
// 	const reg = await User.register(req.body.username, req.body.password, req.body.name, req.body.officerno, req.body.rank, req.body.phone);
// 	console.log(reg);

// 	res.json({reg})
// })

/**
 * @swagger
 * /user/update:
 *   patch:
 *     description: User Update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               username: 
 *                 type: string
 *               password: 
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful Register new user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid username or password
 */

	app.patch('/user/update', async (req, res) => {
	//console.log(req.body);
	const log = await User.login(req.body.username, req.body.password);
	//console.log(log.status);

	if (log.status == ('invalid username' || 'invalid password')) {
		res.status(401).send("invalid username or password")
	}
	const update = await User.update(req.body.username, req.body.phone);
	res.json({update}) 
	})

	/**
 * @swagger
 * /finddata:
 *   get:
 *     description: Get username's data
 *     parameters:
 *       - in: path
 *         name: username
 *         schema: 
 *           type: string
 *         required: true
 *         description: username
 *     responses:
 *       200:
 *         description: Search successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid username
 */


	app.get('/finddata', async (req,res) => {
		//console.log(req.params.username);
		const cari = await User.find(req.params.username);
		console.log(cari);
		res.status(200).json({cari})
	})
/**
 * @swagger
 * /delete:
 *   delete:
 *     description: User delete
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               username: 
 *                 type: string

 *     responses:
 *       200:
 *         description: Successful delete the user
 *         content:
 *           application/json:
 *             schema:
 *             
 */
	app.delete('/delete', async (req, res) => {
		const del = await User.delete(req.body.username)

		res.json({del})
	
	})


app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})