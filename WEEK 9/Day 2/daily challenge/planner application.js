import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";

const h = React.createElement;
const ADD_ACTIVITY = "planner/ADD_ACTIVITY";
const TOGGLE_ACTIVITY = "planner/TOGGLE_ACTIVITY";
const DELETE_ACTIVITY = "planner/DELETE_ACTIVITY";
const SET_FILTER = "planner/SET_FILTER";

const initialState = {
  activities: [],
  filter: "all",
};

export const addActivity = (activity) => ({
  type: ADD_ACTIVITY,
  payload: { ...activity, id: `${Date.now()}-${Math.random()}`, completed: false },
});

export const toggleActivity = (id) => ({ type: TOGGLE_ACTIVITY, payload: id });
export const deleteActivity = (id) => ({ type: DELETE_ACTIVITY, payload: id });
export const setFilter = (filter) => ({ type: SET_FILTER, payload: filter });

export function plannerReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ACTIVITY:
      return { ...state, activities: [...state.activities, action.payload] };
    case TOGGLE_ACTIVITY:
      return {
        ...state,
        activities: state.activities.map((activity) =>
          activity.id === action.payload
            ? { ...activity, completed: !activity.completed }
            : activity
        ),
      };
    case DELETE_ACTIVITY:
      return {
        ...state,
        activities: state.activities.filter(
          (activity) => activity.id !== action.payload
        ),
      };
    case SET_FILTER:
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}

const devToolsEnhancer =
  typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : undefined;
const store = createStore(plannerReducer, devToolsEnhancer);

const styles = `
  * { box-sizing: border-box; }
  body { margin: 0; background: #f3f5f9; color: #202838; font-family: Inter, system-ui, sans-serif; }
  .planner { max-width: 900px; margin: 40px auto; padding: 28px; }
  .planner-card { background: #fff; border: 1px solid #e7eaf0; border-radius: 18px; padding: 24px; box-shadow: 0 14px 40px #18243a0d; }
  .planner h1 { margin: 0; font-size: clamp(1.8rem, 4vw, 2.5rem); letter-spacing: -.05em; }
  .planner-subtitle { margin: 8px 0 24px; color: #788294; }
  .planner-form { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr auto; gap: 10px; margin-bottom: 22px; }
  .planner input, .planner select { min-width: 0; padding: 11px 12px; border: 1px solid #dfe4ec; border-radius: 9px; background: #fff; color: inherit; font: inherit; }
  .planner button { border: 0; border-radius: 9px; padding: 10px 14px; color: #fff; background: #4f46e5; font: inherit; font-weight: 700; cursor: pointer; }
  .planner button:hover { filter: brightness(.94); }
  .planner-filters { display: flex; gap: 8px; margin: 0 0 16px; }
  .planner-filters button { border: 1px solid #e0e4eb; background: #fff; color: #596477; padding: 8px 13px; }
  .planner-filters button.active { background: #202838; border-color: #202838; color: #fff; }
  .planner-list { display: grid; gap: 10px; padding: 0; margin: 0; list-style: none; }
  .planner-activity { display: flex; align-items: center; gap: 13px; padding: 14px; border: 1px solid #eaedf2; border-radius: 12px; }
  .planner-activity input[type=checkbox] { width: 18px; height: 18px; accent-color: #4f46e5; }
  .planner-details { flex: 1; min-width: 0; }
  .planner-title { font-weight: 700; overflow-wrap: anywhere; }
  .planner-title.done { color: #929aaa; text-decoration: line-through; }
  .planner-meta { margin-top: 5px; color: #7a8494; font-size: .84rem; }
  .planner-remove { background: #fff !important; color: #c2413a !important; border: 1px solid #f1d6d4 !important; padding: 8px 11px !important; }
  .planner-empty { padding: 28px 10px; text-align: center; color: #788294; }
  .planner-summary { margin: 18px 0 0; color: #788294; font-size: .9rem; }
  @media (max-width: 700px) {
    .planner { margin: 16px auto; padding: 12px; }
    .planner-form { grid-template-columns: 1fr 1fr; }
    .planner-form input:first-child { grid-column: 1 / -1; }
    .planner-activity { align-items: flex-start; }
  }
`;

