import { users } from 'js/moduleA';

test('users', () => {
    expect(users.length).toBe(2);
});