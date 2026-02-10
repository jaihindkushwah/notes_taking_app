import { IUser } from "@/interface";
import fs from "fs/promises";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export class AuthService {
  constructor() {}
  async login(email: string, pass: string) {
    const auth = await this.getAuthData();
    const modifiedEmail = email.trim().toLowerCase();
    const user = auth.find((user) => user.email == modifiedEmail);
    if (!user) {
      throw new Error("User not found");
    }
    if (!this.verifyPassword(pass, user.password)) {
      throw new Error("Invalid password");
    }
    const token = this.generateToken(user);
    const { password, ...newUser } = user;
    return { token, ...newUser };
  }
  async register(user: IUser | null) {
    if (!user) {
      throw new Error("User not found");
    }
    const auth = await this.getAuthData();
    const modifiedEmail = user.email.trim().toLowerCase();
    const findUser = auth.find((user) => user.email === modifiedEmail);
    if (findUser) {
      throw new Error("User already exists");
    }
    user.password = this.hashPassword(user.password);
    auth.push(user);
    await fs.writeFile("./store/auth.json", JSON.stringify(auth));
    const token = this.generateToken(user);
    const { password, ...newUser } = user;
    return { token, ...newUser };
  }
  private async getAuthData() {
    const authData = await fs.readFile("./store/auth.json", "utf-8");
    return JSON.parse(authData) as IUser[];
  }
  private generateToken(user: IUser) {
    const token = jwt.sign({ id: user.email }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    return token;
  }
  private hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }
  private verifyPassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }
}
