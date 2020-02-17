#  Products Search in Mercado Livre - Web Crawler API

This is an API, implemented using Node.js, which provides and endpoint to search products from a text input in https://www.mercadolivre.com.br/ and returns basic data from them.

It was developed only for learning purposes, feel free for give me feedbacks.

### System Requirements

node v8.10.0 (or newer version)
npm 3.5.2 (or newer version)
 
  

### Usage

First, you can start the application using npm:

```bash

$ npm install
$ npm start

```

After that, the server is listeninng on port 3333.

## Request Example:

```json
{
	"search" : "smartphone",
	"limit": 2
}
```
```bash

$ curl --location 
       --request POST 'localhost:3333/products/' \
	   --header 'Content-Type: application/json' \
       --data-raw '{
                        "search" : "smartphone",
						"limit": 2
                   }'

```

## Response Example:

```json
[

{

"name": "Xiaomi Redmi Note 8 Dual SIM 64 GB Azul-netuno 4 GB RAM",

"url": "https://www.mercadolivre.com.br/xiaomi-redmi-note-8-dual-sim-64-gb-azul-netuno-4-gb-ram/p/MLB15188554?source=search#searchVariation=MLB15188554&position=1&type=product&tracking_id=3b636d60-f8c8-45ba-8685-86e1499700b8",

"price": "1056.00",

"store": null,

"state": null

},

{

"name": "Samsung Galaxy A20 Dual SIM 32 GB Vermelho 3 GB RAM",

"url": "https://www.mercadolivre.com.br/samsung-galaxy-a20-dual-sim-32-gb-vermelho-3-gb-ram/p/MLB14643309?source=search#searchVariation=MLB14643309&position=2&type=product&tracking_id=3b636d60-f8c8-45ba-8685-86e1499700b8",

"price": "899.00",

"store": "Novo Mundo",

"state": null

}

]
```