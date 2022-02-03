const faker = require ('../../node_modules/faker')
var cpf = require ('gerador-validador-cpf')

export default {

    deliver: function(){

        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()

        var data = {
            name: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            email: faker.internet.email(firstName),
            whatsapp: '35999999999',
            adress: {
                postalcode: '13098401',
                street: 'Rua Ramão Olavo Saravy Filho',
                number: 1042,
                details:'Apto 2, bloco 1',
                district: 'Jardim Myrian Moreira da Costa',
                city_uf: 'Campinas/SP'
            },
            delivery_method: 'Moto',
            cnh: 'cnh-digital.jpg'
        }

        return data
    }
    
}