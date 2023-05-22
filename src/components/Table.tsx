import { Text } from '@mantine/core';
import { useInfiniteQuery } from '@tanstack/react-query';
import { UIEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import { MantineReactTable, MRT_Virtualizer } from 'mantine-react-table';

import { ApiResponse } from 'types';
import { columns } from 'constants';
import { fetchTableData } from 'utils';
import { useTopToolbarCustomActions } from 'hooks/useTopToolbarCustomActions';

const rowVirtualizerProps = { overscan: 25 };
const bottomToolbarProps = { style: { display: 'flex', alignItems: 'center' } };

export const Table = () => {
	const tableContainerRef = useRef<HTMLDivElement>(null);
	const rowVirtualizerInstanceRef = useRef<MRT_Virtualizer<HTMLDivElement, HTMLTableRowElement>>(null);
	// prettier-ignore
	const { sorting, columnOrder, setSorting, setColumnOrder, renderTopToolbarCustomActions } = useTopToolbarCustomActions();

	const { data, fetchNextPage, isError, isFetching, isLoading } = useInfiniteQuery<ApiResponse>({
		queryKey: ['table-data'],
		queryFn: fetchTableData,
		getNextPageParam: (_lastPage, allPages) => allPages.length,
		keepPreviousData: true,
		refetchOnWindowFocus: false,
	});

	const flatData = useMemo(() => data?.pages.flatMap(page => page.data) ?? [], [data]);
	const totalFetched = flatData.length;
	const totalRowCount = data?.pages.at(0)?.meta.totalRowCount ?? 0;

	const fetchMoreOnBottomReached = useCallback(
		(containerRefElement: HTMLDivElement | null) => {
			if (containerRefElement) {
				const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
				// NOTE: Once the user has scrolled within 400px of the bottom of the table, fetch more data if we can.
				if (scrollHeight - scrollTop - clientHeight < 400 && !isFetching && totalFetched < totalRowCount) {
					fetchNextPage();
				}
			}
		},
		[fetchNextPage, isFetching, totalFetched, totalRowCount]
	);

	const toolbarAlertBannerProps = useMemo(
		() => (isError ? { color: 'red', children: 'Error loading data' } : undefined),
		[isError]
	);

	const tableContainerProps = useMemo(
		() => ({
			ref: tableContainerRef,
			style: { maxHeight: '600px' },
			onScroll: (event: UIEvent<HTMLDivElement>) => fetchMoreOnBottomReached(event.target as HTMLDivElement),
		}),
		[fetchMoreOnBottomReached]
	);

	const renderBottomToolbarCustomActions = useCallback(
		() => (
			<Text>
				Fetched {totalFetched} of {totalRowCount} total rows.
			</Text>
		),
		[totalRowCount, totalFetched]
	);

	// NOTE: This is for scrolling to top of table when sorting changes.
	useEffect(() => {
		if (rowVirtualizerInstanceRef.current) {
			rowVirtualizerInstanceRef.current.scrollToIndex(0);
		}
	}, [sorting]);

	return (
		<MantineReactTable
			data={flatData}
			columns={columns}
			enableColumnOrdering
			enablePagination={false}
			enableRowVirtualization
			mantineBottomToolbarProps={bottomToolbarProps}
			mantineTableContainerProps={tableContainerProps}
			mantineToolbarAlertBannerProps={toolbarAlertBannerProps}
			onColumnOrderChange={setColumnOrder}
			onSortingChange={setSorting}
			renderTopToolbarCustomActions={renderTopToolbarCustomActions}
			renderBottomToolbarCustomActions={renderBottomToolbarCustomActions}
			rowVirtualizerInstanceRef={rowVirtualizerInstanceRef}
			rowVirtualizerProps={rowVirtualizerProps}
			state={{
				isLoading,
				showAlertBanner: isError,
				showProgressBars: isFetching,
				sorting,
				columnOrder,
			}}
		/>
	);
};
