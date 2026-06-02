// lib/quotes.ts
import fs from "fs";
import path from "path";

function simpleRender(templateSource: string, data: Record<string, any>) {
    // Replace simple {{key}} placeholders. Does not support full Handlebars features.
    return templateSource.replace(/{{\s*([\w.]+)\s*}}/g, (_, key) => {
        const parts = key.split('.');
        let value: any = data;
        for (const p of parts) {
            if (value && typeof value === 'object' && p in value) value = value[p];
            else return '';
        }
        return String(value ?? '');
    });
}

export function renderQuoteHtml(data: Record<string, any>) {
    const templatePath = path.join(
        process.cwd(),
        "templates",
        "quote-template.html",
    );
    const templateSource = fs.readFileSync(templatePath, "utf8");
    return simpleRender(templateSource, data);
}

export function renderQuoteEmail(data: Record<string, any>) {
    const templatePath = path.join(
        process.cwd(),
        "templates",
        "quote-email.html",
    );
    const templateSource = fs.readFileSync(templatePath, "utf8");
    return simpleRender(templateSource, data);
}
