import { ReactComponent as Check } from "../../assets/icons/check.svg";
import { ReactComponent as Close } from "../../assets/icons/close.svg";

const TaskItem = ({
  completed = true,
  onChangeTaskStatus,
  children,
  onDelete,
  id,
}) => {
  return (
    <div className={`task${completed ? " task--completed" : ""} task--dark`}>
      <div
        onClick={() => onChangeTaskStatus(id, !completed)}
        className={`check check--dark`}
      >
        {completed && <Check />}
      </div>
      <p className={`text${completed ? " text--completed" : ""} text--dark`}>
        {children}
      </p>
      <Close onClick={() => onDelete(id)} />
    </div>
  );
};

export default TaskItem;
