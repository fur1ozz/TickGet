import NewEvent from "@/app/(users)/profile/new-event/NewEvent";

export default function NewEventPage(){
    return(
        <>
            <main className="bg-gray-50 dark:bg-darkPrimary bg-cover bg-center bg-fixed">
                <div className="sticky h-screen overflow-y-auto flex flex-col">
                    {/*    <div className="border-t-2 border-white w-full"></div>*/}
                    <NewEvent />
                </div>
            </main>
        </>
    )
}