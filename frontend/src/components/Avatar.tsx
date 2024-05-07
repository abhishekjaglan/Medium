export function Avatar({initials, size = 6}:{initials: string, size?: number}){
    return (
        <div>
            <div className={`relative inline-flex items-center justify-center w-${size}  h-${size} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
                <span className="font-xsm font-extralight text-gray-600 dark:text-gray-300">{initials}</span>
            </div>
        </div>
    )
}