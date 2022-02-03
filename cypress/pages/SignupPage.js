
class SignupPage{

    go() {

        //site onde sera feito o teste
        cy.visit('/')
 
        //clica no bota para fazer cadastro
        cy.get('a[href="/deliver"]').click()
        //verifica se a pagina esta correta
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
    }

    fillForm(deliver){
        
        //preenchendo dados pessoais
        cy.get('input[placeholder="Nome completo"]').type(deliver.name)
        cy.get('input[placeholder="CPF somente números"]').type(deliver.cpf)
        cy.get('input[name="email"]').type(deliver.email)
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp)
     
        //preenchendo endereco
        cy.get('input[name="postalcode"]').type(deliver.adress.postalcode)
        cy.get('input[type=button][value="Buscar CEP"]').click()
 
        //validação dos campos preenchidos automaticamente
        cy.get('input[name="address"]').should('have.value', deliver.adress.street)
        cy.get('input[name="district"]').should('have.value', deliver.adress.district)
        cy.get('input[name="city-uf"]').should('have.value', deliver.adress.city_uf)
 
        //preenchendo demais campos
        cy.get('input[name="address-number"]').type(deliver.adress.number)
        cy.get('input[name="address-details"]').type(deliver.adress.details)
 
        //selecionando metodo de entrega
        cy.contains('.delivery-method li', deliver.delivery_method).click()
 
        //upload cnh
        cy.get('input[accept^="image"]').attachFile('/images/' + deliver.cnh)
    }

    submit(){

        //enviando formulario
        cy.get('form button[type="submit"]').click()
    }

    modalContentShouldBe(expectedMessage){

        cy.get('.swal2-container .swal2-html-container').should('have.text', expectedMessage)
    }

    alertMessageShouldBe(expectedMessage){

        cy.contains('.alert-error', expectedMessage).should('be.visible')
    }
}

export default new SignupPage;