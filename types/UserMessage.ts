export default interface UserMessage {
	_id: String;
	sentBy: String;
	sentTo: String;
	product?: String;
	rental: String;
	message: String;
	// Stored by default timestamps
	// sentAt?: Date;
	readAt?: Date;
	createdAt: Date;
}
