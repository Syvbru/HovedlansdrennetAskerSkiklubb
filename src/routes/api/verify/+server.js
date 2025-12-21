import { json } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-local-dev';

export async function GET({ cookies }) {
    const token = cookies.get('auth_token');
    
    if (!token) {
        return json({ 
            authenticated: false 
        });
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        
        return json({ 
            authenticated: true,
            isAdmin: decoded.isAdmin,
            sheetUrl: decoded.sheetUrl,
            username: decoded.username,
            userKeyHash: decoded.userKeyHash
        });
    } catch (error) {
        // Token er ugyldig eller utløpt
        cookies.delete('auth_token', { path: '/' });
        return json({ 
            authenticated: false 
        });
    }
}