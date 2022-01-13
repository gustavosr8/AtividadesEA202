# Caso de Uso: Cancelamento de compra

**Autor:** Gustavo de Souza dos Reis

## Descrição
O caso de uso aqui descrito é o de cancelamento de compra. Nele, o usuário tem a opção de cancelar uma passagem comprada por ele previamente, digitando o ID da passagem que deseja cancelar, e o nome de cadastro de quem fez a compra.

## Interface
Para a interface gráfica, foi utilizado o bootstrap. Uma versão preliminar pode ser vista abaixo:

[//]: # (![Versão preliminar da interface gráfica](aula12/Transportes/designdetalhado/uc2/assets/interface.png))

Como pode ser observado, o usuário preenche os campos para identificar o passagem a ser cancelada, e confirma o cancelamento.

## Pré-condições necessárias
Este caso de uso depende que haja passagens cadastradas no sistema, e viagens cadastradas correspondente a elas. Depende, também, que haja ao menos um usuário cadastrado no sistema que tenha ao menos uma passagem
## Design Banco de Dados
Para este caso de uso, é necessário que o banco de dados tenha uma conleção com as viagens. Para isso, utiliza-se a seguinte estrutura:
```
{
"origem": String,
"destino": String,
"horarioPartida" : String,
"horarioChegada" : String,
"dataPartida" : String,
"dataChegada" : String,
"poltronas" : [{"ocupado": Boolean, "idPassagem": Number}
}
```

Um exemplo de entrada no banco de dados segue (esse exemplo pode ser adicionado no banco por meio do script ´´´insertExemple.sh´´´):

```
{
"origem": "Campinas",
"destino": "Piraporinha",
"horarioPartida": "12:34",
"horarioChegada": "13:24",
"dataPartida": "25/12",
"dataChegada": "25/12",
"poltronas" : [{"ocupado": false, "idPassagem": 123456},
	       {"ocupado": false, "idPassagem": 312458},
	       {"ocupado": true, "idPassagem": 312478}]
}
```
Essa mesma organização pode ser representada por meio de um diagrama de classes:

![Estrutura Banco de Dados](aula12/Transportes/designdetalhado/uc2/assets/estruturaDados.png)

## Repertório de Objetos
No desenvolvimento do caso de uso, é necessária a utilização de alguns objetos. Podemos representar estes por meio de um diagrama de classes, com os estereótipos boundary, control e entity

![Objetos](aula12/Transportes/designdetalhado/uc2/assets/objetos.png)

## Execução
Para executar o código que implementa o caso de uso descrito, execute, na pasta App, ```bash start.sh``` em um terminal. Após isso, acesse o endereço ```localhost:3000``` em um navegador de sua escolha. O app apresenta as seguintes funcionalidades:
- Pesquisa: preencha os campos Origem, Destino e Data e clique em Pesquisar para procurar por viagens com esses parâmetros (deixe o campo "Data" em branco para visualizar todas as datas disponiveis de uma mesma viagem);

Importante lembrar que o banco de dados é iniciado vazio, sem viagens cadastradas. Para cadastrar uma viagem e testar as funcionalidades, utilize o script ```insertExemple.sh```.
