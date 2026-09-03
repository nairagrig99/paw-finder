import defaultPhoto from "../../assets/placeholder_svg.svg";

export default function PhotoWithFallback({photoUrl}: { photoUrl: string | undefined }) {

    return <img src={photoUrl || defaultPhoto}
                className="w-full"
                onError={(e) => {
                    console.log("eee", e.currentTarget)
                    e.currentTarget.src = defaultPhoto
                }}
                alt=""/>
}