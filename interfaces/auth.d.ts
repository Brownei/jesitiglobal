import { JWTPayload } from "jose";
import { Roles } from "@prisma/client";

declare interface AuthPayload extends JWTPayload {
    id: number;
    role: Roles;
    email: string;
    firstName: string;
    lastName: string;
    image: string;
}