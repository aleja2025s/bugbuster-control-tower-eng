# 🐛 BugBuster Control Tower Live

Dashboard interactivo en tiempo real para casos BugBuster con conexión directa a Databricks.

## Características

- ✅ **4 pestañas navegables**: Panorama, Labels, Explorar, Tendencias
- 📊 **Gráficos interactivos**: Pie charts y gráficos de barras con Chart.js
- 🔍 **Filtros dinámicos**: Busca por label, customer ID y límite de resultados
- 📈 **Métricas en vivo**: Total, Resueltos, Abiertos, % Resuelto, Clientes únicos
- 🎨 **Diseño morado**: Interfaz moderna y responsive
- 🚀 **Deployable**: Listo para Vercel, Heroku o cualquier servidor Node.js

## Stack

- **Backend**: Node.js + Express
- **Frontend**: HTML5 + Vanilla JavaScript + Chart.js
- **Base de datos**: Databricks SQL Warehouse
- **Deploy**: Vercel (recomendado) o Render

## Instalación Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/bugbuster-control-tower.git
cd bugbuster-control-tower
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar credenciales de Databricks

Copia el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

Luego edita `.env` con tus credenciales:

```env
DATABRICKS_HOST=your-workspace.cloud.databricks.com
DATABRICKS_TOKEN=your-personal-access-token
DATABRICKS_WAREHOUSE_ID=your-warehouse-id
PORT=3000
```

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

Abre http://localhost:3000 en tu navegador.

## Deployment en Vercel

### 1. Conectar GitHub a Vercel

1. Sube el código a GitHub
2. Ve a https://vercel.com/new
3. Selecciona "Import Git Repository"
4. Selecciona tu repositorio `bugbuster-control-tower`

### 2. Configurar variables de ambiente

En Vercel, en la sección "Environment Variables", añade:

- `DATABRICKS_HOST`: tu host de Databricks
- `DATABRICKS_TOKEN`: tu token de acceso
- `DATABRICKS_WAREHOUSE_ID`: tu warehouse ID

### 3. Deployar

Vercel deployará automáticamente. Tu dashboard estará disponible en una URL pública.

## Deployment en Render

### 1. Conectar GitHub a Render

1. Sube el código a GitHub
2. Ve a https://dashboard.render.com/new
3. Selecciona "Web Service"
4. Conecta tu repositorio de GitHub

### 2. Configurar

- **Build command**: `npm install`
- **Start command**: `npm start`
- **Environment variables**: Añade DATABRICKS_HOST, DATABRICKS_TOKEN, DATABRICKS_WAREHOUSE_ID

### 3. Crear servicio

Haz clic en "Create Web Service". Tu dashboard estará disponible en el dominio de Render.

## Uso

### Panorama

Visualiza métricas generales:
- Total de casos
- Casos resueltos
- Casos abiertos
- Porcentaje de resolución
- Clientes únicos

Gráficos:
- Pie chart: Resueltos vs Abiertos
- Bar chart: Casos por funnel (NuStart, NuJourney, NuActivation)

### Labels

Explora todas las etiquetas usadas en los casos:
- Tabla con count de casos por label
- Busca filtrada en vivo

### Explorar

Consultas avanzadas con filtros:
- **Label**: Filtra por etiqueta específica
- **Customer ID**: Busca por cliente
- **Limit**: 25, 50 o 100 casos

Ver detalles: Jira ID (con link), Customer, Prospect, Asunto, Estado, Fecha

### Tendencias

Placeholder para gráficos de evolución temporal (próxima versión).

## Estructura del Proyecto

```
bugbuster-control-tower/
├── server.js                 # Backend Express
├── package.json              # Dependencias Node.js
├── vercel.json              # Config Vercel
├── .env.example             # Variables de ambiente (template)
├── .gitignore               # Archivos a ignorar en Git
├── public/
│   └── index.html           # Frontend (todo en 1 archivo)
└── README.md                # Este archivo
```

