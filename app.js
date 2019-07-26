const apiUrl = 'https://acme-users-api-rev.herokuapp.com/api';

const prodOfferingsHTML = (prod, products, companies, offerings) => {
    return offerings.filter(offering => prod.id === offering.productId).map(offering => {
        return `<li> Offered by: ${getCompanyName(offering.companyId, companies)} at ${offering.price}</li>`
    }).join('');
}

const getCompanyName = (companyId, companies) => {
    let newData = companies.filter(company => (companyId === company.id))
    return newData[0].name;
}

const renderData = (products, companies, offerings) => {
    console.log('hello');
    document.querySelector('#products').innerHTML = products.map(
        prod => `<div class='prod'>
            <span class='prodName'>${prod.name}</span>
            <br><br>
            ${prod.description}
            <br><br>
            ${'$' + prod.suggestedPrice.toFixed(2)}
            <br><br>
            <ul>${prodOfferingsHTML(prod, products, companies, offerings)}</ul>
        </div>`
    );
}

const loadData = () => {
    Promise.all([fetch(`${apiUrl}/products`), fetch(`${apiUrl}/companies`), fetch(`${ apiUrl}/offerings`)])
        .then(responses => Promise.all(responses.map(r => r.json())))
        .then(data => {
            const products = data[0];
            const companies = data[1];
            const offerings = data[2];
            renderData(products, companies, offerings);
        });
}

loadData();

