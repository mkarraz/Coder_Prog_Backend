const socket = io()

const productsList = document.querySelector('#currentProd')
const addProdForm = document.querySelector('#addProd')
const prodTitleInput = document.querySelector('#prodTitle')
const prodPriceInput = document.querySelector('#prodPrice')
const prodThumbnailInput = document.querySelector('#prodThumbnail')

const formMessage = document.querySelector('#formMessage')
const userEmailInput = document.querySelector('#userEmailInput')
const messageInput = document.querySelector('#messageInput')
const messagesPool = document.querySelector('#messagesPool')

const sendMessage = () => {
    try {
        const email = userEmailInput.value
        const message = messageInput.value
        socket.emit('client:message', { email, message })
    } catch (error) {
        console.log(`Han error has ocurred; ${error}`)
    }
}

const renderMessages = async (messagesArray) => {
    try {
        const chatTemplate  = await fetch('./partials/chat.hbs')
        const hbsChatTemplateCompiled = Handlebars.compile(await chatTemplate.text())/* Compila la plantilla */
        messagesPool.innerHTML = hbsChatTemplateCompiled({messagesArray, })

    } catch(error) {
        console.log(`Hubo un error ${error}`)
    }
}

const showNewProd = () => {
    try {
        const title = prodTitleInput.value
        const prodPrice = prodPriceInput.value
        const price = Number(prodPrice)
        const thumbnail = prodThumbnailInput.value

        socket.emit('client:product', { title, price, thumbnail })
    } catch (error) {
        console.log(`Han error has ocurred; ${error}`)
    }
}

const renderProducts = async (products) => {
    try {
        const prodTemplate = await fetch('./partials/product.hbs')
        const hbsProdTemplateCompiled = Handlebars.compile(await prodTemplate.text())

        productsList.innerHTML = hbsProdTemplateCompiled({
            products,
        })
    } catch (error) {
        console.log(`Han error has ocurred; ${error}`)
    }
}

/* EVENT LISTENER */

addProdForm.addEventListener('submit', event => {
    event.preventDefault()
    showNewProd()
    prodTitleInput.value = ''
    prodPriceInput.value = ''
    prodThumbnailInput.value = ''
})

formMessage.addEventListener('submit', event => {
    event.preventDefault()
    sendMessage()
    messageInput.value = ''
})

/* SERVER LISTENER */

socket.on('server:products', products => {
    renderProducts(products)
})

socket.on('server:message', renderMessages);