## Variables de Ambiente

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `DATABRICKS_HOST` | Host del workspace | `abc123.cloud.databricks.com` |
| `DATABRICKS_TOKEN` | Token de acceso personal | `dapi123xyz...` |
| `DATABRICKS_WAREHOUSE_ID` | ID del SQL Warehouse | `abc123def456` |
| `PORT` | Puerto del servidor | `3000` |
| `NODE_ENV` | Ambiente | `production` o `development` |

## Tabla de Databricks

El dashboard consulta:

```sql
usr.`co-cx-ops-analytics`.bugbustereng_casos
```

Columnas esperadas:
- `jira_id`: ID del ticket
- `customer_id`: ID del cliente
- `prospect_id`: ID del prospecto
- `asunto`: Descripción del caso
- `estado`: Estado (HECHO, CERRADO, ABIERTO, etc)
- `resuelto`: Boolean
- `funnel`: Funnel (NuStart, NuJourney, NuActivation)
- `etiquetas`: Labels separadas por coma
- `fecha_creacion`: Fecha de creación
- `asignado_a`: Persona asignada

## API Endpoints

### GET /api/config

Verifica si Databricks está configurado.

```json
{
  "configured": true,
  "host": "configurado"
}
```

### POST /api/configure

Configura credenciales de Databricks (solo en desarrollo recomendado).

```bash
curl -X POST http://localhost:3000/api/configure \
  -H "Content-Type: application/json" \
  -d '{
    "host": "abc123.cloud.databricks.com",
    "token": "dapi..."
  }'
```

### POST /api/query

Ejecuta una query en Databricks.

```bash
curl -X POST http://localhost:3000/api/query \
  -H "Content-Type: application/json" \
  -d '{
    "query": "SELECT * FROM usr.`co-cx-ops-analytics`.bugbustereng_casos LIMIT 10"
  }'
```

Respuesta:

```json
{
  "success": true,
  "data": [...],
  "columns": 5
}
```

## Troubleshooting

### Error: "Databricks no configurado"

- Verifica que `DATABRICKS_HOST` y `DATABRICKS_TOKEN` estén en `.env`
- En Vercel/Render, confirma que las variables de ambiente están configuradas
- Recarga la página después de cambiar variables

### Error: "WAREHOUSE_ID no encontrado"

- Verifica tu `DATABRICKS_WAREHOUSE_ID` en la consola de Databricks
- Asegúrate de que el warehouse esté activo

### Queries lentas

- Verifica que el warehouse de Databricks esté activo
- Aumenta el timeout en server.js si es necesario
- Optimiza las queries SQL

### Tablas no encontradas

- Verifica que `usr.`co-cx-ops-analytics`.bugbustereng_casos` existe
- Ajusta el nombre de tabla según tu ambiente
- Verifica permisos de acceso en Databricks

## Desarrollo

### Agregar nuevas queries

Edita `public/index.html` y busca las funciones `loadPanorama()`, `loadLabels()`, etc.

Ejemplo para agregar una nueva métrica:

```javascript
const newQuery = `
  SELECT COUNT(*) as total
  FROM usr.\`co-cx-ops-analytics\`.bugbustereng_casos
  WHERE estado = 'PENDIENTE'
`;

const data = await queryDatabricks(newQuery);
```

### Agregar nuevas pestañas

1. Añade un botón en la sección `.tabs`:

```html
<button class="tab-button" onclick="switchTab('mi-tab')">🆕 Mi Tab</button>
```

2. Crea el contenedor en HTML:

```html
<div id="mi-tab" class="tab-content">
  <!-- Tu contenido -->
</div>
```

3. Implementa la función `loadMiTab()` en JavaScript

## Licencia

MIT - Siéntete libre de usar y modificar.

## Soporte

¿Problemas? Abre un issue en GitHub o contacta al equipo de BugBuster.

---

Made with 💜 for BugBuster team
