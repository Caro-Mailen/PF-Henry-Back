# PF-Henry-Back

--Introducción--

### Rutas:

la ruta base es: http://localhost:3001

------------
#### Pet:
##### Get:
1. /pet

Esta ruta se utiliza para el paginado de las cards, devuelve (de forma predeterminada) las primeras 6 mascotas de la base de datos.

2. /pet?size={}&page={}

Esta ruta recibe dos valores por params y ambos son numeros (es la misma que la anterior):
size = es el tamaño del paginado, si queremos que traiga 5 o 10 mascotas por pagina. page = es la posicion de la pagina que queremos traer.
>ejemplo: /pet?size=10&page=0
esta ruta nos traeria las primeras 10 mascotas, son las primeras porque usamos la pagina 0, si cambiamos page a 1, nos  traeria las 10 mascotas siguientes y asi sucesivamente.
El size divide la cantidad total de mascotas en la db por su valor dando asi tantas paginas y page, tomaria una de esas paginas.

3. /pet/:id

Esta ruta trae una mascota especifica mediante su id.

##### Post:
1. /pet

Esta ruta crea una mascota a partir de la información enviada por body.
Estructura del json que deberia recibir el backend:
```js
    {
      "name": "tristan",
      "image": "https://i.postimg.cc/1tKP9NkV/tristan.jpg",
      "size": "big",
      "weight": "1",
      "fur": "short",
      "breed": "crossbreed",
      "gender": "male",
      "castration": true,
      "vaccinate": true
    }
```

#### User:
##### Get:

1. /user

Esta ruta devuelve todos los usuarios. (ruta general)

2. /user/:userId

Esta ruta devuelve la info completa de un usuario.

##### Post:
1. /user

Esta ruta crea un nuevo usuario.
Estructura del json que deberia recibir el backend:
```js
    {
      "name": "Agus",
      "lastname": "Di giacinto",
      "email": "agustindigiacinto18@gmail.com",
      "image": ":3",
      "address": "Santa Ana",
      "socialMedia": "AgustinDi",
      "tel": "3547598556",
      "age": 19
    }
```

#### User-Pet:
##### Get:

1. /userPet/:userId

Esta ruta trae a un usuario y todas sus mascotas.
>Ejemplo: /userPet/3

##### Put:
1. /userPet

Esta ruta toma un usuario y le adjudica una mascota, los id son pasados por body.
```js
{
    "userId":2,
    "petId":5
}
```

------------


##### con amor, de parte del back :3
