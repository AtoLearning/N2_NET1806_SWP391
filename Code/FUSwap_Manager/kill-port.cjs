const { exec } = require('child_process');

const PORT = 3000;

const command = process.platform === 'win32'
    ? `netstat -ano | findstr :${PORT}`
    : `lsof -i :${PORT}`;

exec(command, (err, stdout) => {
    if (err) {
        console.error(`Error executing command: ${err.message}`);
        return;
    }

    if (!stdout) {
        console.log(`Port ${PORT} is not in use`);
        return;
    }

    const lines = stdout.trim().split('\n');
    const pid = process.platform === 'win32'
        ? lines[0].match(/(\d+)\s*$/)[0]
        : lines[1].split(/\s+/)[1];

    if (pid) {
        const killCommand = process.platform === 'win32'
            ? `taskkill /PID ${pid} /F`
            : `kill -9 ${pid}`;

        exec(killCommand, (killErr) => {
            if (killErr) {
                console.error(`Error killing process: ${killErr.message}`);
                return;
            }
            console.log(`Process ${pid} using port ${PORT} has been killed`);
        });
    }
});
