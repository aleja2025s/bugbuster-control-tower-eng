const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Variables para almacenar credenciales de Databricks
let databricksConfig = {
  hostname: process.env.DATABRICKS_HOST,
  token: process.env.DATABRICKS_TOKEN
};

// Endpoint para obtener configuración (sin exponer el token)
app.get('/api/config', (req, res) => {
  res.json({
    configured: !!databricksConfig.hostname && !!databricksConfig.token,
    host: databricksConfig.hostname ? 'configurado' : 'no configurado'
  });
});

// Endpoint para configurar credenciales (solo en desarrollo)
app.post('/api/configure', (req, res) => {
  const { host, token } = req.body;

  if (!host || !token) {
    return res.status(400).json({ error: 'Host y token son requeridos' });
  }

  databricksConfig = { hostname: host, token };
  res.json({ success: true, message: 'Configuración actualizada' });
});

// Endpoint principal: ejecutar queries en Databricks
app.post('/api/query', async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Query es requerida' });
    }

    if (!databricksConfig.hostname || !databricksConfig.token) {
      return res.status(401).json({
        error: 'Databricks no configurado. Proporciona HOST y TOKEN.'
      });
    }

    // Construir URL de Databricks SQL Warehouse
    const url = `https://${databricksConfig.hostname}/api/2.0/sql/statements`;

    const payload = {
      statement: query,
      warehouse_id: process.env.DATABRICKS_WAREHOUSE_ID || 'default',
      wait_timeout: '30s'
    };

    const headers = {
      'Authorization': `Bearer ${databricksConfig.token}`,
      'Content-Type': 'application/json'
    };

    const axios = require('axios');
    const response = await axios.post(url, payload, { headers });

    // Extraer resultados
    const results = response.data.result?.data_array || [];

    res.json({
      success: true,
      data: results,
      columns: response.data.result?.column_count || 0
    });

  } catch (error) {
    console.error('Error en query:', error.message);

    res.status(500).json({
      error: error.response?.data?.message || error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Servir index.html para todas las rutas no API
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🐛 BugBuster Control Tower escuchando en puerto ${PORT}`);
  console.log(`Endpoint API: http://localhost:${PORT}/api/query`);
});
