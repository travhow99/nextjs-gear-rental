export default interface UserMessage {
	_id: string;
	sentBy: string;
	sentTo: string;
	product?: string;
	rental: string;
	message: string;
	// Stored by default timestamps
	// sentAt?: Date;
	readAt?: string;
	createdAt: string;
}
