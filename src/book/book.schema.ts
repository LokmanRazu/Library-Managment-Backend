import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type BookDocument = Book & Document

@Schema()
export class Book {
    @Prop({ required: false })
    img?: String

    @Prop({ required: true })
    title: String


    @Prop({ required: true })
    author: String

    @Prop({ required: true })
    type: String

    @Prop({ required: true })
    description: String

    @Prop({ required: false })
    rating: String

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;
}


export const BookSchema = SchemaFactory.createForClass(Book)