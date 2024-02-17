/* eslint-disable react/jsx-key */
import { useState } from 'react'; // Import useState hook
import { useSortBy, useTable, usePagination } from 'react-table';
import { data } from './assets/data.json';

const columns = [
	{ Header: 'Id', accessor: 'id' },
	{ Header: 'Gender', accessor: 'gender' },
	{ Header: 'Name', accessor: 'name' },
	{ Header: 'Salary', accessor: 'salary' },
];

const App = () => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		prepareRow,
		nextPage,
		previousPage,
		canPreviousPage,
		canNextPage,
		state: { pageIndex },
		pageCount,
		gotoPage,
	} = useTable({ columns, data, initialState: { pageSize: 9 } }, useSortBy, usePagination);

	const pageButtons = [];
	for (let i = 0; i < pageCount; i++) {
		pageButtons.push(
			<button
				key={i + 1}
				onClick={() => gotoPage(i)}
				style={{
					backgroundColor: pageIndex === i ? 'black' : 'red',
					border: '0px',
					margin: '4px',
					padding: '8px',
					borderRadius: '4px',
					color: 'white',
					cursor: 'pointer',
				}}
			>
				{i + 1}
			</button>
		);
	}

	return (
		<div className='table-container'>
			<table
				{...getTableProps()}
				className='table'
			>
				<thead>
					{headerGroups.map((hg) => (
						<tr {...hg.getHeaderGroupProps()}>
							{hg.headers.map((header) => (
								<th {...header.getHeaderProps(header.getSortByToggleProps())}>
									{header.render('Header')}
									{header.isSorted && <span>{header.isSortedDesc ? ' ⬇️' : ' ⬆️'}</span>}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map((row) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => (
									<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
								))}
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className='pagination'>
				<button
					onClick={previousPage}
					disabled={!canPreviousPage}
				>
					Prev
				</button>
				<span>
					Showing {pageIndex + 1} of {pageCount}
				</span>
				<button
					onClick={nextPage}
					disabled={!canNextPage}
				>
					Next
				</button>
			</div>
			<div style={{ display: 'flex', width: '100%', justifyContent: 'space-evenly' }}>{pageButtons}</div>
		</div>
	);
};

export default App;
