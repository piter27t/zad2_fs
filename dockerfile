# Obraz bazowy
FROM node:alpine

# Imie i nazwisko studenta
LABEL author="Piotr Tracz"

# Utworzenie folderu roboczego
WORKDIR /usr/app

# Skopiowanie package.json i package-lock.json
COPY package*.json ./

# Instalacja npm
RUN npm install

# Kopiowanie plikow aplikacji
COPY . .

# Ustawienie portu na 8080
EXPOSE 8080

# Uruchomienie serwera
CMD [ "node", "server.js" ]