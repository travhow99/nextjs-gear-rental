import emailButton from '../components/@core/mail/button';
import generalText from '../components/@core/mail/generalText';
import sendEmail from './mailer';

const mailHelper = {
	/**
	 * Notify a user of a newly sent UserMessage via email
	 */
	newUserMessage: async ({ sender, message, user, saleId }) => {
		const headerText = `New Message from ${sender}`;

		/**
		 * @todo message seems to be bold
		 */
		let messageHtml = generalText({
			headerText: headerText,
			bodyHtml: message,
		});

		messageHtml += `<mj-section background-color="#ffffff" padding-left="15px" padding-right="15px">
        <mj-column width="100%">
`;
		/**
		 * @todo url for renter user
		 */
		messageHtml += emailButton({
			text: 'Reply here',
			href: `${process.env.PROTOCOL}://${process.env.DOMAIN}/seller/sales/${saleId}`,
		});

		messageHtml += `</mj-column>
        </mj-section>
  `;

		console.log('sendhtml', messageHtml);
		await sendEmail({
			body: messageHtml,
			sender,
			recipient: user,
			header: headerText,
		});
	},
};

export default mailHelper;
