describe('Testing JSON Placeholder API GET Method', () => {
	/**
	 * This scenario will be handling a simple GET request and checking its status code to be at least 200 but not greather then 400 
	 * This will ensure that any status code outside the success spectre will not be there. 
	 * Based on https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status 
	*/
	it ('Validating Response Code', () => {
		cy.request({
			method: 'GET',
			url: Cypress.env('baseUrl'),
			headers: {
				'Content-Type': "application/json"
			}
		}).then((response) => {
			expect(response.headers).to.not.be.null
			expect(response).to.have.property('status', 200).and.not.greaterThan(400)
		})
	})
	/**
	 * This scenario will check if the content-type present within the header will be matching the expected application/json
	*/
	it('Validating Response Header', () => {
		cy.request({
			method: 'GET',
			url: Cypress.env('baseUrl'),
			headers: {
				'Content-Type': "application/json"
			}
		}).then((response) => {
			expect(response.headers).to.not.be.null
			expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')
		})
	})
	/**
	 * This scenario will check if all the objects within the response body will have the keys related to the endpoint. 
	*/
	it('Validating Response Body', () => {
		cy.request({
			method: 'GET',
			url: Cypress.env('baseUrl'),
			headers: {
				'Content-Type': "application/json"
			}
		}).then((response) => {
			expect(response.body).to.not.be.null
			expect(response.body.length).to.eq(100)
			Cypress._.each(response.body, (body) => {
				expect(body).to.have.all.keys('body', 'id', 'title', 'userId')
			})

		})
	})

	/**
	 * Checking if the endpoint returns only the post identified with the provided ID
	*/
	it('Validating Response Body - Checking Post ID', () => {
		cy.request({
			method: 'GET',
			url: Cypress.env('baseUrl') +'/1',
			headers: {
				'Content-Type': "application/json"
			},
		}).then((response) => {
			expect(response.body).to.not.be.null
			expect(response.body).to.have.all.keys('body', 'id', 'title', 'userId')
			expect(response.body.id).to.eq(1).and.not.eq(2)
		})
	})
	/**
	 * Checking the response for a request with post ID greater then 100
	*/
	it('Validating Response Body - Checking Post ID greater than 100', () => {
		cy.request({
			method: 'GET',
			url: Cypress.env('baseUrl') +'/101',
			headers: {
				'Content-Type': "application/json"
			},
			'failOnStatusCode': false
		}).then((response) => {
			expect(response).to.have.property('status', 404).and.greaterThan(400)
		})
	})
})
describe('Testing JSON Placeholder API POST Method', () => {
	/**
	 * This scenario will create a simple POST request with a complete body and check its status code to be at least 200 but not greather then then 400 
	 * This will ensure that any status code outside the success spectre will not be there. 
	 * Based on https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status 
	*/
	it ('Validating Response Code', () => {
		cy.request({
			method: 'POST',
			url: Cypress.env('baseUrl'),
			headers: {
				'Content-Type': "application/json"
			}, 
			body: {
				'title': 'QA Automation Proccess',
				'body': 'Testing APIs with Cypress and Javascript',
				'userId': 1
			}
		}).then((response) => {
			expect(response.headers).to.not.be.null
			expect(response).to.have.property('status', 201).and.not.greaterThan(400)
		})
	})
	/**
	 * This scenario will check the response header for a simple POST request with a complete body
	*/
	it('Validating Response Header', () => {
		cy.request({
			method: 'POST',
			url: Cypress.env('baseUrl'),
			headers: {
				'Content-Type': "application/json"
			}, 
			body: {
				'title': 'QA Automation Proccess',
				'body': 'Testing APIs with Cypress and Javascript',
				'userId': 1
			}
		}).then((response) => {
			expect(response.headers).to.not.be.null
			expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')
		})
	})
	/**
	 * This scenario will check if the response will have the new post created by checking the data from title, body, userId and Id
	*/
	it('Validating Response Body', () => {
		cy.request({
			method: 'POST',
			url: Cypress.env('baseUrl'),
			headers: {
				'Content-Type': "application/json"
			},
			body: {
				'title': 'QA Automation Proccess',
				'body': 'Testing APIs with Cypress and Javascript',
				'userId': 1
			}
		}).then((response) => {
			expect(response.statusText).to.be.equal('Created')
			expect(response.isOkStatusCode).to.be.equal(true)
			expect(response.body).to.have.property('id', 101)
			expect(response.body).to.have.property('title', 'QA Automation Proccess')
			expect(response.body).to.have.property('body', 'Testing APIs with Cypress and Javascript')
			expect(response.body).to.have.property('userId', 1)
		})
	})
	/**
	 * This scenario will check the creation of a post withou using the userId 
	*/
	it('Validating Response Body - Without User ID', () => {
		cy.request({
			method: 'POST',
			url: Cypress.env('baseUrl'),
			headers: {
				'Content-Type': "application/json"
			},
			body: {
				'title': 'QA Automation Proccess',
				'body': 'Testing APIs with Cypress and Javascript'
			}
		}).then((response) => {
			expect(response.statusText).to.be.equal('Created')
			expect(response.isOkStatusCode).to.be.equal(true)
			expect(response.body).to.have.property('id', 101)
			expect(response.body).to.not.have.property('userId')
		})
	})
})