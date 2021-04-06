function greeting(name){
    console.log(`Hello ${name}, welcome to Scotish`);
}

function introduction(firstname, lastname , callback){
    const fullname = `${firstname} ${lastname}`;

    callback(fullname);
}

introduction('Racheal', 'Cynthia ', greeting)



const weather = true

const date = new Promise(function(resolve, reject) {
    if(weather){
        const dateDetails = {
            name: 'resstauraet',
            location: 'muk',
            table: 5
        };

        resolve(dateDetails)
    }else{
        reject(new Error('bad weather , so no date'))
    }
})

const myDate = function(){
    date
    .then(function(done){
        console.log('wea are going on a date')
        console.log(done)

    })
    .catch(function(error){
        console.log(error.message)
    })
}

myDate()