import { useNavigate } from "react-router-dom";
import { GrAdd } from "react-icons/gr";


export const Filter = () => {
    const navigate = useNavigate();
    return (
      <div className="open-search">
            <button onClick={() => navigate("/search")} className="add">
              <GrAdd />
            </button>
          
          </div>
    )
  }
  