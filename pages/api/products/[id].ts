/* import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();

  console.log(req.query.id);

  const product = await Product.findById(req.query.id);
  console.log(product);
  await db.disconnect();

  res.send(product);
});

export default handler;
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	// Connect the client
	await prisma.$connect();
	// ... you will write your Prisma Client queries here

	const allUsers = await prisma.user.findMany();
	console.log(allUsers);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
