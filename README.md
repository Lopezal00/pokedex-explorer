PokéDex Explorer

App móvil hecha con React Native y Expo (SDK 58) que consume la PokéAPI. Lista Pokémon con scroll infinito, permite buscarlos por nombre o número y muestra su ficha con imagen, tipos, altura, peso y estadísticas.

Cómo correr el proyecto
bash
npm install
npx expo start

Escanea el código QR con Expo Go (versión compatible con SDK 58).

Estructura de carpetas
pokedex-explorer/
├── App.js                      # Punto de entrada: decide si mostrar la lista o la ficha
└── src/
    ├── services/
    │   └── pokeApi.js          # Única capa que habla con la PokéAPI (fetch)
    ├── hooks/
    │   ├── usePokemonList.js   # Estado de la lista: carga, error y paginación
    │   └── usePokemonDetail.js # Estado de la ficha: carga, error y datos
    ├── components/
    │   ├── StatusView.js       # Estados de interfaz: cargando, error y sin resultados
    │   ├── PokemonCard.js      # Tarjeta de la cuadrícula
    │   ├── SearchBar.js        # Buscador por nombre o número
    │   ├── TypeBadge.js        # Distintivo de color por tipo
    │   └── StatBar.js          # Barra de una estadística base
    ├── screens/
    │   ├── ListScreen.js       # Vista de lista
    │   └── DetailScreen.js     # Vista de detalle
    ├── utils/
    │   └── format.js           # Funciones de formato (#025, mayúsculas, id)
    └── constants/
        └── typeColors.js       # Colores y nombres en español de cada tipo
Por qué la organizamos así

Separamos el proyecto en capas según su responsabilidad. Cada capa solo conoce a la de abajo:

screens  →  hooks  →  services  →  PokéAPI
   ↓
components
services: es el único lugar donde se usa fetch. Si la URL de la API cambia o se agrega otro endpoint, solo se modifica este archivo. Además entrega los datos ya mapeados (solo los campos que usa la app), así las pantallas no dependen de la forma del JSON.
hooks: guardan el estado de cada petición (cargando, error, datos) y controlan cuándo se ejecuta con el array de dependencias de useEffect. Así la lógica de red no queda mezclada con el JSX ni con los estilos, que es la regla del taller.
components: piezas visuales reutilizables que solo reciben datos por props. StatusView se usa tanto en la lista como en la ficha.
screens: arman cada vista juntando hooks y componentes.
utils y constants: funciones y valores que no dependen de React, fáciles de reutilizar y probar.

Elegimos un solo archivo de servicio porque la app consume una sola API con dos endpoints. Si se agregaran más APIs, cada una tendría su propio archivo dentro de services.

No usamos .env porque la PokéAPI es pública y no necesita llave de acceso. Tampoco usamos librerías de navegación: el cambio entre lista y ficha se maneja con un useState en App.js.

Reparto del trabajo
Rama	Responsable	Contenido
main	Las dos	Proyecto base, services, utils, constants, StatusView
feature/lista	Camilo López Alzate: usePokemonList, PokemonCard, ListScreen
feature/detalle	Sara Bustamante Gómez: usePokemonDetail, SearchBar, TypeBadge, StatBar, DetailScreen
Endpoints usados
Endpoint	Uso
GET /pokemon?limit=20&offset={m}	Lista paginada
GET /pokemon/{nombre o id}	Ficha de un Pokémon

REFLEXIÓN:

Cómo nos fue en el desarrollo?
Nos fue bien, al comienzo no entendíamos muy bien de qué iba a ser el taller, ni cómo nos
íbamos a repartir el trabajo, así que arrancamos abriendo los endpoints de la PókeAPI en el
navegador para ver qué traían, y de ahí vimos que la lista solo trae el nombre y la URL, y
que para la imagen alcanzaba con el id. Nos dividimos por vistas, el compañero hizo la lista y yo estuve encargada de la ficha de detalle, cada uno creamos nuestra propia rama de Git y antes de separarnos dejamos en main lo que los dos íbamos a necesitar, que esto sería el servicio que llama a la API, las funciones de formato, los colores de los tipos y el componente de estados. Así casi no editamos los mismos archivos y juntar las ramas al final no fue nada complicado.

Qué fue lo más difícil?
Lo que más nos demoró no fue ni la API, nos demoró fue el mismo entorno ya que para empezar creamos el proyecto en SDK 57, pero expo go en iphone se actualizó al SDK 58 y la app nos dejó de abrir, de ahí nos tocó actualizar el proyecto.
Luego la app no encontraba un archivo porque en el import escribimos UsepokemonList en vez de usePokemonList y nos dimos cuenta de que importa si es mayúscula o minúscula, y que en windows toca renombrar en dos pasos con git mv.
Luego el título se quedaba tapado por la hora, la batería del celular y la isla dinámica del iphone, hasta que usamos SafeAreaView.
Y después cuando hicimos el merge se abrió vim y no teníamos ni idea de cómo salir y nos tocó buscarlo en google.
Ninguno de esos errores e inconvenientes eran de lógica, pero nos sirvieron para aprender a leer los mensajes de error con calma en vez de estresarnos de una vez.

Qué aprendimos?
-Aprendimos a usar una API con fetch y async/await, y a revisar response.ok antes de leer el JSON.
-Que useEffect necesita su array de dependencias, porque si no la petición se repite sin parar.
-A pensar en lo que ve el usuario mientras espera: cargando, error, sin resultados o éxito.
-A organizar el código por partes (servicio, hooks, componentes y pantallas), lo cual nos dejó trabajar al mismo tiempo sin estorbarnos.
-A trabajar con ramas, hacer merge y coordinarnos por GitHub.

Qué nos pareció la actividad?
La actividad en realidad nos gustó porque nos sirve como practica y además se parece a lo que vamos a hacer en el proyecto final de usar una API real, mostrar listas largas y manejar errores, además de esto nos parece que el hecho de que fuera con Pokémon la hizo más divertida, y al ver la app corriendo en el celular nos alegró mucho.
Lo que cambiaríamos es que digan que desde el principio qué versión de expo debemos usar, porque lo del SDK nos hizo perder tiempo. Y si hubieramos tenido más tiempo nos hubiera gustado mejorar más el diseño y agregar tal vez una lista de favoritos.
