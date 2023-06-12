import { z } from "zod";

const title = z
.string()
.min(4, {message: "O titulo precisa ter mais de 3 caracteres"})
.max(16, {message:"O titulo precisa ter menos de 17 caracteres"});

const subtitle = z
.string()
.min(8, {message: "O subtitulo precisa ter mais de 7 caracteres"})
.max(24, {message:"O subtitulo precisa ter menos de 25 caracteres"});

const content = z
.string()
.min(16, {message: "O conteudo precisa ter mais de 15 caracteres"})
.max(140, {message:"O conteudo precisa ter menos de 141 caracteres"});

export const notepadSchema = z.object ({
    title,
    subtitle,
    content,

});