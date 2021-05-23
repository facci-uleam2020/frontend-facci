// Layout
import LayoutAdmin from '../layouts/LayoutAdmin';
import LayoutBasic from '../layouts/LayoutBasic';

// Admin Pages
import AdminHome from '../pages/Admin';
import AdminSignIn from '../pages/Admin/SignIn';
import AdminUsersDocente from '../pages/Admin/UsersDocentes';
import UserAdmin from '../pages/Admin/UsersAdmin';

// pages
import Home from '../pages/Home';
import MyCourses from '../pages/MyCourses';
import LoginWeb from '../pages/Web/SignSignOut';
import FacciAbout from '../pages/FacciAbout'

// PANEL
import Panel from '../pages/PanelCursos/Principal';
import Cursos from '../pages/PanelCursos/Cursos';
import Students from '../pages/PanelCursos/Students';
import StudentsView from '../components/WebPanel/ListStudentsView';
import Exam from '../pages/PanelCursos/CreateExam';
import Answer from '../pages/PanelCursos/CreateAnswers';

// Other
import Error404 from '../pages/Error404';
import LayoutPanel from '../layouts/LayoutPanel';
import LayoutUserPerfil from '../layouts/LayouUserProfile';
import profile from '../pages/UserProfile';
import Seccion from '../pages/PanelCursos/Seccion';
import Courses from '../pages/Courses';
import ViewCurso from '../pages/Web/ViewCurso';
import Purchase from '../pages/Web/Purchase';
import ActivateUser from '../pages/ActivateUser';
import ResetPassword from '../pages/ResetPassword';
import MycourseView from '../components/Web/Courses/MyCourseView';

const routes = [
	{
		path: '/admin',
		component: LayoutAdmin,
		exact: false,
		routes: [
			{
				path: '/admin',
				component: AdminHome,
				exact: true,
			},
			{
				path: '/admin/login',
				component: AdminSignIn,
				exact: true,
			},
			{
				path: '/admin/usersDocentes',
				component: AdminUsersDocente,
				exact: true,
			},
			{
				path: '/admin/usersAdmin',
				component: UserAdmin,
				exact: true,
			},
			{
				component: Error404,
			},
		],
	},
	{
		path: '/profile/:id',
		component: LayoutUserPerfil,
		exact: false,
		routes: [{ path: '/profile/:id', component: profile, exact: true }],
	},
	{
		path: '/panel/:id',
		component: LayoutPanel,
		exact: false,
		routes: [
			{
				path: '/panel/:id',
				component: Panel,
				exact: true,
			},
			{
				path: '/panel/:id/cursos',
				component: Cursos,
				exact: true,
			},
			{
				path: '/panel/:id/cursos/seccion',
				component: Seccion,
				exact: true,
			},
			{
				path: '/panel/:id/cursos/exam/:idCurso',
				component: Exam,
				exact: true,
			},
			{
				path: '/panel/:id/cursos/exam/:idCurso/answers/:idQuestion',
				component: Answer,
				exact: true,
			},
			{
				path: '/panel/:id/students',
				component: Students,
				exact: true,
			},
			{
				path: '/panel/:id/students/view/:idCourse',
				component: StudentsView,
				exact: true,
			},

			{
				component: Error404,
			},
		],
	},
	{
		path: '/',
		component: LayoutBasic,
		exact: false,
		routes: [
			{
				path: '/',
				component: Home,
				exact: true,
			},
			{
				path: '/courses-acquired',
				component: MyCourses,
				exact: true,
			},
			{
				path: '/courses-acquired/courses/:id',
				component: MycourseView,
				exact: true,
			},

			{
				path: '/courses',
				component: Courses,
				exact: true,
			},
			{
				path: '/courses/:id',
				component: ViewCurso,
				exact: true,
			},
			{
				path: '/courses/:id/purchase',
				component: Purchase,
				exact: true,
			},
			{
				path: '/active/:token',
				component: ActivateUser,
				exact: true,
			},
			{
				path: '/reset-password/:token',
				component: ResetPassword,
				exact: true,
			},
			{
				path: '/login',
				component: LoginWeb,
				exact: true,
			},
			{
				path: '/quienes-somos',
				component: FacciAbout,
				exact: true,
			},

			{
				component: Error404,
			},
		],
	},
];

export default routes;
