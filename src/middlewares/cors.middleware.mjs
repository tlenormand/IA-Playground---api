// export default {
//     allowedOrigins: [
//         'http://localhost:19006',
//         'http://localhost:19001',
//     ],
//     corsMiddleware: (req, res, next) => {
//         res.header('Access-Control-Allow-Origin', allowedOrigins.join(','));
//         res.header('Access-Control-Allow-Credentials', true);
//         res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//         // res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

//         // intercept OPTIONS method
//         if ('OPTIONS' == req.method) {
//             res.send(200);
//         } else {
//             return next();
//         }
//     }
// };

// export default function(req, res, next) {
//     allowedOrigins = [
//         'http://localhost:19006',
//         'http://localhost:19001',
//     ];

//     res.header('Access-Control-Allow-Origin', allowedOrigins.join(','));
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     // res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

//     // intercept OPTIONS method
//     if ('OPTIONS' == req.method) {
//         res.send(200);
//     } else {
//         next();
//     }
// }
