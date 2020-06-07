// Função para popular o campo Estado com os UFs
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    // Pegando todos os registros de Estado do serviço do IBGE
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
    .then( res => res.json() )
    .then( states => {

        for ( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

        
    } )
}

populateUFs()

// Função para popular o campo Cidade com as cidades filtradas pelo UF
function getCities(event) {
    // Faz referencia as variaveis com relação aos elementos do HTML
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    // Zera o select da cidade corrigindo o problema da soma das cidades dos estados
    // citySelect.innerHTML = <option value="">Selecione a Cidade</option>

    // Pegando o UF informado ou selecionado
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex // aqui ele pega o index ou indice do elemento selecionado dentro do conjunto
    stateInput.value = event.target.options[indexOfSelectedState].text

    // Pegando todos os Municipios passando o Estado como parâmetro do serviço do IBGE
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    // Zera o select da cidade corrigindo o problema da soma das cidades dos estados
    citySelect.innerHTML = '<option value="">Selecione a Cidade</option>'
    citySelect.disabled = true

    // Faz a requisição e inserir o resultado dentro da variavel para popular o HTML
    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        
        for ( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false

    } )


    

}

// Ao selecionar a UF (Estado) vai add as cidades conforme o Estado informado
document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


// Itens de Coleta
// pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid")

for ( const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
    
}

// Variavel que não pode ser alterada por isso o const,
// fazendo referencia ao elemento do HTML para pegar os Itens
const collectedItems = document.querySelector("input[name=items]")


// Variavel para ser mudado, por isso o let para ser mutavel , que vai armazenar os Itens selecionados
let selectedItems = []

function handleSelectedItem(event) {
    
    const itemLi = event.target

    // adicionar ou remover uma class com JS
    // o toggle, remove ou adiciona a class no elemento do HTML
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id
    
    // console.log('Item ID: ', itemId)

    // verificar se existem items selecionados, se sim
    // pegar os items selecionados

    // Uma função dentro de outra função, o item vai ser retirado de dentro
    // do arry selectedItems, que vai ser percorrido pelo findIndex
    const alreadySelected = selectedItems.findIndex( (item) => {
        const itemFound = item == itemId // isso será true ou false
        return itemFound
    })

    // se já selecionado, tirar da selecao
    if (alreadySelected >= 0) {
        // tirar da selecao
        const filteredItems = selectedItems.filter( (item) => {
            const itemIsDifferent = item != itemId // false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        // se não tiver selecionado, adicionar a selacao
        selectedItems.push(itemId)
    }

    // console.log('Selected Items: ', selectedItems)

    // atualizar o campo escodindo com os items selecionados

    collectedItems.value = selectedItems
}