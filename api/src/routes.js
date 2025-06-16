const path = require('path');
const fs = require('fs');

const routes = [
    {
        method: "GET",
        path: "/file/{size}",
        handler: (request, h) => {
            const { size } = request.params;

            let filePath;
            let fileName;

            switch (size) {
                case '10kb':
                    fileName = '10kb.txt';
                    filePath = path.join(__dirname, '..', 'files', '10kb.txt');
                    break;
                case '100kb':
                    fileName = '100kb.txt';
                    filePath = path.join(__dirname, '..', 'files', '100kb.txt');
                    break;
                case '1mb':
                    fileName = '1mb.txt';
                    filePath = path.join(__dirname, '..', 'files', '1mb.txt');
                    break;
                default:
                    return h.response({
                        status: 'fail',
                        message: 'Ukuran file tidak valid. Gunakan salah satu dari: 10kb, 100kb, 1mb.',
                    }).code(400);
            }

            if (!fs.existsSync(filePath)) {
                return h.response({
                    status: 'fail',
                    message: 'File tidak ditemukan di server.',
                }).code(404);
            }

            return h.file(filePath, {
                mode: 'attachment',
                filename: fileName
            });
        }
    }
];

module.exports = routes;
