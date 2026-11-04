import { Router, Request, Response } from 'express';
import { getDb } from '../db';

export const publicRouter = Router();

publicRouter.get('/content', (_req: Request, res: Response): void => {
  const db = getDb();
  res.json({ content: db.content });
});

publicRouter.get('/system-status', (_req: Request, res: Response): void => {
  const db = getDb();
  res.json({
    maintenanceMode: db.settings.maintenanceMode,
    allowNewRegistrations: db.settings.allowNewRegistrations
  });
});
