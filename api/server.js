import fs from 'fs';
import cors from 'cors';
import express from 'express';

const app = express();

const fakerData = fs.readFileSync('fakerData.json', 'utf8');
const data = JSON.parse(fakerData);

app.use(cors());

app.get('/api/table-data', (req, res) => {
	const start = Number(req.query.start);
	const size = Number(req.query.size);
	const slicedData = data.slice(start, start + size);

	res.json({
		data: slicedData,
		meta: {
			totalRowCount: data.length,
			currentPage: Math.floor(start / size) + 1,
			pageSize: slicedData.length,
		},
	});
});

app.listen(4200, () => {
	console.log('Server is running on port 4200');
});
