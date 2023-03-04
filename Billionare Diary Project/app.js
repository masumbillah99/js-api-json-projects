const loadData = async () => {
    const url = `https://forbes400.onrender.com/api/forbes400?limit=10`;
    const res = await fetch(url);
    const data = await res.json();
    displayRicher(data);
}

const displayRicher = (riches) => {
    console.log(riches);
    const richerContainer = document.getElementById('richer-container');

    riches.forEach((rich) => {
        const columnDiv = document.createElement('div');
        columnDiv.classList.add('col');
        columnDiv.classList.add('card-col');
        columnDiv.innerHTML = `
            <div class="card p-3">
                <h3 class="card-title text-center">${rich.person.name}</h3>
                <div class="d-flex">
                    <div>
                        <img src="${rich.squareImage}" class="card-img-top w-100" alt="...">
                        <p class="mt-2">Source: ${rich.source}</p>
                    </div>
                    <div class="card-body">
                        <ul list-unstyled">
                            <li>Citizenship: ${rich.countryOfCitizenship}</li>
                            <li>State: ${rich.state}</li>
                            <li>City: ${rich.city}</li>
                            <li>Total Shares: ${rich.numberOfShares}</li>
                            <li>Share Price: ${rich.sharePrice}</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        richerContainer.appendChild(columnDiv);
    });
}







loadData();



/** 
10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
0
: 
{name: 'Real-Time Billionaires', year: 0, uri: 'bernard-arnault', bio: '', rank: 1, …}1
abouts
: 
(2) ['Arnault apparently wooed his wife, Helene Mercier,…hopin and other classical composers on the piano.', 'Every Saturday, Arnault visits as many as 25 store… including both his and those of his competitors.']
archivedWorth
: 
158000
bio
: 
""
bioSuppress
: 
false
bios
: 
(5) ['Bernard Arnault oversees the LVMH empire of some 7…tics brands, including Louis Vuitton and Sephora.', 'In January 2021, LVMH acquired American jeweler Ti… to be the biggest luxury brand acquisition ever.', 'LVMH spent $3.2 billion in 2019 for luxury hospita…s or manages 46 hotels, trains and river cruises.', 'His father made a small fortune in construction; A…from that business to buy Christian Dior in 1985.', "Four of Arnault's five children work in corners of…mpire: Frédéric, Delphine, Antoine and Alexandre."]
birthDate
: 
-657244800000
city: "Paris"
countryOfCitizenship
: 
"France"
csfDisplayFields
: 
(8) ['rank', 'age', 'source', 'finalWorth', 'personName', 'bios', 'bio', 'countryOfCitizenship']
date
: 
725846400000
estWorthPrev
: 
206044.698304
familyList
: 
false
finalWorth
: 
207964.33
financialAssets
: 
(3) [{…}, {…}, {…}]
    companyName:  "Carrefour S.A."
    currencyCode : "EUR"
    exchange
    : 
    "EURONEXT PARIS"
    exchangeRate
    : 
    0.943
    interactive
    : 
    false
    numberOfShares
    : 
    0
    sharePrice
    : 
    19.840933191940618
    ticker
    : 
    "CA-FR"

gender
: 
"M"
imageExists
: 
true
industries
: 
['Fashion & Retail']
interactive
: 
false
lastName
: 
"Arnault"
listUri
: 
"rtb"
name
: 
"Real-Time Billionaires"
naturalId
: 
"faris/35/0/4800"
person
: 
{name: 'Bernard Arnault & family', uri: 'bernard-arnault', imageExists: true, squareImage: '//specials-images.forbesimg.com/imageserve/5dc0551…0000&cropX1=0&cropX2=4000&cropY1=1209&cropY2=5212'}
    imageExists
    : 
    true
    name
    : 
    "Bernard Arnault & family"
    squareImage
    : 
    "//specials-images.forbesimg.com/imageserve/5dc05518ca425400079c659f/416x416.jpg?background=000000&cropX1=0&cropX2=4000&cropY1=1209&cropY2=5212"
    uri
    : 
    "bernard-arnault"
personName : "Bernard Arnault & family"
position
: 
1
privateAssetsWorth
: 
3930.492047
rank
: 
1
source
: 
"LVMH"
squareImage
: 
"//specials-images.forbesimg.com/imageserve/5dc05518ca425400079c659f/416x416.jpg?background=000000&cropX1=0&cropX2=4000&cropY1=1209&cropY2=5212"
timestamp
: 
1677763501721
uri
: 
"bernard-arnault"
version
: 
734362
visible
: 
true
wealthList
: 
false
year
: 
0
*/
