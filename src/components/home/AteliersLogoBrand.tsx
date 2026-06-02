/**
 * Visual logo component for Ateliers360 homepage
 * 3 elements forming a cohesive brand identity
 */

export const AteliersLogoBrand = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-3">
            {/* Top row - 2 elements */}
            <div className="flex gap-3">
                {/* Top left - Blue accent square */}
                <div className="w-7 h-7 bg-accent rounded-md shadow-lg shadow-accent/20" />

                {/* Top right - Medium accent square */}
                <div className="w-7 h-7 bg-accent/70 rounded-md shadow-lg shadow-accent/15" />
            </div>

            {/* Bottom - Larger accent square */}
            <div className="w-7 h-7 bg-accent/40 rounded-md shadow-lg shadow-accent/10" />

            {/* Brand text below */}
            <div className="mt-2 text-center">
                <p className="text-xs font-bold text-white tracking-wider">
                    A360
                </p>
            </div>
        </div>
    );
};

export default AteliersLogoBrand;
