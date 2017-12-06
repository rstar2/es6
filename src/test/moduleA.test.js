import { users } from '../js/moduleA';

it('users', () => {
    expect(users.length).toBe(2);
});