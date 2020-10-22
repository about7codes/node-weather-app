
const weatherForm = document.querySelector('form');
const searchBox = document.querySelector('input');
const msg1 = document.querySelector('#msg1');
const msg2 = document.querySelector('#msg2')

// msg1.textContent = 'From JS';

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = searchBox.value;

    msg1.textContent = 'loading...';
    msg2.textContent = '';

    fetch(`http://localhost:3000/weather?address=${location}`).then((res)=>{
        res.json().then((data)=>{
            if(data.error){
                msg1.textContent = data.error;
            }else{
                msg1.textContent = data.location;
                msg2.textContent = data.forcast.summary
            }
        });
    })

    // console.log(location)
})