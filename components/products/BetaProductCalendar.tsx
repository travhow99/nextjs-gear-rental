import { addDays } from 'date-fns';
import { useState } from 'react';
import { DateRange, Range } from 'react-date-range';

export default function BetaProductCalendaer({
	range,
	setRange,
}: {
	range: Range;
	setRange: any;
}) {
	return (
		<DateRange
			editableDateInputs={true}
			onChange={(item) => {
				const selection = item.selection;
				console.log(selection);
				setRange(selection);
			}}
			moveRangeOnFirstSelection={false}
			ranges={[range]}
			endDatePlaceholder={'Return'}
			showMonthAndYearPickers={true}
			minDate={new Date()}
		/>
	);
}
