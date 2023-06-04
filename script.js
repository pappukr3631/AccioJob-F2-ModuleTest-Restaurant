const source = "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json";

const container = document.getElementById("container");

let items = [];

async function getMenu() {
    
    try{
        let response = await fetch(source);
        let result = await response.json();
        items = result;//Making data available globally
        
        let innerHTMLContent = "";
        for(let i=0; i<result.length; i++) {
            let innerContent = `
            <div class="food-item">
                <img src=${result[i].imgSrc} alt="Food img">
                <h2>${result[i].name}</h2>
                <p>$ ${result[i].price}</p>
            </div>`
            innerHTMLContent += innerContent;
        }
        container.innerHTML = innerHTMLContent;
        
    }
    catch(error) {
        alert("Unable to load menu: " + error);
    }
    
    let promTakeOrder = TakeOrder();
    // Promise chaining to handle the callback sequence
    promTakeOrder
        .then((randomOrders) => {
            console.log(randomOrders);
            return orderPrep();
        })
        .then((orderStatus) => {
            console.log(orderStatus);
            return payOrder();
        })
        .then( (paymentStatus) => {
            console.log(paymentStatus);
            if(paymentStatus.paid == true)
                thankyouFnc();
        })
        .catch(error);
}

getMenu();

function TakeOrder() {
    let randomObj = {};
    //Adding 3 randum food items to the order
    randomObj[0] = items[parseInt(Math.random()*items.length)];
    randomObj[1] = items[parseInt(Math.random()*items.length)];
    randomObj[2] = items[parseInt(Math.random()*items.length)];
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(randomObj);
        }, 2500);
    });
}

function orderPrep() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({order_status:true, paid:false});
        }, 1500)
    });
}

function payOrder() {
    return new Promise((resolve, reject) => {
        setTimeout( () => {
            resolve({order_status:true, paid:true});
        }, 1000);
    });
}

function thankyouFnc() {
    alert("Thankyou for eating with us today!");
}