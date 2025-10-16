import PcSearchBar from "../components/desktop/PcSearchBar";

function LoginPage (){
    return(
    <div>
        <PcSearchBar/>
        <div className="flex flex-col items-center">
            <p>You are in login Page</p>
        </div>
    </div>
    );
}

export default LoginPage;