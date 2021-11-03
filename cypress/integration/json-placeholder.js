describe('Testing JSON Placeholder API', () => {
	it ('Validating Response Code - Get Method', () => {
		cy.request({
			method: 'GET',
			url: Cypress.env('baseUrl'),
			headers: {
				'Content-Type': "application/json"
			}
		}).then((response) => {
			console.log(response)
			expect(response.headers).to.not.be.null
			expect(response).to.have.property('status', 200).and.not.greaterThan(400)
		})
	})
	it('Validating Response Header - Get Method', () => {
		cy.request({
			method: 'GET',
			url: Cypress.env('baseUrl'),
			headers: {
				'Content-Type': "application/json"
			}
		}).then((response) => {
			console.log(response)
			expect(response.headers).to.not.be.null
			expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')
		})
	})
	it('Validating Response Body - Get Method', () => {
		cy.request({
			method: 'GET',
			url: Cypress.env('baseUrl'),
			headers: {
				'Content-Type': "application/json"
			}
		}).then((response) => {
			console.log(response)
			expect(response.body).to.not.be.null
			expect(response.body.length).to.eq(100)
			Cypress._.each(response.body, (body) => {
				expect(body).to.have.all.keys('body', 'id', 'title', 'userId')
			})

		})
	})
	it ('Validating Response Code - Post Method', () => {
		cy.request({
			method: 'POST',
			url: Cypress.env('baseUrl'),
			headers: {
				'Content-Type': "application/json"
			}, 
			body: {
				'title': 'QA Automation Proccess',
				'body': 'Testing APIs with Cypress and Javascript',
				'usedId': 1
			}
		}).then((response) => {
			console.log(response)
			expect(response.headers).to.not.be.null
			expect(response).to.have.property('status', 201).and.not.greaterThan(400)
		})
	})
	it('Validating Response Header - Post Method', () => {
		cy.request({
			method: 'POST',
			url: Cypress.env('baseUrl'),
			headers: {
				'Content-Type': "application/json"
			}, 
			body: {
				'title': 'QA Automation Proccess',
				'body': 'Testing APIs with Cypress and Javascript',
				'usedId': 1
			}
		}).then((response) => {
			console.log(response)
			expect(response.headers).to.not.be.null
			expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')
		})
	})
	it('Validating Response Body - Post Method', () => {
		cy.request({
			method: 'POST',
			url: Cypress.env('baseUrl'),
			headers: {
				'Content-Type': "application/json"
			},
			body: {
				'title': 'QA Automation Proccess',
				'body': 'Testing APIs with Cypress and Javascript',
				'usedId': 1
			}
		}).then((response) => {
			console.log(response)
			expect(response.statusText).to.be.equal('Created')
			expect(response.isOkStatusCode).to.be.equal(true)
			expect(response.body).to.have.property('id', 101)
			expect(response.body).to.have.property('title', 'QA Automation Proccess')
			expect(response.body).to.have.property('body', 'Testing APIs with Cypress and Javascript')
			expect(response.body).to.have.property('usedId', 1)
		})
	})
})