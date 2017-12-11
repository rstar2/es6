import { users } from '../src/js/moduleA';

test('users', () => {
    expect(users.length).toBe(2);
});