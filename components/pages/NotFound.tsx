import { ReactNode } from 'react';
import Layout from '../layout/Layout';
export default function NotFound(props: {
	title: string;
	children: ReactNode;
}) {
	return <Layout title={props.title}>{props.children}</Layout>;
}
