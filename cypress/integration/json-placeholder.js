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

})