import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
export default function NavBar() {
  return (
    <nav className="flex justify-between font-ibm-plex-mono items-center p-4 text-white">
      <div className="flex items-center">
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2 w-8" />
      </div>
      <div className="text-3xl font-semibold">DropLinks</div>
      <div className=""></div>
    </nav>
  );
}
