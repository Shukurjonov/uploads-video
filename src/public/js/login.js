let token = window.localStorage.getItem('token')
let data = window.localStorage.getItem('response')
if (data) data = JSON.parse(data)
else data = []
if (data.token) window.location = '/'

let usernameInput  = document.querySelector('.user-login')
let passwordInput = document.querySelector('.user-password')
let registrationForm = document.querySelector('.site-main__form')
let title = document.querySelector('.site-main__text')
    
registrationForm.onsubmit = async (event) => {
    event.preventDefault()
    let response = await request('/login', 'POST', {
        username: usernameInput.value,
        password: passwordInput.value
    })
    if (response.token) {
        title.textContent = response.message
        window.localStorage.setItem('response', JSON.stringify(response))
        setTimeout(() => {
            window.location = '/'
        }, 1500)
    } else {
        title.textContent = response.message
    }
}