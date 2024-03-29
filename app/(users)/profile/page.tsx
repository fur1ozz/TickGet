import ProfileInfo from "@/app/(users)/profile/ProfileInfo";

export default function Profile(){
    return(
        <>
            <main className="bg-gray-50 dark:bg-darkPrimary bg-cover bg-center bg-fixed">
                <div className="sticky h-screen overflow-y-auto flex flex-col">
                    {/*    <div className="border-t-2 border-white w-full"></div>*/}
                    <ProfileInfo />
                </div>
            </main>
        </>
    )
}