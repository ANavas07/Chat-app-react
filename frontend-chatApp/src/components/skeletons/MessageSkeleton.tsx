
export default function MessageSkeleton() {
    return (
        <>
            <div className="flex gap-3 items-center">
                <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
                <div className="flex flex-col gap-1">
                    <div className="skeleton w-40 h-4"></div>
                    <div className="skeleton w-40 h-4"></div>
                </div>
            </div>
            <div className="flex gap-3 items-center justify-end">
                <div className="flex flex-col gap-1">
                    <div className="skeleton w-40 h-4"></div>
                </div>
                <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
            </div>
        </>
    )
}
