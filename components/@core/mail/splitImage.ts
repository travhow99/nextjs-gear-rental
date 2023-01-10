const emailSplitImage = ({
	image1Src = 'https://res.cloudinary.com/dheck1ubc/image/upload/v1544153577/Email/Images/AnnouncementOffset/Image_1.png',
	image2Src = 'https://res.cloudinary.com/dheck1ubc/image/upload/v1544153578/Email/Images/AnnouncementOffset/Image_2.png',
}: {
	image1Src: string;
	image2Src: string;
}) => `<mj-section background-color="#ffffff" padding-left="15px" padding-right="15px" padding-top="0">
<mj-column width="50%">
  <mj-image align="center" src="${image1Src}" alt="" />
</mj-column>
<mj-column width="50%">
  <mj-image align="center" src="${image2Src}" alt="" />
</mj-column>
</mj-section>
`;

export default emailSplitImage;
