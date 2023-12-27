import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://list-app-f7616-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addBtnEl = document.getElementById("add-btn")
const shoppingListEl = document.getElementById("shopping-list")

addBtnEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(shoppingListDB, inputValue)
    clearInput()
})

onValue(shoppingListDB, function(snapshot) {
    if (snapshot.exists()) {
        let listArray = Object.entries(snapshot.val())
        clearShoppingList()
        for (let i = 0; i < listArray.length; i++){
            let currentItem = listArray[i]
            let currentItemID = currentItem[0]
            let currentItemVal = currentItem[1]
            appendShoppingList(currentItem)
        }    
    } else {
        shoppingListEl.innerHTML = 'No items...'
    }
})

function clearInput() {
    inputFieldEl.value = ""
}

function clearShoppingList() {
    shoppingListEl.innerHTML = ""  
}

function appendShoppingList(item) {
    let itemID = item[0]
    let itemVal = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemVal
    newEl.addEventListener("click", function() {
        let itemInDB = ref(database, `shoppingList/${itemID}`)
        remove(itemInDB)
    })
    shoppingListEl.append(newEl)
}