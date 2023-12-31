import { useDrop } from "react-dnd";
import PartecipantBox from "./PartecipantBox";
import { StudentContext } from "../../context/student.context";
import { useContext } from "react";

const PreferenceBox = ({ updateList, preferences, type, remove }) => {
  const { studentData } = useContext(StudentContext);
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: type,
    drop: (item) => updateList(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }), [type]);

  return (
    <div
      className="col col-3 border border-dark"
      ref={drop}
      style={{ background: canDrop && "	mintcream" }} // seashell
    >
      <ol ref={drop}>
        {preferences.map((student) => {
          return (
            <li key={student._id}>
              <PartecipantBox student={student} type="chosen" addedTo={preferences} remove={remove}/>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default PreferenceBox;
