const generalText = ({
	headerText,
	bodyHtml,
}: {
	headerText?: string;
	bodyHtml: string;
}) => {
	return `<mj-section background-color="#ffffff" padding="0 15px 0 15px">
        <mj-column width="100%">
          ${
				headerText
					? `<mj-text color="#212b35" font-weight="bold" font-size="20px" padding-bottom="0"
            ${headerText}
          </mj-text>`
					: null
			}
          <mj-text color="#637381" font-size="16px">
            ${bodyHtml}
          </mj-text>
        </mj-column>
      </mj-section>`;
};

export default generalText;
