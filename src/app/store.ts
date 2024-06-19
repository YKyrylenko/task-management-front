import { Tuple, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import { projectsSlice } from "../features/projects/projectsSlice";
import rootSaga from "./root-saga";
import users from "../features/users/usersSlice";
import tasks from "../features/tasks/tasksSlice";
import columns from "../features/columns/columnsSlice";
import snackbar from "../features/snackbar/snackbarSlice";
import auth from "../features/auth/authSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    projects: projectsSlice.reducer,
    users,
    tasks,
    columns,
    snackbar,
    auth,
  },
  middleware: () => new Tuple(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
