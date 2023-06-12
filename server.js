import express from 'express';
import fetch from'node-fetch';

const port = 8080; //nasluchiwanie na porcie 8080
const data = new Date().toLocaleString('pl-PL', {timeZone: 'Europe/Warsaw'}); //data uruchomienia
const autor = 'Piotr Tracz'; //autor(imie i nazwisko studenta)

//funkcja zwracajaca odpowiedz serwera z ktorego otrzymujemy informacje o stefie czasowej po adresie ip
async function odpowiedzSerwera(ip) {
    var response = await fetch(`http://ip-api.com/json/${ip}`); //asynchronieczne pobranie odpowiedzi

    if (!response.ok) 
    {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
return await response.json(); 
}

const app = express();

app.set('trust proxy', true)
app.use(async (req, res) => {
    odpowiedzSerwera(req.ip) //wywolanie funkcji, jako parametr ip 
        .then((json)=>{
            var strefa=json['timezone']; //zapisanie strefy czasowej
            if (strefa == undefined)
            {
                strefa = "Europe/Warsaw";
            }
            var dataStrefa = new Date().toLocaleString('pl-PL', {timeZone: strefa}); //data na podstawie strefy czasowej
            res.send(`<p>IP: ${req.ip}</p><p>Data i czas: ${dataStrefa} , strefa czasowa: ${strefa}</p>`); //wyswietlenie informacji w przegladarce
        })
        .catch((e) =>
            console.log(e)
        ); //obsluga bledow
})

//logi na konsoli 
console.log(`Data i czas uruchomienia: ${data}`);
console.log(`Autor: ${autor}`);
app.listen(port, '0.0.0.0',()=>console.log(`Serwer nasluchuje na porcie: ${port}`));
