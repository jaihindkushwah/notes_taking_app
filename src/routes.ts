import { Router } from "express";
import { AppController } from "./controllers/app.controller";
import { validateAuth } from "./middleware/validateAuth";
import { rateLimiter } from "./middleware/rate-limiter";
export class Routes {
  private router = Router();
  private appController: AppController = new AppController();
  constructor() {}
  routes() {
    this.publicRoutes();
    this.protectedRoutes();
    return this.router;
  }
  protectedRoutes() {
    this.router.get(
      "/notes",
      validateAuth,
      this.appController.getNotesByUserId,
    );
    this.router.put(
      "/notes/:id",
      validateAuth,
      this.appController.updateNoteId,
    );
    this.router.delete(
      "/notes/:id",
      validateAuth,
      this.appController.deleteNote,
    );
    this.router.post(
      "/notes",
      validateAuth,
      rateLimiter,
      this.appController.createNoteByUserId,
    );
  }
  publicRoutes() {
    this.router.get("/health", this.appController.healthCheck);
    this.router.post("/login", this.appController.login);
    this.router.post("/register", this.appController.register);
  }
}
export const appRoutes = new Routes();
