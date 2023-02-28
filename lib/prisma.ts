import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';
import { camelCase } from 'camel-case';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient(/* {
		log: ['query', 'info', 'warn', 'error'],
	} */);
} else {
	if (!global.prisma) {
		global.prisma = new PrismaClient(/* {
			log: ['query', 'info', 'warn', 'error'],
		} */);
	}
	prisma = global.prisma;
}

/**
 * @todo Verify slug generation
 */
prisma.$use(async (params, next) => {
	if (
		(params.action === 'create' || params.action === 'update') &&
		['SellerProduct'].includes(params.model)
	) {
		let {
			args: { data },
		} = params;
		const method = camelCase(params.model);
		const collection = prisma[method];

		let slug = slugify(`${data.title}`, {
			lower: true,
			strict: true,
			remove: /[*+~.()'"!:@]/g,
		});

		let attempt = 0;

		console.log('generating slug:', slug);

		while ((await collection.count({ where: { slug } })) > 0) {
			if (attempt === 0) {
				slug = `${slug}-${data.brand.toLowerCase()}`;
			} else {
				slug = `${slug}-${attempt}`;
			}

			attempt += 1;

			console.log('duplicate slug:', slug);
		}

		data.slug = slug;
	}
	const result = await next(params);
	return result;
});

export default prisma;
