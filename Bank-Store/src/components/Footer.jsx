import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBank } from "@fortawesome/free-solid-svg-icons";
export default function Footer(){
return(
    <footer className="flex justify-center font-primary items-center  py-4 text-gray-700">
    2026 All rights reserved | This register is made with  
        <a href="www.eTech.com" className="text-blue-500 hover:text-green-700"> eTech</a>
   
    <FontAwesomeIcon icon={faBank} className="text-primary font-semibold px-1 transition-colors duration-300 hover:text-dark"></FontAwesomeIcon>
   
    </footer>
);

}