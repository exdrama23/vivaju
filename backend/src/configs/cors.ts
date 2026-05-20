// * CORS
import { CorsOptions } from 'cors';

const allowedOrigins = [
    'http://localhost:5173',   
    'https://vivaju.vercel.app',          
    'https://vivaju-frontend.vercel.app', 
    'https://vivaju-fy7no6ah4-alecs-projects-1285b31e.vercel.app',
    
    ...(process.env.ADDITIONAL_ORIGINS ? process.env.ADDITIONAL_ORIGINS.split(',') : [])
];

const corsConfig: CorsOptions = {
    origin: function(origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Não permitido pelo CORS.'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
    ],
    exposedHeaders: ['Content-Disposition'],
    credentials: true,
    optionsSuccessStatus: 200,
    maxAge: 24*60*60
};

export default corsConfig;