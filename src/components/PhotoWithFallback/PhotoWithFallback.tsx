import defaultPhoto from "../../assets/placeholder_svg.svg";

export default function PhotoWithFallback({
                                              photoUrl,
                                              alt,
                                              index
                                          }:
                                          {
                                              photoUrl: string | undefined,
                                              alt: string,
                                              index: number
                                          }) {

    return <img src={photoUrl || defaultPhoto}
                className="w-full h-48 object-cover rounded-t"
                onError={(e) => {
                    e.currentTarget.src = defaultPhoto
                }}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                alt={alt.length && alt !== 'Unknown' ? alt : 'Pet photo'}
    />
}