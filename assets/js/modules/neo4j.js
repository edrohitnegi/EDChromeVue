// Not in used
const neo4j = require('neo4j-driver');

async function neo4jQuery(query) {
	// Connect neo4j driver
	const driver = neo4j.driver(
		"bolt://localhost:7687",
		neo4j.auth.basic('neo4j', 'test'),
	);
	const session = driver.session();
	try {
		await session.writeTransaction(tx =>
			tx.run(query),
		);
		console.log('Query Ran Successfully');
		// const singleRecord = result.records[0]
	}
	finally {
		await session.close();
	}
	// on application exit:
	await driver.close();
};

module.exports = {
    neo4jQuery
}