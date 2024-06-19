import { all, fork } from "redux-saga/effects";
import { watchProjects } from "../features/projects/sagas";
import { watchGetUsers } from "../features/users/sagas";
import { watchTasks } from "../features/tasks/sagas";
import { watchColumns } from "../features/columns/sagas";
import { authWatcherSaga } from "../features/auth/sagas";

const rootSaga = function* () {
  yield all([
    fork(watchProjects),
    fork(watchGetUsers),
    fork(watchTasks),
    fork(watchColumns),
    fork(authWatcherSaga),
  ]);
};

export default rootSaga;