function ActivityForm({ addActivityAction }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Study");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState("09:00");

  function submit(event) {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    addActivityAction({ title: trimmedTitle, category, date, time });
    setTitle("");
  }

  return h("form", { className: "planner-form", onSubmit: submit },
    h("input", {
      "aria-label": "Activity",
      placeholder: "What do you need to do?",
      value: title,
      onChange: (event) => setTitle(event.target.value),
      required: true,
    }),
    h("select", {
      "aria-label": "Category",
      value: category,
      onChange: (event) => setCategory(event.target.value),
    }, ["Study", "Work", "Personal", "Other"].map((option) =>
      h("option", { key: option, value: option }, option)
    )),
    h("input", {
      "aria-label": "Date",
      type: "date",
      value: date,
      onChange: (event) => setDate(event.target.value),
      required: true,
    }),
    h("input", {
      "aria-label": "Time",
      type: "time",
      value: time,
      onChange: (event) => setTime(event.target.value),
      required: true,
    }),
    h("button", { type: "submit" }, "Add activity")
  );
}

function ActivityRow({ activity, toggleAction, deleteAction }) {
  const formattedDate = activity.date
    ? new Date(`${activity.date}T00:00:00`).toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : "No date";

  return h("li", { className: "planner-activity" },
    h("input", {
      type: "checkbox",
      checked: activity.completed,
      "aria-label": `Mark ${activity.title} as ${
        activity.completed ? "not complete" : "complete"
      }`,
      onChange: () => toggleAction(activity.id),
    }),
    h("div", { className: "planner-details" },
      h("div", {
        className: `planner-title${activity.completed ? " done" : ""}`,
      }, activity.title),
      h("div", { className: "planner-meta" },
        `${formattedDate} · ${activity.time} · ${activity.category}`
      )
    ),
    h("button", {
      className: "planner-remove",
      type: "button",
      onClick: () => deleteAction(activity.id),
      "aria-label": `Remove ${activity.title}`,
    }, "Remove")
  );
}

function Planner({ activities, filter, addActivityAction, toggleAction, deleteAction, filterAction }) {
  const visibleActivities = activities
    .filter((activity) => {
      if (filter === "active") return !activity.completed;
      if (filter === "completed") return activity.completed;
      return true;
    })
    .slice()
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
  const completedCount = activities.filter((activity) => activity.completed).length;

  return h("main", { className: "planner" },
    h("style", null, styles),
    h("section", { className: "planner-card" },
      h("h1", null, "Daily Planner"),
      h("p", { className: "planner-subtitle" }, "Plan your day, one activity at a time."),
      h(ActivityForm, { addActivityAction }),
      h("div", { className: "planner-filters", "aria-label": "Filter activities" },
        [["all", "All"], ["active", "To do"], ["completed", "Done"]].map(([value, label]) =>
          h("button", {
            key: value,
            type: "button",
            className: filter === value ? "active" : "",
            onClick: () => filterAction(value),
          }, label)
        )
      ),
      visibleActivities.length
        ? h("ul", { className: "planner-list" },
            visibleActivities.map((activity) =>
              h(ActivityRow, {
                key: activity.id,
                activity,
                toggleAction,
                deleteAction,
              })
            )
          )
        : h("div", { className: "planner-empty" }, "No activities here yet. Add one above."),
      h("p", { className: "planner-summary" },
        `${completedCount} of ${activities.length} activities completed`
      )
    )
  );
}

const mapStateToProps = (state) => ({
  activities: state.activities,
  filter: state.filter,
});

const mapDispatchToProps = (dispatch) => ({
  addActivityAction: (activity) => dispatch(addActivity(activity)),
  toggleAction: (id) => dispatch(toggleActivity(id)),
  deleteAction: (id) => dispatch(deleteActivity(id)),
  filterAction: (filter) => dispatch(setFilter(filter)),
});

const ConnectedPlanner = connect(mapStateToProps, mapDispatchToProps)(Planner);

export default function PlannerApplication() {
  return h(Provider, { store }, h(ConnectedPlanner));
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error('Planner application requires an element with id="root".');
}
createRoot(rootElement).render(h(PlannerApplication));