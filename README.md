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
feature/lista	Integrante A	usePokemonList, PokemonCard, ListScreen
feature/detalle	Integrante B	usePokemonDetail, SearchBar, TypeBadge, StatBar, DetailScreen
Endpoints usados
Endpoint	Uso
GET /pokemon?limit=20&offset={m}	Lista paginada
GET /pokemon/{nombre o id}	Ficha de un Pokémon