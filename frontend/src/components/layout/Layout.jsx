import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import "../styles/Layout.css";


function Layout({children}){


return (

<div className="app-layout">


<Sidebar />


<div className="main-area">


<Topbar />


<div className="page-content">

{children}

</div>


</div>


</div>


);


}


export default Layout;