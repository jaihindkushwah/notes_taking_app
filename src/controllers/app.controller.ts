import { AuthService } from "@/service/auth.service";
import { NoteService } from "@/service/note.service";
import { createNoteSchema } from "@/utils/validationSchema";
import { Request, Response } from "express";
export class AppController {
  private noteService: NoteService = new NoteService();
  private authService: AuthService = new AuthService();
  constructor() {
    this.healthCheck = this.healthCheck.bind(this);
    this.getAllNotes = this.getAllNotes.bind(this);
    this.getNotesByUserId = this.getNotesByUserId.bind(this);
    this.createNoteByUserId = this.createNoteByUserId.bind(this);
    this.updateNoteId = this.updateNoteId.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }
  healthCheck(req: Request, res: Response) {
    return res.status(200).json({ message: "OK" });
  }
  async getAllNotes(req: Request, res: Response) {
    try {
      const notes = await this.noteService.getNotes();
      return res.status(200).json(notes);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  async getNotesByUserId(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const notes = await this.noteService.getNotesByUserId(userId);
      return res.status(200).json(notes);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  async createNoteByUserId(req: Request, res: Response) {
    try {
      await createNoteSchema.validate(req.body);
      const userId = (req as any).user.id;
      const note = await this.noteService.createNoteByUserId(userId, req.body);
      return res.status(201).json(note);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  async updateNoteId(req: Request, res: Response) {
    try {
      await createNoteSchema.validate(req.body);
      const userId = (req as any).user.id;
      const note = await this.noteService.updateNoteId(
        req.params.id as string,
        userId,
        req.body,
      );
      return res.status(200).json(note);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  async deleteNote(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const note = await this.noteService.deleteNote(
        req.params.id as string,
        userId,
      );
      if (!note) {
        return res.status(404).json({ message: "Note not found" });
      }
      console.log(note);
      return res.status(204).json({ message: "Note deleted successfully" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  async login(req: Request, res: Response) {
    try {
      const user = await this.authService.login(
        req.body.email,
        req.body.password,
      );
      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  async register(req: Request, res: Response) {
    try {
      const user = await this.authService.register(req.body);
      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
