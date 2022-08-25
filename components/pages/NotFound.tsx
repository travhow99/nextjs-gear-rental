import { ReactChildren } from 'react';
import Layout from '../layout/Layout';
export default function NotFound(props: {
	title: string;
	children: ReactChildren;
}) {
	return <Layout title={props.title}>{props.children}</Layout>;
}
