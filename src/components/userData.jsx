import profilePic from "./../assets/IMG_2436.jpg"

function UserData(props){
    return(
        <div className="flex items-center space-x-2 cursor-pointer">
            <h1 className="text-[12px] text-white">{props.name}</h1>
            <img className="w-[35px] h-[35px] rounded-full" src={profilePic}/>
        </div>
    )
}

export default UserData;