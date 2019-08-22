//this code goes into userdataform after e.preventdefault();



const form = new FormData();
form.append('name', document.getElementById('name').value)
form.append('email', document.getElementById('email').value)
form.append('photo', document.getElementById('photo').files[0])

updateSetting(form, 'data');