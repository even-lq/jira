import { Link } from "react-router-dom"
import { Routes, Route, Navigate } from "react-router"
import { KanbanScreen } from "screens/kanban/index."
import { EpicScreen } from "screens/epic"

export const ProjectScreen = () => {
  return <div>
    <h1>ProjectScreen</h1>
    <Link to={'kanban'}>看板</Link>
    <Link to={'epic'}>任务组</Link>
    <Routes>
      {/* /projects/:projectId/kanban */}
      <Route path={'/kanban'} element={<KanbanScreen />} />
      <Route path={'/epic'} element={<EpicScreen />}/>
      {/* 上面的路由匹配不到就自动跳转到看板： */}
      {/* /projects/:projectId/kanban */}
      <Route path="*" element={<Navigate to={window.location.pathname + '/kanban'} replace={true} />} />
    </Routes>
  </div>
}