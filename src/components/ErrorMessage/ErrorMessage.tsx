export default function ErrorMessage({message}: { message: string | number}) {
    if (!message) return
    return <span className="text-red-500">{message}</span>
}