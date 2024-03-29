import nodemailer from 'nodemailer';
import mjml2html from 'mjml';
import emailHeader from '../components/@core/mail/header';
import emailUnsubscribe from '../components/@core/mail/unsubscribe';
import emailSocial from '../components/@core/mail/social';
import emailMap from '../components/@core/mail/map';
import emailOperations from '../components/@core/mail/operations';
import generalText from '../components/@core/mail/generalText';
import emailDivider from '../components/@core/mail/divider';
import emailSplitImage from '../components/@core/mail/splitImage';
import emailButton from '../components/@core/mail/button';
import emailHead from '../components/@core/mail/head';

interface emailProps {
	body: string;
	sender: string;
	recipient: string;
	header: string;
}

export default async function sendEmail({
	body,
	sender,
	recipient,
	header,
}: emailProps) {
	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing
	let testAccount = await nodemailer.createTestAccount();

	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: testAccount.user, // generated ethereal user
			pass: testAccount.pass, // generated ethereal password
		},
	});

	// console.log(htmlOutput.html);
	// return;
	const htmlOutput = mjml2html(`
<mjml>
  ${emailHead}
  
  <mj-body background-color="#E7E7E7" width="600px">

    ${emailHeader}

    <mj-wrapper padding-top="0" padding-bottom="0" css-class="body-section">
      <mj-section background-color="#ffffff" padding-left="15px" padding-right="15px">
        <mj-column width="100%">
          <mj-text color="#212b35" font-weight="bold" font-size="20px">
            ${header}
          </mj-text>
          <mj-text color="#637381" font-size="16px">
            Hi ${recipient},
          </mj-text>
        </mj-column>
      </mj-section>
          ${body}
          ${
				/* generalText({
				bodyHtml: `<mj-text color="#637381" font-size="16px">
            Tempora culpa porro labore. Repudiandae accusamus obcaecati voluptatibus accusantium perspiciatis:
          </mj-text>`,
			}) */ null
			}

          ${
				/* generalText({
				bodyHtml: `<ul>
              <li style="padding-bottom: 20px"><strong>Lorem ipsum dolor:</strong> Sit amet consectetur adipisicing elit.</li>
              <li style="padding-bottom: 20px"><strong>Quia a assumenda nulla:</strong> Repudiandae accusamus obcaecati voluptatibus accusantium perspiciatis.</li>
              <li><strong>Tempora culpa porro labore:</strong> In quisquam optio quibusdam fugiat perspiciatis nobis.</li>
            </ul>`,
			}) */ null
			}
          ${
				/* generalText({
				bodyHtml: `Lorem ipsum dolor <a class="text-link" href="https://google.com">sit amet consectetur</a> adipisicing elit. Earum eaque sunt nulla in, id eveniet quae unde ad ipsam ut, harum autem porro reiciendis minus libero illo. Vero, fugiat reprehenderit.`,
			}) */ null
			}
          
          ${
				/* generalText({
				bodyHtml: `Lorem ipsum dolor <a class="text-link" href="https://google.com">sit amet consectetur</a> adipisicing elit. Earum eaque sunt nulla in, id eveniet quae unde ad ipsam ut, harum autem porro reiciendis minus libero illo. Vero, fugiat reprehenderit.`,
			}) */ null
			}
                             
      ${
			/* generalText({
			bodyHtml: `Lorem ipsum dolor sit amet consectetur adipisicing elit.`,
		}) */ null
		}

    // @todo images
      ${emailSplitImage({
			image1Src:
				'https://res.cloudinary.com/dheck1ubc/image/upload/v1544153577/Email/Images/AnnouncementOffset/Image_1.png',
			image2Src:
				'https://res.cloudinary.com/dheck1ubc/image/upload/v1544153578/Email/Images/AnnouncementOffset/Image_2.png',
		})}
      ${emailDivider}

  ${generalText({
		headerText: 'adventurebuddy',
		bodyHtml: 'Sustainability from your friends',
  })}
      
      ${emailOperations}
      ${emailMap}
    </mj-wrapper>

    ${emailSocial}
    ${emailUnsubscribe}

  </mj-body>
</mjml>`);

	// send mail with defined transport object
	const info = await transporter.sendMail({
		from: '"Fred Foo 👻" <foo@example.com>', // sender address
		to: 'bar@example.com, baz@example.com', // list of receivers
		subject: `adventurebuddy • New Message from ${sender}`, // Subject line
		text: `${body}`, // plain text body
		html: htmlOutput.html, // html body
	});

	console.log('Message sent: %s', info.messageId);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// Preview only available when sending through an Ethereal account
	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}
