import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from './Footer';
import Perayaan from './EventS'
export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                <Navbar />
                <Outlet />
            </div>
            <Footer />
            <div className=""><Perayaan /></div>
        </div>
    );
}
