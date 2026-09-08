import {useEffect} from "react";

type ModalProps = {
    isOpen: boolean,
    setIsOpen: (open: boolean) => void
}
export default function AddReportModal({isOpen, setIsOpen}: ModalProps) {


    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        }
    }, []);


    return <div className="w-[600px] h-[600px] bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">

        <div className="relative">
            <div className="absolute right-2 top-0 text-xl">
                <button onClick={() => setIsOpen(!isOpen)}>
                    X
                </button>
            </div>
        </div>
        <div>
            <form action="" className="flex flex-col gap-5 p-5">
                <div>
                    <span>Announcement type </span>
                    <div className="flex gap-5">
                        <label>
                            <input type="radio" name="announcement_type" value="Lost"/>
                            Lost
                        </label>

                        <label>
                            <input type="radio" name="announcement_type" value="Found"/>
                            Found
                        </label>
                    </div>

                </div>


                <label htmlFor="pet-type">Pet Type</label>

                <select name="" id="" className="border-2 border-solid">
                    <option value="" disabled selected> Select a Pet type</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Other">Other</option>
                </select>

                <label className="flex flex-col gap-2">
                    Pet Name
                    <input type="text" placeholder="Pet name" name="pet" className="border-2 border-solid"/>
                </label>

                <label className="flex flex-col gap-2">
                    Photo URL
                    <input type="url" className="border-2 border-solid"/>
                </label>

                <label className="flex flex-col gap-2">
                    location
                    <input type="text" className="border-2 border-solid"/>

                </label>

                <label className="flex flex-col gap-2">
                    Contact info
                    <input type="text" className="border-2 border-solid"/>

                </label>
            </form>
        </div>
    </div>
}