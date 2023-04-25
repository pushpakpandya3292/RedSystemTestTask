import { Routes, Route } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';

import IndexLayout from 'layouts/IndexLayout';
import MainLayout from 'layouts/MainLayout';
import CalendarList from 'pages/calendar/List';
import CalendarView from 'pages/calendar/View';
import CalendarAdd from 'pages/calendar/Add';
import CalendarEdit from 'pages/calendar/Edit';
import HomePage from './pages/home/HomePage';
import IndexPages from './pages/index';
import ErrorPages from './pages/errors';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'assets/styles/layout.scss';
const App = () => {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route path="/" element={<HomePage />} />
				<Route path="/home" element={<HomePage />} />
				

				{/* calendar pages routes */}
				<Route path="/calendar" element={<CalendarList />} />
				<Route path="/calendar/:fieldName/:fieldValue" element={<CalendarList />} />
				<Route path="/calendar/index/:fieldName/:fieldValue" element={<CalendarList />} />
				<Route path="/calendar/view/:pageid" element={<CalendarView />} />
				<Route path="/calendar/add" element={<CalendarAdd />} />
				<Route path="/calendar/edit/:pageid" element={<CalendarEdit />} />
			</Route>
			<Route exact element={<IndexLayout />}>
				<Route path="/*" element={<IndexPages />} />
				<Route path="/error/*" element={<ErrorPages />} />
			</Route>
		</Routes>
	);
}
export default App;
