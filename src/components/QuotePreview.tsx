// components/QuotePreview.tsx
"use client";

import React from "react";

type Item = { description: string; qty: number; unit_price: number };
export default function QuotePreview(
    {
        company,
        contact,
        email,
        phone,
        offerTitle,
        items,
        taxRate = 20,
        validUntil,
        paymentTerms,
    }: {
        company: string;
        contact: string;
        email: string;
        phone?: string;
        offerTitle: string;
        items: Item[];
        taxRate?: number;
        validUntil?: string;
        paymentTerms?: string;
    },
) {
    const subtotal = items.reduce((s, it) => s + it.qty * it.unit_price, 0);
    const tax = +(subtotal * (taxRate / 100)).toFixed(2);
    const total = +(subtotal + tax).toFixed(2);

    return (
        <div className="p-6 bg-white rounded-lg shadow">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-bold">Devis — {offerTitle}</h3>
                    <div className="text-sm text-muted-foreground">
                        {company}
                    </div>
                    <div className="text-sm text-muted-foreground">
                        {contact} • {email} {phone && `• ${phone}`}
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-sm">
                        Validité : {validUntil || "30 jours"}
                    </div>
                </div>
            </div>

            <table className="w-full mt-4 text-sm">
                <thead>
                    <tr className="text-left text-muted-foreground">
                        <th>Description</th>
                        <th>Qté</th>
                        <th>PU</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((it, i) => (
                        <tr key={i}>
                            <td>{it.description}</td>
                            <td>{it.qty}</td>
                            <td>{it.unit_price}€</td>
                            <td>{(it.qty * it.unit_price).toFixed(2)}€</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4 text-right">
                <div>Sous-total : {subtotal.toFixed(2)}€</div>
                <div>TVA ({taxRate}%) : {tax.toFixed(2)}€</div>
                <div className="font-bold">Total TTC : {total.toFixed(2)}€</div>
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
                <div>Conditions : {paymentTerms || "30 jours net"}</div>
            </div>
        </div>
    );
}
