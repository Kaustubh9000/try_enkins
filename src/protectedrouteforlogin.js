import Home from "./container/home";

function ProtectedRoutesforLogin(props){
        if(sessionStorage.getItem("userName") == undefined){
            return <props.component/>
        }else{
            return <Home/>
        }
}

export default ProtectedRoutesforLogin;