import { INote } from "@/interface";
import fs from "fs/promises";
export class NoteService {
  constructor() {}
  async getNotesByUserId(userId: string) {
    const notes = await this.getNotes();
    const userNotes = notes.filter((note) => note.userId === userId);
    return userNotes;
  }
  async createNoteByUserId(userId: string, note: INote | null) {
    if (!note) {
      throw new Error("Note not found");
    }
    const notes = await this.getNotes();
    note.id = "note_" + Number(Date.now() / 1000).toFixed(0);
    note.userId = userId;
    note.createdAt = new Date().toISOString();
    note.updatedAt = new Date().toISOString();
    notes.push(note);
    await fs.writeFile("./store/notes.json", JSON.stringify(notes));
    return note;
  }
  async updateNoteId(id: string, userId: string, newNote: INote | null) {
    const notes = await this.getNotes();
    const note = notes.find((note) => note.id === id && note.userId === userId);
    if (!note) {
      throw new Error("Note not found");
    }
    if (!newNote) {
      throw new Error("Note not found");
    }
    note.title = newNote.title;
    note.body = newNote.body;
    note.updatedAt = new Date().toISOString();
    await fs.writeFile("./store/notes.json", JSON.stringify(notes));
    return note;
  }
  async deleteNote(id: string, userId: string) {
    const notes = await this.getNotes();
    const note = notes.find((note) => note.id === id && note.userId === userId);
    const newNotes = notes.filter((note) => note.id !== id);
    await fs.writeFile("./store/notes.json", JSON.stringify(newNotes));
    return note;
  }

  async getNotes() {
    const notes = await fs.readFile("./store/notes.json", "utf-8");
    const parsedNotes = JSON.parse(notes) as INote[];
    const orderDescNotes = parsedNotes.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    return orderDescNotes;
  }
}
