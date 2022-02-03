import signupPage from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'

describe('Signup', function() {

    var deliver;

    beforeEach(function(){
        deliver = signupFactory.deliver()
    })

    it('User should be deliver', function(){

        signupPage.go() //ir para pagina de cadastro
        signupPage.fillForm(deliver) //preencher formulario
        signupPage.submit() //enviar formulario
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signupPage.modalContentShouldBe(expectedMessage)
    })

    it('Invalid document', function(){
        
        deliver.cpf = '000000141AA'

        signupPage.go() //ir para pagina de cadastro
        signupPage.fillForm(deliver) //preencher formulario
        signupPage.submit() //enviar formulario
        const expectedMessage = 'Oops! CPF inválido'
        signupPage.alertMessageShouldBe(expectedMessage) //verificar alerta
    })

    it('Invalid email', function(){
        
        deliver.email = 'teste.gmail.com'

        signupPage.go() //ir para pagina de cadastro
        signupPage.fillForm(deliver) //preencher formulario
        signupPage.submit() //enviar formulario
        const expectedMessage = 'Oops! Email com formato inválido.'
        signupPage.alertMessageShouldBe(expectedMessage) //verificar alerta
    })

    context('Required fields', function(){

        const messages = [
            {field: 'name', output: 'É necessário informar o nome'},
            {field: 'cpf', output: 'É necessário informar o CPF'},
            {field: 'email', output: 'É necessário informar o email'},
            {field: 'postalcode', output: 'É necessário informar o CEP'},
            {field: 'number', output: 'É necessário informar o número do endereço'},
            {field: 'deliver_method', output: 'Selecione o método de entrega'},
            {field: 'cnh', output: 'Adicione uma foto da sua CNH'}
        ]

        before(function(){
            
            signupPage.go()
            signupPage.submit()
        })

        messages.forEach(function(msg){

            it(`${msg.field} is required`, function(){
                signupPage.alertMessageShouldBe(msg.output)
            })
        })
    })

})

