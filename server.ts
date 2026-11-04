import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

import { getDb } from './src/server/db';
import { authRouter } from './src/server/routes/authRoutes';
import { adminRouter } from './src/server/routes/adminRoutes';
import { publicRouter } from './src/server/routes/publicRoutes';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;

async function startServer() {
  const app = express();

  // Initialize DB and ensure main admin is provisioned
  const db = getDb();
  console.log(`[Database] Initialized. Users registered: ${db.users.length}`);

  app.use(cors({ origin: true, credentials: true }));
  app.use(cookieParser());
  app.use(express.json());

  // Mount API Routers
  app.use('/api/auth', authRouter);
  app.use('/api/admin', adminRouter);
  app.use('/api/public', publicRouter);

  // Health and System Info API
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'Role-Based Authentication & Admin Platform',
      version: '2.0.0',
      timestamp: new Date().toISOString()
    });
  });

  // Vite development middleware or production static serving
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🚀 Security & RBAC Auth Portal running on http://localhost:${PORT}`);
    console.log(`👑 Root Admin Credentials:`);
    console.log(`   ID: admin`);
    console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'Admin@2026!'}`);
    console.log(`=======================================================`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
