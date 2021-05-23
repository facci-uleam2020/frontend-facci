import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Row, Col } from 'antd';

import './LayoutBasic.scss';
import MenuTop from '../components/Web/MenuTop/MenuTop';
import Footer from '../components/Web/Footer/Footer';
import useAuth from '../hooks/useAuth';

export default function LayoutBasic(props) {
	const { routes } = props;

	const { user, isLoading } = useAuth();

	if (!user && !isLoading) {
		return (
			<>
				<Row>
					<Col lg={4} />
					<Col lg={16}>
						<MenuTop user={user} />
					</Col>
					<Col lg={4} />
				</Row>

				{/* <Route path="/" component={WebLogin} />
          <Redirect to="/" /> */}
				<LoadRoutes routes={routes} />

				<Footer />
			</>
		);
	}
	if (user && !isLoading) {
		return (
			<>
				<Row>
					<Col lg={4} />
					<Col lg={16}>
						<MenuTop usera={user && !isLoading ? user : null} />
					</Col>
					<Col lg={4} />
				</Row>
				<br />
				<br />
				<br />
				
				<LoadRoutes routes={routes} />

				<Footer />
			</>
		);
	}
	return null;

	//   <Layout>
	//     <h2>Menu Basic</h2>
	//     <Layout>
	//       <Content>
	//         <LoadRoutes routes={routes} />
	//       </Content>
	//       <Footer>Facci-Uleam 2020</Footer>
	//     </Layout>
	//   </Layout>
	// );
}

function LoadRoutes(props) {
	const { routes } = props;

	return (
		<Switch>
			{routes.map((route, index) => (
				<Route key={index} path={route.path} exact={route.exact} component={route.component} />
			))}
			;
			{/* {user.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))} */}
			;
		</Switch>
	);
}
