# AWS-Only Deployment Guide - SparkPath

Complete guide to deploy SparkPath directly to AWS without local testing.

---

## 🎯 What You'll Create

- **EC2 Instance**: Running backend + serving frontend
- **DynamoDB**: 9 tables for data storage
- **AWS Bedrock**: AI/LLM for chatbot
- **Public URL**: Access your app from anywhere

**Estimated Time**: 45-60 minutes
**Cost**: Free tier eligible (~$0-5/month)

---

## 📋 Prerequisites

Before starting, you need:
- AWS Account (with credit card)
- AWS Access Key ID and Secret Access Key
- Terminal/Command line access on your Mac
- Your project files at `/Users/tejas/Documents/Hackathon`

---

## PART 1: Enable AWS Bedrock (5 minutes)

**This must be done first!**

1. Go to [AWS Console](https://console.aws.amazon.com)
2. Login to your account
3. In the search bar, type **"Bedrock"** and click it
4. Click **"Model access"** in the left sidebar
5. Click **"Enable specific models"** (orange button)
6. Find **"Anthropic"** section
7. Check the box for **"Claude 3 Sonnet"**
8. Click **"Request model access"** at bottom
9. Wait 30 seconds (usually instant approval)
10. Refresh page - Status should show "Access granted" ✅

---

## PART 2: Launch EC2 Instance (10 minutes)

### Step 1: Create EC2 Instance

1. AWS Console → Search "EC2" → Click **EC2**
2. Click **"Launch Instance"** (orange button)

### Step 2: Configure Instance

**Name:** `SparkPath-Server`

**Application and OS Images:**
- Click **"Amazon Linux"**
- Select **"Amazon Linux 2023 AMI"** (should be default)
- Architecture: **64-bit (x86)**

**Instance type:**
- Select **"t2.micro"** (Free tier eligible)

**Key pair:**
- Click **"Create new key pair"**
- Name: `sparkpath-key`
- Type: **RSA**
- Format: **.pem**
- Click **"Create key pair"** → Downloads `sparkpath-key.pem`
- **IMPORTANT**: Move this file to a safe location
  ```bash
  mv ~/Downloads/sparkpath-key.pem ~/.ssh/
  chmod 400 ~/.ssh/sparkpath-key.pem
  ```

**Network settings:**
- Click **"Edit"**
- Auto-assign public IP: **Enable**
- Firewall (security groups): **Create security group**
- Security group name: `sparkpath-sg`
- Add these rules:
  - ✅ SSH (port 22) - Source: My IP
  - Click **"Add security group rule"**
  - Type: **HTTP**, Port: **80**, Source: **Anywhere (0.0.0.0/0)**
  - Click **"Add security group rule"**
  - Type: **HTTPS**, Port: **443**, Source: **Anywhere (0.0.0.0/0)**
  - Click **"Add security group rule"**
  - Type: **Custom TCP**, Port: **5000**, Source: **Anywhere (0.0.0.0/0)**

**Configure storage:**
- Size: **20 GiB** (increase from default 8)
- Volume type: **gp3**

### Step 3: Launch

1. Click **"Launch instance"** (orange button, bottom right)
2. Wait for "Success" message
3. Click **"View all instances"**
4. Wait until **Instance state** shows "Running" (1-2 minutes)
5. **Copy the Public IPv4 address** (something like `3.123.45.67`)
   - Write this down! You'll need it.

---

## PART 3: Connect to EC2 and Install Software (15 minutes)

### Step 1: SSH into EC2

```bash
# Replace YOUR-EC2-IP with the IP you copied
ssh -i ~/.ssh/sparkpath-key.pem ec2-user@YOUR-EC2-IP

# Type "yes" when asked about authenticity
```

You should see Amazon Linux welcome message. You're now inside your EC2 instance!

### Step 2: Install Node.js

```bash
# Update system
sudo yum update -y

# Install Node.js 18
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Verify installation
node --version  # Should show v18.x.x
npm --version   # Should show 9.x.x
```

### Step 3: Install Other Tools

```bash
# Install Git
sudo yum install -y git

# Install PM2 (process manager)
sudo npm install -g pm2

# Install Nginx (web server)
sudo yum install -y nginx

# Verify
pm2 --version
nginx -v
```

---

## PART 4: Upload Your Code to EC2 (10 minutes)

### Option A: Upload via SCP (From your Mac)

**Open a NEW terminal on your Mac** (don't close the EC2 SSH session):

```bash
# Navigate to your project
cd /Users/tejas/Documents/Hackathon

# Upload backend
scp -i ~/.ssh/sparkpath-key.pem -r backend ec2-user@YOUR-EC2-IP:~/

# Upload frontend
scp -i ~/.ssh/sparkpath-key.pem -r frontend ec2-user@YOUR-EC2-IP:~/

# This may take 2-5 minutes depending on your internet speed
```

**Go back to your EC2 SSH terminal** and verify:
```bash
ls -la ~/
# You should see 'backend' and 'frontend' directories
```

### Option B: Use Git (If you have a GitHub repo)

**In your EC2 SSH terminal:**

```bash
# Clone your repository
git clone YOUR-GITHUB-REPO-URL
cd YOUR-REPO-NAME

# Or if you don't have a repo yet, use Option A above
```

---

## PART 5: Configure Backend (10 minutes)

### Step 1: Install Backend Dependencies

```bash
cd ~/backend
npm install

# This will take 2-3 minutes
```

### Step 2: Get AWS Credentials

**On your Mac** (new terminal):

```bash
# Check if you have AWS CLI installed
aws --version

# If not installed, install it:
# For Mac:
brew install awscli

# Configure AWS (if not already done)
aws configure
# Enter your:
# - AWS Access Key ID
# - AWS Secret Access Key
# - Default region: us-east-1
# - Default output format: json
```

**Verify DynamoDB access:**
```bash
aws dynamodb list-tables --region us-east-1
```

### Step 3: Create .env File

**Back in EC2 SSH terminal:**

```bash
cd ~/backend
nano .env
```

**Type/paste this** (replace YOUR_AWS_KEY and YOUR_AWS_SECRET):

```env
PORT=5000
JWT_SECRET=sparkpath_production_secret_key_change_this_to_something_random
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY_HERE
AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_KEY_HERE
BEDROCK_MODEL_ID=anthropic.claude-3-sonnet-20240229-v1:0
NODE_ENV=production
FRONTEND_URL=http://YOUR-EC2-IP
```

**Save and exit:**
- Press `Ctrl + O` (save)
- Press `Enter` (confirm)
- Press `Ctrl + X` (exit)

### Step 4: Create DynamoDB Tables

```bash
cd ~/backend
node scripts/createTables.js
```

Wait for all 9 tables to be created. You'll see:
```
✅ Table SparkPath-Users created successfully!
✅ Table SparkPath-Assessments created successfully!
... (7 more)
```

**If you get an error**, verify:
- AWS credentials are correct in .env
- Bedrock is enabled (Part 1)

### Step 5: Seed Sample Data

```bash
node scripts/seedData.js
```

You'll see:
```
✓ Added story: Marcus Williams
✓ Added story: Sofia Rodriguez
... (3 more stories)
✓ Added mentor: Sarah Thompson
... (3 mentors)
✓ Added course: Music Production Fundamentals
... (3 courses)
```

### Step 6: Start Backend with PM2

```bash
cd ~/backend
pm2 start server.js --name sparkpath-api

# Make it auto-start on reboot
pm2 startup
# Copy and run the command it outputs (starts with 'sudo')

pm2 save

# Check status
pm2 status
```

You should see:
```
┌─────┬────────────────┬─────────┬─────────┬──────────┐
│ id  │ name           │ status  │ restart │ uptime   │
├─────┼────────────────┼─────────┼─────────┼──────────┤
│ 0   │ sparkpath-api  │ online  │ 0       │ 0s       │
└─────┴────────────────┴─────────┴─────────┴──────────┘
```

**Check logs:**
```bash
pm2 logs sparkpath-api --lines 20
```

You should see:
```
🚀 SparkPath server running on port 5000
📡 Socket.io server ready
```

**If there are errors:**
- Check AWS credentials in .env
- Verify Bedrock is enabled
- Check DynamoDB tables exist: `aws dynamodb list-tables`

---

## PART 6: Build and Deploy Frontend (10 minutes)

### Step 1: Install Frontend Dependencies

```bash
cd ~/frontend
npm install

# This will take 3-5 minutes (lots of UI components)
```

### Step 2: Create Production Environment File

```bash
cd ~/frontend
nano .env
```

**Type/paste** (replace YOUR-EC2-IP):

```env
VITE_API_URL=http://YOUR-EC2-IP:5000/api
VITE_SOCKET_URL=http://YOUR-EC2-IP:5000
```

**Save and exit:** `Ctrl + O`, `Enter`, `Ctrl + X`

### Step 3: Build Frontend

```bash
npm run build
```

This creates an optimized `dist/` folder. Takes 1-2 minutes.

### Step 4: Configure Nginx

```bash
sudo nano /etc/nginx/conf.d/sparkpath.conf
```

**Paste this entire configuration** (replace YOUR-EC2-IP):

```nginx
server {
    listen 80;
    server_name YOUR-EC2-IP;

    # Frontend - Serve static files
    location / {
        root /home/ec2-user/frontend/dist;
        try_files $uri $uri/ /index.html;
        index index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }

    # Socket.io WebSocket
    location /socket.io {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Save and exit:** `Ctrl + O`, `Enter`, `Ctrl + X`

### Step 5: Start Nginx

```bash
# Test configuration
sudo nginx -t

# Should say: "syntax is ok" and "test is successful"

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Check status
sudo systemctl status nginx
```

You should see "active (running)" in green.

---

## PART 7: Access Your Application (2 minutes)

### Open in Browser

1. Open your browser
2. Go to: `http://YOUR-EC2-IP`
3. You should see the SparkPath login page! 🎉

### Test the Application

1. Click **"Sign up"**
2. Create an account:
   - Email: `test@sparkpath.com`
   - Password: `Test123!`
   - Fill in name and demographics
3. Click **"Sign Up"**
4. You'll be redirected to the AI assessment chatbot
5. Answer the career questions
6. Select subcategories
7. Explore the dashboard!

---

## 🔧 Managing Your Application

### Check Backend Status

```bash
# SSH into EC2
ssh -i ~/.ssh/sparkpath-key.pem ec2-user@YOUR-EC2-IP

# Check PM2 status
pm2 status

# View logs
pm2 logs sparkpath-api

# Restart backend
pm2 restart sparkpath-api

# Stop backend
pm2 stop sparkpath-api
```

### Update Code After Changes

**From your Mac:**

```bash
# Upload updated backend
scp -i ~/.ssh/sparkpath-key.pem -r backend ec2-user@YOUR-EC2-IP:~/

# Upload updated frontend
scp -i ~/.ssh/sparkpath-key.pem -r frontend ec2-user@YOUR-EC2-IP:~/
```

**Then on EC2:**

```bash
# Rebuild frontend
cd ~/frontend
npm run build

# Restart backend
pm2 restart sparkpath-api

# Restart nginx (if needed)
sudo systemctl restart nginx
```

### Check Nginx Status

```bash
sudo systemctl status nginx
sudo nginx -t  # Test configuration
```

### View Application Logs

```bash
# Backend logs
pm2 logs sparkpath-api

# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Nginx error logs
sudo tail -f /var/log/nginx/error.log
```

---

## 🔍 Troubleshooting

### Problem: "Connection refused" when accessing http://YOUR-EC2-IP

**Check:**
1. EC2 instance is running (AWS Console → EC2)
2. Security group allows port 80:
   - EC2 → Security Groups → sparkpath-sg
   - Inbound rules should have HTTP (port 80) from 0.0.0.0/0
3. Nginx is running: `sudo systemctl status nginx`

**Fix:**
```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Problem: "502 Bad Gateway"

**Cause:** Backend not running

**Fix:**
```bash
pm2 status
# If not running:
pm2 start ~/backend/server.js --name sparkpath-api
```

### Problem: Assessment chatbot not working

**Check:**
1. Bedrock is enabled (Part 1)
2. Backend logs: `pm2 logs sparkpath-api`
3. AWS credentials are correct in `~/backend/.env`

**Fix:**
```bash
cd ~/backend
nano .env
# Verify AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY
# Save and exit

pm2 restart sparkpath-api
```

### Problem: Database errors

**Check if tables exist:**
```bash
aws dynamodb list-tables --region us-east-1
```

**Recreate tables:**
```bash
cd ~/backend
node scripts/createTables.js
node scripts/seedData.js
```

### Problem: Frontend shows blank page

**Check:**
1. Build completed: `ls ~/frontend/dist` should show files
2. Nginx config correct: `sudo nginx -t`
3. Permissions: `sudo chmod -R 755 ~/frontend/dist`

**Rebuild:**
```bash
cd ~/frontend
npm run build
sudo systemctl restart nginx
```

---

## 📊 AWS Resources Summary

| Resource | Name/ID | Purpose | Cost |
|----------|---------|---------|------|
| EC2 Instance | SparkPath-Server | Backend + Frontend hosting | Free tier (t2.micro) |
| Security Group | sparkpath-sg | Firewall rules | Free |
| DynamoDB Tables | SparkPath-* (9 tables) | Database | Free tier 25GB |
| Bedrock | Claude 3 Sonnet | AI chatbot | ~$0.01/conversation |
| EBS Volume | 20 GiB | Storage | Free tier 30GB |

**Total Monthly Cost:** $0 (within free tier limits)

---

## ✅ Success Checklist

- [ ] EC2 instance running (AWS Console shows "Running")
- [ ] SSH access works
- [ ] Node.js, PM2, Nginx installed
- [ ] Backend code uploaded
- [ ] Frontend code uploaded
- [ ] AWS credentials in backend/.env
- [ ] Bedrock enabled (Claude model)
- [ ] DynamoDB tables created (9 tables)
- [ ] Sample data seeded
- [ ] Backend running: `pm2 status` shows "online"
- [ ] Nginx running: `sudo systemctl status nginx` shows "active"
- [ ] Can access http://YOUR-EC2-IP in browser
- [ ] Signup works
- [ ] Assessment chatbot responds
- [ ] Dashboard displays

---

## 🎬 Quick Command Reference

```bash
# Connect to EC2
ssh -i ~/.ssh/sparkpath-key.pem ec2-user@YOUR-EC2-IP

# Check backend status
pm2 status
pm2 logs sparkpath-api

# Restart backend
pm2 restart sparkpath-api

# Check nginx
sudo systemctl status nginx
sudo systemctl restart nginx

# Rebuild frontend after changes
cd ~/frontend && npm run build && sudo systemctl restart nginx

# Check DynamoDB tables
aws dynamodb list-tables --region us-east-1

# View application in browser
# Open: http://YOUR-EC2-IP
```

---

## 🚀 Your App is Live!

**Access URL:** `http://YOUR-EC2-IP`

Share this URL with:
- Your team members
- Hackathon judges
- Testers

**For presentation:** Open this URL and demo the complete flow!

---

## 💡 Pro Tips

1. **Save your EC2 IP:** Bookmark `http://YOUR-EC2-IP` in your browser
2. **Keep SSH open:** Leave the terminal connected for quick fixes
3. **Monitor logs:** Run `pm2 logs` in a separate SSH session during demo
4. **Backup plan:** Record a video of the working app before the presentation
5. **Test everything:** Complete the full user flow before presenting

---

**You're all set! Your app is running on AWS! 🎉**
