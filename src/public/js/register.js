let data = window.localStorage.getItem('response')
if (data) data = JSON.parse(data)
else data = []
if (data.token) window.location = '/'

let uploadFileName = document.querySelector(".file-name")
let userInput = document.querySelector('.user-file-input')
let usernameInput  = document.querySelector('.user-login')
let emailInput = document.querySelector('.user-email')
let passwordInput = document.querySelector('.user-password')
let registrationForm = document.querySelector('.site-main__form')
let title = document.querySelector('.site-main__text')

userInput.addEventListener('change', () => {
  let file = userInput.files[0].name
  file = file.length > 15 ? file.slice(0, 10) + '...' + file.slice(file.length - 5, file.length) : file
  uploadFileName.textContent = file
})


registrationForm.onsubmit = async (event) => {
  event.preventDefault()
  
  let formData = new FormData()
  
  formData.append('username', usernameInput.value)
  formData.append('password', passwordInput.value)
  formData.append('email', emailInput.value)
  formData.append('file', userInput.files[0])
  
  let response = await fetch('/register', {
    method: 'POST',
    body: formData
  })
  response = await response.json()
  
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