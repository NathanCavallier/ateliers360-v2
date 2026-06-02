// src/data/catalogues.ts
export const cataloguesLinks = {
    catalogue_ateliers: {
        /** lien public (preview) dans Supabase Storage (public) */
        preview_link:
            "https://orzfuxasrbpkcaqvgvah.supabase.co/storage/v1/object/public/catalogues/Catalogue%20d'Ateliers.pdf",
        /**  lien de téléchargement (peut être Google Drive ou Supabase public) */
        download_link:
            "https://orzfuxasrbpkcaqvgvah.supabase.co/storage/v1/object/public/catalogues/Catalogue%20d'Ateliers.pdf",
        filename: "Catalogue d'Ateliers.pdf",
    },
    catalogue_thematiques: {
        preview_link:
            "https://orzfuxasrbpkcaqvgvah.supabase.co/storage/v1/object/public/catalogues/Catalogue%20Thematique.pdf",
        download_link:
            "https://orzfuxasrbpkcaqvgvah.supabase.co/storage/v1/object/public/catalogues/Catalogue%20Thematique.pdf",
        filename: "Catalogue Thématiques.pdf",
    },
};

export default cataloguesLinks;
