import { json } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

function sha256(str) {
    return crypto.createHash('sha256').update(str).digest('hex');
}

// Last brukerdata fra miljøvariabel
const USER_CREDENTIALS = JSON.parse(process.env.USER_CREDENTIALS || '{}');

const ADMIN_USER = {
    usernameHash: process.env.ADMIN_USERNAME_HASH,
    passwordHash: process.env.ADMIN_PASSWORD_HASH,
};

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set');
}

export async function POST({ request, cookies }) {
    try {
        const { username, password } = await request.json();
        const userKeyHash = sha256(username.toLowerCase());
        const hashedPassword = sha256(password);
        
        // Sjekk om det er admin
        if (userKeyHash === ADMIN_USER.usernameHash) {
            if (hashedPassword === ADMIN_USER.passwordHash) {
                const token = jwt.sign(
                    { 
                        userKeyHash,
                        username,
                        isAdmin: true 
                    },
                    JWT_SECRET,
                    { expiresIn: '365d' }
                );
                
                cookies.set('auth_token', token, {
                    path: '/',
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 60 * 60 * 24 * 365
                });
                
                return json({ 
                    success: true, 
                    isAdmin: true,
                    username 
                });
            } else {
                return json({ 
                    success: false, 
                    error: "Feil passord." 
                }, { status: 401 });
            }
        }
        
        // Vanlig bruker
        const user = USER_CREDENTIALS[userKeyHash];
        
        if (!user) {
            return json({ 
                success: false, 
                error: "Ugyldig brukernavn." 
            }, { status: 401 });
        }
        
        if (hashedPassword === user.hash) {
            const token = jwt.sign(
                { 
                    userKeyHash,
                    username,
                    isAdmin: false,
                    sheetUrl: user.sheetUrl,
                    editPlanSheet: user.editPlanSheet
                },
                JWT_SECRET,
                { expiresIn: '365d' }
            );
            
            cookies.set('auth_token', token, {
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 365
            });
            
            return json({ 
                success: true, 
                isAdmin: false,
                sheetUrl: user.sheetUrl,
                editPlanSheet: user.editPlanSheet,
                username
            });
        } else {
            return json({ 
                success: false, 
                error: "Feil passord." 
            }, { status: 401 });
        }
        
    } catch (error) {
        console.error('Login error:', error);
        return json({ 
            success: false, 
            error: "Noe gikk galt." 
        }, { status: 500 });
    }
}
