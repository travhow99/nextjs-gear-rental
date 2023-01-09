const emailButton = ({
	href = 'https://google.com',
	text = 'Learn more',
}: {
	href: string;
	text: string;
}): string =>
	`<mj-button background-color="#5e6ebf" align="center" color="#ffffff" font-size="17px" font-weight="bold" href="${href}" width="300px">
        ${text}
    </mj-button>
    `;

export default emailButton;
