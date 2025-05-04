import UserData from "./userData"
function Header (){
    return(
        <div className="w-full px-5 py-2 h-[64px] bg-red-400 flex justify-between items-center">
            <h1 className="text-[16px] font-semibold text-white">Hotel Management System</h1>
            <UserData name="thisal karunarathna"/>
        </div>
    )
}

export default Header
