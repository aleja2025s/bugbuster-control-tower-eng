# ⚡ Quick Start - BugBuster Control Tower

Inicia en **5 minutos**.

## 1. Requisitos

- Node.js 18+ instalado ([descarga](https://nodejs.org))
- Credenciales de Databricks
- Git (opcional)

## 2. Clonar o descargar

```bash
git clone https://github.com/tu-usuario/bugbuster-control-tower.git
cd bugbuster-control-tower
```

O descarga el ZIP y extrae en una carpeta.

## 3. Instalar y configurar

```bash
npm install
cp .env.example .env
```

Abre `.env` y rellena:

```env
DATABRICKS_HOST=tu-workspace.cloud.databricks.com
DATABRICKS_TOKEN=dapi...
DATABRICKS_WAREHOUSE_ID=tu-warehouse-id
PORT=3000
```

## 4. Ejecutar

```bash
npm start
```

Abre http://localhost:3000 ✅

## 5. Deploy a Vercel (opcional, 2 minutos)

1. Sube a GitHub
2. Ve a https://vercel.com/new
3. Importa repo
4. Añade variables de ambiente
5. Listo! ✅

## Cheat Sheet

| Tarea | Comando |
|-------|---------|
| Instalar deps | `npm install` |
| Dev local | `npm run dev` |
| Producción | `npm start` |
| Ver logs | Check console |

## ¿Dónde obtener credenciales Databricks?

1. Ve a tu workspace de Databricks
2. **Settings** → **User Settings** → **Access tokens**
3. Copia el token (DATABRICKS_TOKEN)
4. **Host** está en la URL: `https://abc123.cloud.databricks.com`
5. **Warehouse ID**: Ve a **SQL** → **SQL Warehouses** → Copia el ID

## Primeros pasos

1. Abre http://localhost:3000
2. Verás banner pidiendo credenciales
3. Rellena Host y Token
4. Haz clic en "Guardar"
5. Dashboard cargará datos! 🎉

## Troubleshooting rápido

| Error | Solución |
|-------|----------|
| "Cannot find module" | `npm install` |
| "Port 3000 in use" | Cambia `PORT` en `.env` |
| "Databricks no configurado" | Recarga la página después de guardar |
| "WAREHOUSE_ID invalid" | Verifica que warehouse existe y está activo |

¡Listo! 🚀
