import React from 'react';
import { Pagination as PaginationAntd } from 'antd';

import './Pagination.scss';

export default function Pagination(props) {
	const { courses, location, history } = props;

	const currentPage = parseInt(courses ? courses.page : 0);

	const onChange = (newPage) => {
		history.push(`${location.pathname}?page=${newPage}`);
	};

	return (
		<PaginationAntd
			current={currentPage}
			defaultCurrent={currentPage}
			pageSize={courses ? courses.limit : ''}
			total={courses ? courses.total : ''}
			onChange={(newPage) => onChange(newPage)}
			className="pagination"
		/>
	);
}
