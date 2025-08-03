import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type UserDocument = User & Document

@Schema()
export class User {
    @Prop({ required: true })
   name: String

    @Prop({ required: true })
    email: String


    @Prop({ required: true })
    password: String


}
export const UserSchema = SchemaFactory.createForClass(User)