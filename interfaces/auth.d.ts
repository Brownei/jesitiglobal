import { JWTPayload } from "jose";
import { Roles } from "@prisma/client";

declare interface AuthPayload extends JWTPayload {
    id: number;
}