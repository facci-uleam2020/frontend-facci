import React from 'react';
import { Pagination as PaginationAntd } from 'antd';

export default function Pagination(props) {
	const { viewUserActives, history, location, usersActive, usersInactive } = props;

	// console.log(usersActive.limit)
	let currentPage = parseInt(usersActive?.page);
	//   currentPage = 1;

	let currentPage2 = parseInt(usersInactive?.page);
	//  currentPage2 = 1;
	const total = usersActive?.pages;
	const total2 = usersInactive?.pages;
	let limit = usersActive?.limit;
	limit = 1;
	let limit2 = usersInactive?.limit;
	limit = 1;

	const onChange = (newPage) => {
		history.push(`${location?.pathname}?page=${newPage}`);
	};

	return (
		<div>
			<PaginationAntd
				current={viewUserActives ? currentPage : currentPage2}
				total={viewUserActives ? total : total2}
				pageSize={viewUserActives ? limit : limit2}
				onChange={(newPage) => onChange(newPage)}
				className="pagination"
			/>
		</div>
	);
}
