import { Card } from '@/shared/components/ui/card';

interface ShimmerProps {
    className?: string;
    height?: string;
}

export function Shimmer({ className = '', height = 'h-4' }: ShimmerProps) {
    return (
        <div className={`animate-pulse bg-gray-200 rounded ${height} ${className}`} />
    );
}

export function ShimmerCard({ children, className = '' }: { children?: React.ReactNode; className?: string }) {
    return (
        <Card className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${className}`}>
            {children}
        </Card>
    );
}

export function CaseStatusChartSkeleton() {
    return (
        <ShimmerCard className="h-full">
            <div className="flex items-center gap-3 mb-6">
                <Shimmer className="w-10 h-10 rounded-lg" />
                <Shimmer className="w-48 h-6" />
            </div>
            <div className="flex items-center justify-center gap-8">
                <div className="w-60% flex justify-center">
                    <Shimmer className="w-40 h-40 rounded-full" />
                </div>
                <div className="flex flex-col gap-4 w-35%">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Shimmer className="w-4 h-4 rounded-full" />
                                <Shimmer className="w-20 h-4" />
                            </div>
                            <div className="text-right">
                                <Shimmer className="w-12 h-5 mb-1" />
                                <Shimmer className="w-8 h-3" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ShimmerCard>
    );
}

export function ConversationMetricsSkeleton() {
    return (
        <ShimmerCard className="h-full">
            <div className="flex items-center gap-3 mb-6">
                <Shimmer className="w-10 h-10 rounded-lg" />
                <Shimmer className="w-40 h-6" />
            </div>
            <div className="grid grid-cols-1 gap-4 flex-1">
                {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="text-center py-4 border rounded-lg border-gray-200">
                        <Shimmer className="w-16 h-8 mb-2 mx-auto" />
                        <Shimmer className="w-24 h-4 mx-auto" />
                    </div>
                ))}
            </div>
        </ShimmerCard>
    );
}

export function DepartmentInquiriesChartSkeleton() {
    return (
        <ShimmerCard>
            <div className="flex items-center gap-3 mb-6">
                <Shimmer className="w-10 h-10 rounded-lg" />
                <Shimmer className="w-52 h-6" />
            </div>
            <div className="relative flex">
                <div className="flex flex-col justify-between pr-3 h-60">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Shimmer key={i} className="w-8 h-3" />
                    ))}
                </div>
                <div className="flex-1">
                    <div className="relative h-60">
                        <div className="absolute inset-0 flex items-end justify-around px-4">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="flex flex-col items-center w-full max-w-[80px]">
                                    <Shimmer className="w-8 h-4 mb-1" />
                                    <Shimmer className={`w-full h-${20 + i * 8} rounded-t-lg`} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-around px-4 mt-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Shimmer key={i} className="w-16 h-3" />
                        ))}
                    </div>
                </div>
            </div>
        </ShimmerCard>
    );
}

export function RecentCasesTableSkeleton() {
    return (
        <ShimmerCard>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Shimmer className="w-10 h-10 rounded-lg" />
                    <Shimmer className="w-32 h-6" />
                </div>
                <Shimmer className="w-32 h-10 rounded-lg" />
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <th key={i} className="py-3 px-4">
                                    <Shimmer className="w-24 h-4" />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 6 }).map((_, i) => (
                            <tr key={i} className="border-b border-gray-100">
                                {Array.from({ length: 5 }).map((_, j) => (
                                    <td key={j} className="py-3 px-4">
                                        <Shimmer className={j === 4 ? "w-16 h-6 rounded-full" : "w-full h-4"} />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </ShimmerCard>
    );
}

export function DocumentStatsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 2 }).map((_, i) => (
                <ShimmerCard key={i}>
                    <Shimmer className="w-12 h-12 rounded-lg mb-4" />
                    <Shimmer className="w-20 h-8 mb-1" />
                    <Shimmer className="w-32 h-4" />
                </ShimmerCard>
            ))}
        </div>
    );
}

export function ChartSkeleton({ height = "h-80" }: { height?: string }) {
    return (
        <ShimmerCard>
            <div className="flex items-center gap-3 mb-6">
                <Shimmer className="w-10 h-10 rounded-lg" />
                <Shimmer className="w-48 h-6" />
            </div>
            <Shimmer className={`w-full ${height} rounded-lg`} />
        </ShimmerCard>
    );
}

// Legislation Dashboard Shimmer Components

export function UploadTrendChartSkeleton() {
    return (
        <ShimmerCard>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Shimmer className="w-10 h-10 rounded-lg" />
                    <Shimmer className="w-48 h-6" />
                </div>
                <div className="flex items-center gap-2">
                    <Shimmer className="w-12 h-4" />
                    <Shimmer className="w-8 h-5" />
                    <Shimmer className="w-16 h-4" />
                </div>
            </div>
            <Shimmer className="w-full h-70 rounded-lg mb-6" />
            <div className="flex justify-center gap-6 pt-4 border-t border-gray-200">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2">
                            <Shimmer className="w-3 h-3 rounded-full" />
                            <Shimmer className="w-12 h-4" />
                        </div>
                        <Shimmer className="w-16 h-3" />
                    </div>
                ))}
            </div>
        </ShimmerCard>
    );
}

export function DocumentsByCategoryChartSkeleton() {
    return (
        <ShimmerCard>
            <div className="flex items-center gap-3 mb-6">
                <Shimmer className="w-10 h-10 rounded-lg" />
                <Shimmer className="w-56 h-6" />
            </div>
            <div className="relative flex">
                <div className="flex flex-col justify-between pr-3 h-60">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Shimmer key={i} className="w-8 h-3" />
                    ))}
                </div>
                <div className="flex-1">
                    <div className="relative h-60">
                        <div className="absolute inset-0 flex items-end justify-around px-4">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="flex flex-col items-center w-full max-w-[80px]">
                                    <Shimmer className="w-8 h-4 mb-1" />
                                    <Shimmer className={`w-full h-${16 + i * 6} rounded-t-lg`} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-around px-4 mt-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Shimmer key={i} className="w-12 h-6" />
                        ))}
                    </div>
                </div>
            </div>
        </ShimmerCard>
    );
}

export function DocumentsByEntityChartSkeleton() {
    return (
        <ShimmerCard>
            <div className="flex items-center gap-3 mb-6">
                <Shimmer className="w-10 h-10 rounded-lg" />
                <Shimmer className="w-52 h-6" />
            </div>
            <div className="space-y-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                        <Shimmer className="w-32 h-4 flex-shrink-0" />
                        <div className="flex-1 flex items-center">
                            <Shimmer className={`h-7 rounded ${i === 0 ? 'w-4/5' : i === 1 ? 'w-3/5' : i === 2 ? 'w-3/4' : i === 3 ? 'w-1/2' : i === 4 ? 'w-2/5' : i === 5 ? 'w-1/3' : i === 6 ? 'w-1/4' : 'w-1/5'}`} />
                            <Shimmer className="w-8 h-4 ml-2" />
                        </div>
                    </div>
                ))}
            </div>
        </ShimmerCard>
    );
}