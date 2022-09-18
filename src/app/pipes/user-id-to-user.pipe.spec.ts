import { UserIdToUserPipe } from './user-id-to-user.pipe';

describe('UserIdToUserPipe', () => {
  it('create an instance', () => {
    const pipe = new UserIdToUserPipe();
    expect(pipe).toBeTruthy();
  });
});
