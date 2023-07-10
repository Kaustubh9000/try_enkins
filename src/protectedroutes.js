import Login from "./container/login";

function ProtectedRoutes(props){
        if(sessionStorage.getItem("userName") != undefined){
            return <props.component/>
        }else{
            return <Login/>
        }
}

export default ProtectedRoutes;