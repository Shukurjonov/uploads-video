let token = window.localStorage.getItem('token')
let data = window.localStorage.getItem('response')
if (data) data = JSON.parse(data)
else data = []

if (!data.token) window.location = '/register'

let fileUpload = document.querySelector(".file-upload") 
let chooseFile = document.querySelector("#chooseFile") 
let profileAvatar = document.querySelector('.profile-user__img')
let profileName = document.querySelector('.profile-user__name')
let form = document.querySelector('.chat-footer')
let chatsList = document.querySelector('.users-list')
let chatMain = document.querySelector('.uploads-files__list')
let uploadButton     = document.querySelector('.button')

let currentUserId = data.body.user_id

chooseFile.addEventListener('change', function () {
  let filename = chooseFile.files[0].name
  filename = filename.length > 15 ? filename.slice(0, 10) + '...' + filename.slice(filename.length - 5, filename.length) : filename
  
  if (/^\s*$/.test(filename)) {
    fileUpload.classList.remove('active');
    noFile.textContent = "No file chosen..."; 
  }
  else {
    fileUpload.classList.add('active');
    noFile.textContent =  filename.replace("C:\\fakepath\\", ""); 
  }
});

profileAvatar.src = `images/${data.body.avatar_link}`
profileName.textContent = data.body.username

async function groupMembersRender() {
  
  let data = await request('/users', 'GET')
  
  let string = ""
  data.map(user => {
    string += `
    <li class="users-list__item">
    <img class="profile-image" src=${'images/' + user.avatar_link} alt="profile-picture">
    <p class="username">${user.username}</p>
    </li>
    `
  })
  chatsList.innerHTML = string
}



fileUpload.onsubmit = async (event) => {
  event.preventDefault()
  
  let date = new Date()
  let time = `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()} ${date.getHours() < 12 ? 'AM' : 'PM'}`
  
  let formData = new FormData()
  formData.append('user_id', currentUserId)
  formData.append('time', time)
  formData.append('file', chooseFile.files[0])
  
  let response = await fetch('/', {
    method: 'POST',
    body: formData
  })
  response = await response.json()
  console.log(response);
  fileUpload.classList.remove('active');
  noFile.textContent = "No file chosen...";
  messagesRenderer(currentUserId, data)
}

async function messagesRenderer(id, users) {
  let data = await request('/files', 'GET')
  let string = ""
  
  data.map(files => {
    
    
    string += `
    <li class="uploads-files__item files">
    <object data=${'files/' + files.file_link} class="files__main" width="280px" height="150px"></object>
    <a href="/downloads?fileName=${files.file_link}" class="files__generatsiya__link">Download</a>
    </li>
    `
    
  })
  chatMain.innerHTML = string
}

messagesRenderer(currentUserId, data)
groupMembersRender()