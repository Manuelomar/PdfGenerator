import { TemplateField } from "./templateField.model";

export interface Template {
    id: string;
    name: string;
    fields: TemplateField[];
    createdAt: string;
    updatedAt: string;
}