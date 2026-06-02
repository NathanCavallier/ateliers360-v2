"use client";

import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
    AlertCircle,
    ArrowRight,
    CheckCircle,
    Clock,
    TrendingUp,
} from "lucide-react";

interface RightSidebarProps {
    title: string;
    description?: string;
    stats?: {
        label: string;
        value: string | number;
        icon?: React.ReactNode;
        variant?: "default" | "pending" | "success" | "warning";
    }[];
    actions?: {
        label: string;
        href?: string;
        onClick?: () => void;
        variant?: "default" | "secondary" | "destructive";
        icon?: React.ReactNode;
    }[];
    children?: ReactNode;
}

const variantStyles = {
    default: "bg-slate-50 border-slate-200",
    pending: "bg-yellow-50 border-yellow-200",
    success: "bg-green-50 border-green-200",
    warning: "bg-red-50 border-red-200",
};

const textVariants = {
    default: "text-slate-700",
    pending: "text-yellow-700",
    success: "text-green-700",
    warning: "text-red-700",
};

export function RightSidebar({
    title,
    description,
    stats,
    actions,
    children,
}: RightSidebarProps) {
    return (
        <div className="w-full lg:w-80 space-y-4">
            <Card className="sticky top-4">
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{title}</CardTitle>
                    {description && (
                        <p className="text-sm text-muted-foreground mt-1">
                            {description}
                        </p>
                    )}
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Stats */}
                    {stats && stats.length > 0 && (
                        <div className="space-y-2">
                            {stats.map((stat, idx) => (
                                <div
                                    key={idx}
                                    className={cn(
                                        "p-3 rounded-lg border transition-colors",
                                        variantStyles[
                                            stat.variant || "default"
                                        ],
                                    )}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            {stat.icon && (
                                                <div
                                                    className={cn(
                                                        "p-1.5 rounded bg-white",
                                                        textVariants[
                                                            stat.variant ||
                                                            "default"
                                                        ],
                                                    )}
                                                >
                                                    {stat.icon}
                                                </div>
                                            )}
                                            <div className="text-sm">
                                                {stat.label}
                                            </div>
                                        </div>
                                        <div
                                            className={cn(
                                                "font-semibold text-lg",
                                                textVariants[
                                                    stat.variant || "default"
                                                ],
                                            )}
                                        >
                                            {stat.value}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Actions */}
                    {actions && actions.length > 0 && (
                        <div className="space-y-2 pt-2 border-t">
                            {actions.map((action, idx) => (
                                <Button
                                    key={idx}
                                    variant={action.variant as any ||
                                        "secondary"}
                                    className="w-full justify-start gap-2"
                                    onClick={action.onClick}
                                    asChild={!!action.href && !action.onClick}
                                >
                                    {action.href && !action.onClick
                                        ? (
                                            <a href={action.href}>
                                                {action.icon && action.icon}
                                                <span className="flex-1 text-left">
                                                    {action.label}
                                                </span>
                                                <ArrowRight className="w-4 h-4" />
                                            </a>
                                        )
                                        : (
                                            <>
                                                {action.icon && action.icon}
                                                <span className="flex-1 text-left">
                                                    {action.label}
                                                </span>
                                                <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                </Button>
                            ))}
                        </div>
                    )}

                    {/* Custom Content */}
                    {children && <div className="pt-2 border-t">{children}
                    </div>}
                </CardContent>
            </Card>
        </div>
    );
}

export function RightSidebarItem({
    label,
    value,
    icon: Icon,
    status,
}: {
    label: string;
    value: string | number;
    icon?: React.ComponentType<{ className?: string }>;
    status?: "pending" | "success" | "warning" | "default";
}) {
    const statusConfig = {
        pending: { icon: Clock, color: "text-yellow-600" },
        success: { icon: CheckCircle, color: "text-green-600" },
        warning: { icon: AlertCircle, color: "text-red-600" },
        default: { icon: TrendingUp, color: "text-slate-600" },
    };

    const config = statusConfig[status || "default"];
    const StatusIcon = config.icon;

    return (
        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-2">
                {Icon
                    ? <Icon className="w-4 h-4 text-muted-foreground" />
                    : <StatusIcon className={cn("w-4 h-4", config.color)} />}
                <span className="text-sm font-medium">{label}</span>
            </div>
            <span className="text-sm font-semibold text-foreground">
                {value}
            </span>
        </div>
    );
}
