import {
    Route,
    Routes,
  } from 'react-router-dom';
import LoginPage from './Login/LoginPage';
import ConsortiumListPage from './ConsortiumList/ConsortiumListPage';
import ConsortiumDetailsPage from './ConsortiumDetails/ConsortiumDetailsPage';
import { RunDetails } from './RunDetails/RunDetails';
import { RunList } from './RunList/RunList';
// import ConsortiumList from './ConsortiumList';
// import ConsortiumDetails from './ConsortiumDetails';
// import ComputationsList from './ComputationList';
// import ComputationDetails from './ComputationDetails';
// import ComputationsCreate from './ComputationsCreate';
// import NotificationList from './NotificationList';
// import RunsList from './RunList';
// import RunDetails from './RunDetails';
// import RunResults from './RunResults';
// import AdminEditUser from './AdminEditUser';
// import PageLogin from './PageLogin';
// import AppConfig from './AppConfig';
// import ConsortiumCreate from './ConsortiumCreate';
// import ChangePassword from './ChangePassword';

export default function AppRoutes() {   
    return (
        <Routes>
            <Route index path="/" element={<LoginPage></LoginPage>} />
            <Route index path="/login" element={<LoginPage></LoginPage>} />
            <Route path="/consortiumList" element={<ConsortiumListPage></ConsortiumListPage>} />
            <Route path="/consortium/details/:consortiumId" element={<ConsortiumDetailsPage></ConsortiumDetailsPage>} />
            <Route path="/run/details/:runId" element={<RunDetails/>} />
            <Route path="/runList" element={<RunList/>} />
            
            {/* <Route path="/consortia" element={<ConsortiumList />} />
            <Route path="/consortia/create" element={<ConsortiumCreate />} />
            <Route path="/consortia/details/:consortiumId" element={<ConsortiumDetails />} />
            <Route path="/runs" element={<RunsList></RunsList>} />
            <Route path="/runs/details/:runId" element={<RunDetails />} />
            <Route path="/runs/results/:consortiumId/:runId" element={<RunResults />} />
            <Route path="/computations" element={<ComputationsList />} />
            <Route path="/computations/create" element={<ComputationsCreate />} />
            <Route path="/computations/details/:computationId" element={<ComputationDetails />} />
            <Route path="/invites" element={<div>inviteslist</div>} />
            <Route path="/notifications" element={<NotificationList />} />
            <Route path="/appConfig" element={<AppConfig />} />
            <Route path="/adminEditUser" element={<AdminEditUser />} />
            <Route path="/pageLogin" element={<PageLogin />} />
            <Route path="/changePassword" element={<ChangePassword />} />  */}
        </Routes>
    )
}