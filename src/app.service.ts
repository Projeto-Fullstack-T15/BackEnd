import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	public verifyAPI(): string {
		return 'API is running!';
	}
}
