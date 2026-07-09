import Link from "next/link";
import Image from "next/image";

/**
 * Visual logo component for Ateliers360 homepage
 * 3 elements forming a cohesive brand identity
 */

export const AteliersLogoBrand = () => {
    const logoLink = "/";
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <Link href={logoLink} aria-label="Ateliers 360" className="relative h-24 w-24">
                <Image
                    src="/images/logo.png"
                    alt="Ateliers 360"
                    fill
                    className="object-contain border border-white/10 rounded-full"
                    sizes="100px"
                />
            </Link>

             {/* <div className="text-center">
                <p className="text-lg font-semibold text-white">Ateliers 360</p>
                <p className="text-sm text-slate-300">Créativité, technologie, partage</p>
            </div>end text */}
        </div>
    );
};

export default AteliersLogoBrand;
