class ExchangeItem {
    constructor(symbol, amount) {
        this.symbol = symbol
        this.amount = amount
    }
}

const iHave = new ExchangeItem('USD', 0.0)
const wantToExchange = new ExchangeItem('USD')

const iHaveList = document.querySelectorAll('.i-have li')
const wantToExchangeList = document.querySelectorAll('.i-want-to-exchange li')

const iHaveAmount = document.querySelector('.i-have .amount')
const firstRate = document.querySelector('.i-have .little-info')
const wantToExchangeAmount = document.querySelector('.i-want-to-exchange .amount')
const secondRate = document.querySelector('.i-want-to-exchange .little-info')

let rates = {}

//Symbols event Start
iHaveList.forEach(item => {
    item.addEventListener('click', (e) => {
        iHave.symbol = item.textContent
        render()
    })
})
wantToExchangeList.forEach(item => {
    item.addEventListener('click', (e) => {
        wantToExchange.symbol = item.textContent
        render()
    })
})
//Symbols event End

//Input Event Start
iHaveAmount.addEventListener('input', (e) => {
    iHave.amount = e.target.value | 0
    render(iHave.amount)
})
//Input event End


//Update display
function render() {

    //Symbols
    iHaveList.forEach(item => {

        //Empity symbols
        item.style.background = 'white'
        item.style.color = 'black'

        //Selected symbol
        if (item.textContent == iHave.symbol) {
            item.style.background = '#833AE0'
            item.style.color = 'white'
        }
    })

    wantToExchangeList.forEach(item => {

        //Empity symbols
        item.style.background = 'white'
        item.style.color = 'black'

        //Selected symbol
        if (item.textContent == wantToExchange.symbol) {
            item.style.background = '#833AE0'
            item.style.color = 'white'
        }
    })

    //API
    fetch(`https://api.exchangerate.host/latest?base=${iHave.symbol}&amount=1&symbols=${wantToExchange.symbol}`)
        .then((res) => res.json())
        .then((data) => {
            rates = { ...data.rates }
        })
        .then(() => {
            wantToExchangeAmount.value = truncDigits((Object.values(rates)[0] * iHave.amount), 2) ?? 0
            firstRate.textContent = `1 ${iHave.symbol} = ${truncDigits((Object.values(rates)[0]), 2)} ${wantToExchange.symbol}`
            console.log(rates)
            secondRate.textContent = `1 ${wantToExchange.symbol} = ${truncDigits((1 / Object.values(rates)[0]), 2)} ${iHave.symbol}`
        })

}
render()

function truncDigits(inputNumber, digits) {
    const fact = 10 ** digits;
    return Math.floor(inputNumber * fact) / fact;
}

//Responsive Events
const menuUl = document.querySelector('.menu-ul')
const icon = document.querySelector('.fa')
function menuToggle() {
    if (menuUl.style.display == 'none') {
        menuUl.style.display = 'flex'
        document.querySelector('.button').style.display = 'block'
        icon.classList.replace('fa-bars','fa-times')
    }else{
        menuUl.style.display = 'none'
        document.querySelector('.button').style.display = 'none'
        icon.classList.replace('fa-times','fa-bars')
    }
}