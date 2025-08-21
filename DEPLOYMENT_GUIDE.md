# Server Deployment Guide

## Quick Deployment Options

### Option 1: Standard Node.js Server Deployment

1. **Download and transfer your built application:**
   - Download the project files ([Download Project](#project-download))
   - Upload to your server

2. **On your server, install Node.js (v18+) and run:**
   ```bash
   npm ci --only=production
   npm run build
   npm start
   ```

3. **Set environment variables on your server:**
   ```bash
   export DB_HOST=192.168.14.123
   export DB_PORT=1521
   export DB_USERNAME=Test2012
   export DB_PASSWORD=test#1234
   export DB_SID=crypto
   export NODE_ENV=production
   ```

4. **Install Oracle Instant Client on your server:**
   ```bash
   # For Ubuntu/Debian:
   wget https://download.oracle.com/otn_software/linux/instantclient/2340000/instantclient-basic-linux.x64-23.4.0.24.05.zip
   unzip instantclient-basic-linux.x64-23.4.0.24.05.zip
   sudo mv instantclient_23_4 /opt/oracle/
   echo '/opt/oracle/instantclient_23_4' | sudo tee /etc/ld.so.conf.d/oracle.conf
   sudo ldconfig
   ```

### Option 2: Docker Deployment

Create this `Dockerfile` in your project:

```dockerfile
FROM node:18-alpine

# Install Oracle Instant Client
RUN apk add --no-cache libaio libnsl libc6-compat curl unzip
WORKDIR /tmp
RUN curl -o instantclient-basic.zip https://download.oracle.com/otn_software/linux/instantclient/2340000/instantclient-basic-linux.x64-23.4.0.24.05.zip
RUN unzip instantclient-basic.zip
RUN mv instantclient_23_4 /usr/lib/oracle/
RUN echo '/usr/lib/oracle/instantclient_23_4' > /etc/ld.so.conf.d/oracle.conf
RUN ldconfig

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

EXPOSE 8080
CMD ["npm", "start"]
```

Then build and run:
```bash
docker build -t your-app .
docker run -p 8080:8080 \
  -e DB_HOST=192.168.14.123 \
  -e DB_PORT=1521 \
  -e DB_USERNAME=Test2012 \
  -e DB_PASSWORD=test#1234 \
  -e DB_SID=crypto \
  -e NODE_ENV=production \
  your-app
```

### Option 3: PM2 Process Manager (Recommended)

1. **Install PM2 globally:**
   ```bash
   npm install -g pm2
   ```

2. **Create ecosystem file:**
   ```javascript
   // ecosystem.config.js
   module.exports = {
     apps: [{
       name: 'fusion-app',
       script: 'dist/server/node-build.mjs',
       instances: 1,
       env: {
         NODE_ENV: 'production',
         DB_HOST: '192.168.14.123',
         DB_PORT: '1521',
         DB_USERNAME: 'Test2012',
         DB_PASSWORD: 'test#1234',
         DB_SID: 'crypto'
       }
     }]
   };
   ```

3. **Start with PM2:**
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

## Key Benefits of Server Deployment

✅ **Database Access**: Direct connection to your Oracle database at 192.168.14.123  
✅ **Full Control**: Manage your own server environment  
✅ **No Network Issues**: No cloud-to-office connectivity problems  
✅ **Oracle Client**: Install Oracle Instant Client properly  

## Next Steps

1. Choose your deployment method above
2. [Download Project](#project-download) 
3. Transfer files to your server
4. Follow the installation steps
5. Your app will connect directly to Oracle database!

## Default Port

The application runs on port **8080** by default. Access at:
- `http://your-server-ip:8080`

## Troubleshooting

- Ensure Oracle Instant Client is properly installed
- Check firewall allows port 8080
- Verify database connectivity from server
- Check logs with `pm2 logs` (if using PM2)
