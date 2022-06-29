const socket = io()

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
        const userEmail = userEmailInput.value
        const message = messageInput.value
        const date = new Date().toLocaleString("es-AR")
        socket.emit('client:message', { userEmail, message, date })
    } catch (error) {
        console.log(`Han error has ocurred; ${error}`)
    }
}

const renderMessages = (messagesArray) => {
    try {
        const html = messagesArray.map(messageInfo => {
            return(`<div>
                        <span class="userEmail">${messageInfo.userEmail}</span>
                        <span class="chatDate">[${messageInfo.date}]</span> :
                        <span class="userMessage">${messageInfo.message}</span> 
                    </div>`)
        }).join(" ");

        messagesPool.innerHTML = html
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
        console.log(prodPrice)
        socket.emit('client:product', { title, price, thumbnail })
    } catch (error) {
        console.log(`Han error has ocurred; ${error}`)
    }
}

const renderProducts = async (products) => {
    const response = await fetch('/template.hbs')/* Petición a la ruta donde está almacenada la plantilla. */
    const dataTemplate = await response.text()
    document.querySelector('#currentProd').innerHTML = ""
    products.forEach(product => {
        const template = Handlebars.compile(dataTemplate)//Compila la plantilla
        const html = template(product)//Genera el html
        document.querySelector('#currentProd').innerHTML += html//Inyecta el resultado en la vista
    });
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
    messageInput.value = "" 
})

/* SERVER LISTENER */

socket.on('server:products', products => {
    renderProducts(products)
})

socket.on('server:message', renderMessages);