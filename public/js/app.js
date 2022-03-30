 const weatherForm = document.querySelector('form')
 const locationsearch = document.querySelector('input')
 const messageone = document.querySelector('#message1')
 const messagetwo = document.querySelector('#message2')
//  const location = locationsearch.value

weatherForm.addEventListener('submit', (e)=> { 
    e.preventDefault()
    const location = locationsearch.value
    messageone.textContent = 'Loading .. '

//     fetch('http://localhost:3000/weather?address=' + location).then((response)=> {
//     response.json().then((data)=>{
//         if (data.error){
//             messageone.textContent = data.error
//         } else {
//             messageone.textContent = data.location
//             messagetwo.textContent = data.forecast
//         }
//     })
// })
// })


    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageone.textContent = data.error
            } else {
                messageone.textContent = data.location
                messagetwo.textContent = data.temperature
            }
        })
    })
})