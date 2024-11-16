import { Hono } from 'hono';
import { removeToken } from '../service/logout-service.ts';

const logoutController = new Hono();

// Logout route to remove JWT token
logoutController.post('/logout', async (c) => {
    const userId = (c.req.query('userId')); // Get userId from query params
    if (!userId) {
        return c.json({ error: 'Invalid user ID' }, 400);
    }

    const success = await removeToken(userId);

    if (success) {
        return c.json({ message: 'Logout successful' });
    } else {
        return c.json({ error: 'Failed to log out' }, 500);
    }
});

export default logoutController;