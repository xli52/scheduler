import React from "react";
import Header from './Header';
import Empty from './Empty';
import Show from './Show';
import Form from "./Form";

import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === SHOW &&
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
        />
      }
      {mode === EMPTY &&
        <Empty
          onAdd={() => transition(CREATE)}
        />
      }
      {mode === CREATE &&
        <Form
          interviewers={[]}
          onSave={() => {}}
          onCancel={back}
        />
      }
    </article>
  );
};