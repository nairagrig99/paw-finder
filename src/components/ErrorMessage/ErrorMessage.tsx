export default function ErrorMessage({message}: { message: string | undefined}) {
    if (!message) return
    return <span className="text-red-500">{message}</span>
}