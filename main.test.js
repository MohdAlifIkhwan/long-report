const supertest = require('supertest');
const request = supertest('http://localhost:3030');

describe('Express Route Test', function () {
	it('should return hello world', async () => {
		return request.get('/hello')
			.expect(200)
			.expect('Content-Type', /text/)
			.then(res => {
				expect(res.text).toBe('Hello BENR2423');
			});
	})

	it('login successfully', async () => {
		return request
			.post('/login')
			.send({username: 'test', password: "test" })
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body).toEqual(
					expect.objectContaining({
						_id: expect.any(String),
						name: expect.any(String),
						age: expect.any(Number),
					})
				);
			});
	});

	// it('login failed', async () => {
	// })

	it('register', async () => {
		return request
			.post('/register')
			.send({username: 'user6', password: "test" })
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body).toEqual(
					expect.objectContaining({
						_id: expect.any(String),
						name: expect.any(String),
						age: expect.any(Number),
					})
				);
			});
	});

	it('login successfully', async () => {
		return request
			.post('/login/update')
			.send({username: 'user1', password: "test" })
			.send({Name: 'Nizam', Phone: '0136797035', Email: 'nizamrosli.nr99@gmail.com'})
			.expect('Content-Type', /text/)
			.expect(200).then(response => {
				expect(response.body).toEqual(
					expect.objectContaining({
						_id: expect.any(String),
						Name: expect.any(String),
						Phone: expect.any(Number),
						Email: expect.any(Number),
					})
				);
			});
	});

	// it('register failed', async () => {
	// })
});