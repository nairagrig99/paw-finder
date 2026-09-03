import defaultPhoto from "../../assets/placeholder_svg.svg";

export default function PhotoWithFallback({photoUrl}: { photoUrl: string | undefined }) {

    return <img src={photoUrl || defaultPhoto}
                className="w-full"
                onError={(e) => {
                    e.currentTarget.src = defaultPhoto
                }}
                alt=""/>
}